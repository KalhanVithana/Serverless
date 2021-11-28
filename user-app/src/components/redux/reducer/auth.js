import { AUTHSUCCESS, LOADAUTH,AUTHFAILD } from "../action/constant";

const initialState = {
    AuthUser:[],
    loading:false,
    ErrorStatus:null
   
}

export const AuthReducer = (state=initialState,action)=>{
    switch (action.type) {
        case LOADAUTH:
            return {...state,
            loading:true}
        case AUTHSUCCESS:
            return{
                ...state,
                loading:false,
                ErrorStatus:false,
                AuthUser:action.payload
            }
        case AUTHFAILD:
                return{
                    ...state,
                    loading:false,
                    ErrorStatus:true
                }
    
        default:
            return state;
    }
}