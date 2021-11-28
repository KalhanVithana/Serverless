import { CUSTOMERERROR, LOADCUSTOMER } from "../../action/constant";
import { RegisterCustomer } from "../../action/index";
import { RegsiterCustomerApi } from "../request/api";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router"
import { put, takeEvery, takeLatest, call, all } from "redux-saga/effects"

export function* CreateCustomerAsync({ payload: data }) {
    const token = yield localStorage.getItem('Authorization');
    const { response, error } = yield call(RegsiterCustomerApi, data, token)
    if(response){
        yield put(RegisterCustomer(response.data))
        yield toast.success("add success")
        yield window.location ="/auth/admin"
    }else{
        yield put({ type: CUSTOMERERROR, payload: error.response.data.msg });
        yield toast.error("user added error")
    }
  
}

export function* watchCustomerSaga() {
    yield takeEvery(LOADCUSTOMER, CreateCustomerAsync)
}
