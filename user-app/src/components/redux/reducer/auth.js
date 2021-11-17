import { AUTHSUCCESS, LOADAUTH } from "../action/constant";

const initialState = {
    AuthUser:[],
    loading:false,
   
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
                AuthUser:action.payload
            }
    
        default:
            return state;
    }
}