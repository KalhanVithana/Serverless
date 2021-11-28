import { AUTHFAILD, LOADAUTH } from "../../action/constant";
import { SucessAuth } from "../../action/index";
import { Authapi } from "../request/api";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router"
import { put, takeEvery, takeLatest, call, all } from "redux-saga/effects"

export function* CreatAuthAsync() {
   try{
    const token=  yield localStorage.getItem("Authorization")
    console.log("auth token",token)
    const { response, error } = yield call(Authapi, token)
    console.log("response",error)
    if (response.data) {
      
        yield put(SucessAuth(response.data.result))
    }
   }catch(e){
    console.log("auth",e)
        yield  put({ type: AUTHFAILD, payload: e })
   }
}

export function* WatchAuthSaga() {
    yield takeEvery(LOADAUTH, CreatAuthAsync)
}