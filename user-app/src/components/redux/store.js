import { combineReducers,createStore,applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {AdminReducer, LoginReducer} from "./reducer/admin";
import createSagaMiddleware from 'redux-saga'
import rootsagas, { WatchSaga } from "./sagas/rootsaga";
import { CustomerReducer } from "./reducer/customer";
import { PasswordReducer } from "./reducer/password";
import { ResetReducer } from "./reducer/forgot";
import { AuthReducer } from "./reducer/auth";
import { UserDataReducer } from "./reducer/user";


const reducer = combineReducers({

  AdminReducer:AdminReducer,
  LoginReducer:LoginReducer,
  CustomerReducer:CustomerReducer,
  PasswordReducer:PasswordReducer,
  ResetReducer:ResetReducer,
  AuthReducer:AuthReducer,
  UserDataReducer:UserDataReducer
   
    
})

const sagaMiddleware = createSagaMiddleware()
const middlelware =[thunk,sagaMiddleware]


const store = createStore(

    reducer,
  composeWithDevTools(
    applyMiddleware(...middlelware)
  )

)

sagaMiddleware.run(rootsagas)

export default store;