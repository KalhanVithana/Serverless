import { LOADAUTH } from "../../action/constant";
import { SucessAuth } from "../../action/index";
import { Authapi } from "../request/api";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router"
import { put, takeEvery, takeLatest, call, all } from "redux-saga/effects"

export function* CreatAuthAsync() {
    const token = yield localStorage.getItem('x-auth');
    const { response, error } = yield call(Authapi, token)
    if (response) {
        yield put(SucessAuth(response.data))
    }
}

export function* WatchAuthSaga() {
    yield takeEvery(LOADAUTH, CreatAuthAsync)
}