import { FORGOTERROR, LOADFORGOT } from "../../action/constant";
import { SucessPassword } from "../../action/index";
import { resetforgotapi } from "../request/api";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router"
import { put, takeEvery, takeLatest, call, all } from "redux-saga/effects"

export function* CreatForgotAsync({ payload: data }) {
    try{
     const forgotRes = yield call(resetforgotapi, data);
     console.log(forgotRes)
     if(forgotRes.data){
         yield put(SucessPassword(forgotRes.data))
         yield toast.success("reset password send your email")
         }
           
    }catch(e){
     yield put({ type: FORGOTERROR, payload: e })
     yield toast.error("password send faild")
 
    }
 }
 

 export function* WatchRestSaga() {
    yield takeEvery(LOADFORGOT, CreatForgotAsync)
}
