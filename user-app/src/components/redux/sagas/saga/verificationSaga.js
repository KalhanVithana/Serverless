import { LOADPASSWORD, VERIFYERROR } from "../../action/constant";
import { VerifyPassword } from "../../action/index";
import { VerificationApi } from "../request/api";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router"
import { put, takeEvery, takeLatest, call, all } from "redux-saga/effects"

export function* CreateVerifyasync({ payload: data }) {
    const token = yield localStorage.getItem('Authorization');
    const { response, error } = yield call(VerificationApi, data, token);
    console.log(JSON.stringify(token))
    if (response) {
        yield put(VerifyPassword(response.data))
        yield toast.success("verification sucess")
        yield localStorage.setItem('Authorization',"")
        yield window.location ="/login"
    } else{
        yield put({ type: VERIFYERROR, payload: error })
        yield toast.error("verification faild")
    } 

}


export function* WatchPasswordSaga() {
    yield takeEvery(LOADPASSWORD, CreateVerifyasync)
}