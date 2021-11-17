import {LOADDATA,SUCCESDATA } from "../action/constant";


const initialState = {
    user: [],
    loading:false,
}

export const UserDataReducer = (state=initialState,action)=>{
    switch (action.type) {
        case LOADDATA:
            return {...state,
            loading:true}
        case SUCCESDATA:
            return{
                ...state,
                loading:false,
                user:action.payload
            }
    
        default:
            return state;
    }
}