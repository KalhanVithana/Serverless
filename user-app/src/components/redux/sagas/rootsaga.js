import { put, takeEvery, takeLatest, call, all } from "redux-saga/effects"
import { SucessAuth } from "../action/auth"
import { CUSTOMERERROR, FORGOTERROR, LOADAUTH, LOADCUSTOMER, LOADDATA, LOADFORGOT, LOADLOGIN, LOADPASSWORD, LOADRESET, LOADSUCESS, LOGINERROR, LOGINSUCESS, RESETERROR, USERERROR, VERIFYERROR } from "../action/constant"
import { SucessForgotPassword, SucessPassword, SucessReset, VerifyPassword } from "../action/password"
import { LoadCustomer, RegisterCustomer, RegisterSucessData, SuccessData, SucessLogin } from "../action/user"
import { Authapi, AuthLoginApi, Fetchapi, ForgotPasswordApi, LoginApi, RegsiterApi, RegsiterCustomerApi, resetforgotapi, ResetPasswordApi,VerificationApi } from "./request/api"
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router"
import {WatchSaga, WatchRegisterSaga, watchCustomerSaga, WatchPasswordSaga, WatchRestSaga, WatchAuthSaga, WatchLoadSaga,WatchPasswordResetSaga} from "./saga/index"



// export function* CreateLoginAsync({ payload: data }) {
//     try {
//         const response = yield call(AuthLoginApi, data)
//         console.log("response", response)
//         if (response) {
//             yield put(SucessLogin(response.data))
//             yield toast.success("login success")
//            yield window.location ="/auth/admin"
//         }
//     } catch (error) {
//         yield put({ type: LOGINERROR, payload: error.response.data.msg });
//     }

// }

// export function* CreateRegisterAsync({ payload: data }) {
//     const { response, error } = yield call(RegsiterApi, data);
//     const loginRes = yield call(LoginApi, data)
//     // console.log("yoo", loginRes)
//     if (response) {
//         yield put(RegisterSucessData(response.data));
//         yield put(SucessLogin(loginRes.data))
//         //console.log(JSON.stringify(loginRes.data.token))
//         yield localStorage.setItem('x-auth', loginRes.data.token)
//         yield toast.success("Signup success")
//         yield window.location ="/valid"
//     } else yield put({ type: USERERROR, payload: error.response.data.msg });
// }


// export function* CreateCustomerAsync({ payload: data }) {
//     const token = yield localStorage.getItem('x-auth');
//     const { response, error } = yield call(RegsiterCustomerApi, data, token)
//     if(response){
//         yield put(RegisterCustomer(response.data))
//         yield toast.success("add success")
//         yield window.location ="/auth/admin"
//     }else{
//         yield put({ type: CUSTOMERERROR, payload: error.response.data.msg });
//         yield toast.error("user added error")
//     }
  
// }
// export function* CreateVerifyasync({ payload: data }) {
//     const token = yield localStorage.getItem('x-auth');
//     const { response, error } = yield call(VerificationApi, data, token);
//     console.log(JSON.stringify(token))
//     if (response) {
//         yield put(VerifyPassword(response.data))
//         yield toast.success("verification sucess")
//         yield localStorage.setItem('x-auth',"")
//         yield window.location ="/login"
//     } else{
//         yield put({ type: VERIFYERROR, payload: error })
//         yield toast.error("verification faild")
//     } 

// }


// export function* CreatForgotAsync({ payload: data }) {
//    try{
//     const forgotRes = yield call(resetforgotapi, data);
//     console.log(forgotRes)
//     if(forgotRes.data){
//         yield put(SucessPassword(forgotRes.data))
//         yield toast.success("reset password send your email")
//         }
          
//    }catch(e){
//     yield put({ type: FORGOTERROR, payload: e })
//     yield toast.error("password send faild")

//    }
// }


// export function* CreatAuthAsync() {
//     const token = yield localStorage.getItem('x-auth');
//     const { response, error } = yield call(Authapi, token)
//     if (response) {
//         yield put(SucessAuth(response.data))
//     }
// }

// export function* CreatFetchAsync() {
//     const token = yield localStorage.getItem('x-auth');
//     const { response, error } = yield call(Fetchapi, token)
//     console.log(response)
//     if (response) {
//         yield put(SuccessData(response.data))
//     }

// }

// export function* CreateResetAsync({ payload: data }) {
//     const { response, error }= yield call(ResetPasswordApi, data)
//     console.log(response)
//     if(response){
//         yield put(SucessReset(response.data))
//         yield toast.success("reset password successfully")
//        yield window.location="/login"
       

//     }else{
//         yield put({ type: RESETERROR, payload: error })
//         yield toast.error("password reset faild")

//     }
// }




// export function* WatchRegisterSaga() {
//     yield takeEvery(LOADSUCESS, CreateRegisterAsync)
// }
// export function* WatchSaga() {
//     console.log("hello")
//     yield takeEvery(LOADLOGIN, CreateLoginAsync)

// }

// export function* watchCustomerSaga() {
//     yield takeEvery(LOADCUSTOMER, CreateCustomerAsync)
// }

// export function* WatchPasswordSaga() {
//     yield takeEvery(LOADPASSWORD, CreateVerifyasync)
// }


// export function* WatchRestSaga() {
//     yield takeEvery(LOADFORGOT, CreatForgotAsync)
// }

// export function* WatchAuthSaga() {
//     yield takeEvery(LOADAUTH, CreatAuthAsync)
// }

// export function* WatchLoadSaga() {
//     console.log("calling")
//     yield takeEvery(LOADDATA, CreatFetchAsync)
// }

// export function* WatchPasswordResetSaga() {
//     console.log("calling")
//     yield takeEvery(LOADRESET,CreateResetAsync)
// }








export default function* rootsagas() {
    yield all([WatchSaga(), WatchRegisterSaga(), watchCustomerSaga(), WatchPasswordSaga(), WatchRestSaga(), WatchAuthSaga(), WatchLoadSaga(),WatchPasswordResetSaga()])
}