import { ADDUSERSUCESS, USERERROR, LOADLOGIN, LOADSUCESS, LOGINERROR, LOGINSUCESS } from "../action/constant"

const initialState = {
    users: [],
    loading:false,
    error:null,
    loginData:[],
    loginerror:null,
    auth:false,
    validate:false,
    errorauth:false
  
 
}


export const AdminReducer = (state = initialState,action)=>{
    switch(action.type){
        case LOADSUCESS:
            return {
                ...state,
                loading:true
            }
        case ADDUSERSUCESS:
            return{
                ...state,
                loading:false,
                validate:true,
                users:action.payload
            }
            case USERERROR:
                return{
                    ...state,
                    loading:false,
                    auth:false,
                    error:action.payload
                }
            default: 
          return state;
    }
}

export const LoginReducer = (state =initialState,action)=>{
    switch (action.type) {
        case LOADLOGIN:
            return{ loading:true}
            case LOGINSUCESS:
                localStorage.setItem('x-auth',action.payload.token) 
            return{ loading:false,
                      auth:true,
                    ...state,loginData:action.payload
                }

            case LOGINERROR:
                    return{
                        ...state,
                        loading:false,
                        loginerror:action.payload
                    }
        default:
            return state;
    }  
}

