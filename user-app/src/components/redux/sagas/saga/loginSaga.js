import { SucessLogin } from "../../action/index"
import { LOADLOGIN, LOGINERROR } from "../../action/constant"
import { AuthLoginApi } from "../request/api"
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router"
import { put, takeEvery, takeLatest, call, all } from "redux-saga/effects"

export function* CreateLoginAsync({ payload: data }) {
    try {
        const response = yield call(AuthLoginApi, data)
        console.log("response", response)
        if (response) {
            yield put(SucessLogin(response.data))
            yield toast.success("login success")
           yield window.location ="/auth/admin"
        }
    } catch (error) {
        yield put({ type: LOGINERROR, payload: error.response.data.msg });
    }

}

export function* WatchSaga() {
    console.log("hello")
    yield takeEvery(LOADLOGIN, CreateLoginAsync)

}