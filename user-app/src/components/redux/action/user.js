import axios from "axios";
import { CUSTOMERSUCESS, ADDUSERSUCESS, LOADCUSTOMER, LOADLOGIN, LOADSUCESS, LOGINSUCESS, LOADPASSWORD, LOADAUTH, AUTHSUCCESS, LOADDATA, SUCCESDATA } from "./constant"



export const LoadDataList =(data)=>({
    type:LOADLOGIN,
    payload:data
})

export const SucessLogin =(data)=>({
    type:LOGINSUCESS,
    payload:data
})

export const LoadRegisterData = (data)=>({
    type:LOADSUCESS,
    payload:data
})
    
export const RegisterSucessData = (data)=>({
    type:ADDUSERSUCESS,
    payload:data
})


export const LoadCustomer = (data)=>({
    type:LOADCUSTOMER,
    payload:data
})


export const RegisterCustomer = (data)=>({
    type:CUSTOMERSUCESS,
    payload:data
})


export const LoadPasswordData = (data)=>({
    type:LOADPASSWORD,
    payload:data
})

export const Loaduser = (data)=>({
    type:LOADDATA,
    payload:data
})


export const SuccessData = (data)=>({
    type:SUCCESDATA,
    payload:data
})













 

