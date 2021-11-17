import {LOADDATA,LOADRESET,RESETERROR,RESETSUCESS,SUCCESDATA } from "../action/constant";


const initialState = {
    password: [],
    loading:false,
    error:null
}

export const ResetPasswordReducer = (state=initialState,action)=>{
    switch (action.type) {
        case LOADRESET:
            return {...state,
            loading:true}
        case RESETSUCESS:
            return{
                ...state,
                loading:false,
                password:action.payload
            }
            case RESETERROR:
                return{
                    ...state,
                    loading:false,
                    error:action.payload
                }
        
    
        default:
            return state;
    }
}