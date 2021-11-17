import { LOADSUCESS, USERERROR } from "../../action/constant";
import { RegisterSucessData,SucessLogin } from "../../action/index";
import { LoginApi, RegsiterApi } from "../request/api";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router"
import { put, takeEvery, takeLatest, call, all } from "redux-saga/effects"

export function* CreateRegisterAsync({ payload: data }) {
    const { response, error } = yield call(RegsiterApi, data);
    const loginRes = yield call(LoginApi, data)
    // console.log("yoo", loginRes)
    if (response) {
        yield put(RegisterSucessData(response.data));
        yield put(SucessLogin(loginRes.data))
        //console.log(JSON.stringify(loginRes.data.token))
        yield localStorage.setItem('x-auth', loginRes.data.token)
        yield toast.success("Signup success")
        yield window.location ="/valid"
    } else yield put({ type: USERERROR, payload: error.response.data.msg });
}

export function* WatchRegisterSaga() {
    yield takeEvery(LOADSUCESS, CreateRegisterAsync)
}