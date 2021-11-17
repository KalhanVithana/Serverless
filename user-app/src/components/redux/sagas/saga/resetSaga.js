import { LOADFORGOT, LOADRESET, RESETERROR } from "../../action/constant"
import { SucessReset } from "../../action/index"
import { ResetPasswordApi } from "../request/api"
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router"
import { put, takeEvery, takeLatest, call, all } from "redux-saga/effects"

export function* CreateResetAsync({ payload: data }) {
    const { response, error }= yield call(ResetPasswordApi, data)
    console.log(response)
    if(response){
        yield put(SucessReset(response.data))
        yield toast.success("reset password successfully")
       yield window.location="/login"
       

    }else{
        yield put({ type: RESETERROR, payload: error })
        yield toast.error("password reset faild")

    }
}

export function* WatchPasswordResetSaga() {
    console.log("calling")
    yield takeEvery(LOADRESET,CreateResetAsync)
}

