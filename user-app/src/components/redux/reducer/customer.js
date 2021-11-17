import { CUSTOMERERROR, CUSTOMERSUCESS, LOADCUSTOMER } from "../action/constant";


const initialState = {
    customer: [],
    loading:false,
    error:null
}

export const CustomerReducer = (state=initialState,action)=>{
    switch (action.type) {
        case LOADCUSTOMER:
            return {...state,
            loading:true}
        case CUSTOMERSUCESS:
            return{
                ...state,
                loading:false,
                customer:action.payload
            }
            case CUSTOMERERROR:
                return{
                    ...state,
                    loading:false,
                    error:action.payload
                }
        
    
        default:
            return state;
    }
}