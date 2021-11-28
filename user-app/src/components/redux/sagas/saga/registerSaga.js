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
    console.log("response ++++",response)
    if (response) {
      yield put(RegisterSucessData(response));
       yield put(SucessLogin(loginRes.data))
      console.log("data",loginRes.data.content.token)
        yield localStorage.setItem('Authorization', loginRes.data.content.token)
        yield toast.success("Signup success")
        yield window.location ="/valid"
    } else yield put({ type: USERERROR, payload: error.response.data.msg });
}

export function* WatchRegisterSaga() {
    yield takeEvery(LOADSUCESS, CreateRegisterAsync)
}