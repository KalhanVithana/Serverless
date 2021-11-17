import { CUSTOMERSUCESS, FORGOTSUCESS, LOADCUSTOMER, LOADFORGOTPASSWORD, LOADPASSWORD, VERIFYERROR, VERIFYSUCESS } from "../action/constant";


const initialState = {
    passwordStore: [],
    loading:false,
    auth:true,
    error:null,
    validate:false,
    
}

export const PasswordReducer = (state=initialState,action)=>{
    switch (action.type) {

        case LOADPASSWORD:
            return {...state,
            loading:true}

        case VERIFYSUCESS:
            return{
                ...state,
                loading:false,
                validate:true,
               passwordStore:action.payload
              }

        case VERIFYERROR:
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

