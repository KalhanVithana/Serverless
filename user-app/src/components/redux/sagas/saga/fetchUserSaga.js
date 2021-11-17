import { LOADDATA } from "../../action/constant";
import { SuccessData } from "../../action/index";
import { Fetchapi } from "../request/api";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router"
import { put, takeEvery, takeLatest, call, all } from "redux-saga/effects"

export function* CreatFetchAsync() {
    const token = yield localStorage.getItem('x-auth');
    const { response, error } = yield call(Fetchapi, token)
    console.log(response)
    if (response) {
        yield put(SuccessData(response.data))
    }

}


export function* WatchLoadSaga() {
    console.log("calling")
    yield takeEvery(LOADDATA, CreatFetchAsync)
}
