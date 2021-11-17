import { FORGOTERROR, FORGOTSUCESS, LOADFORGOT } from "../action/constant";

const initialState = {
    forgot: [],
    loading:false,
    error:null,
 
  
}

export const ResetReducer = (state=initialState,action)=>{
    switch (action.type) {
        case LOADFORGOT:
            return {...state,
            loading:true}
            
        
        case FORGOTSUCESS:
            return{
                ...state,
                loading:false,
                forgot:action.payload
            }

            case FORGOTERROR:
                return{
                    ...state,
                    loading:false,
                    error:action.payload
                }
    
        default:
            return state;
    }
}