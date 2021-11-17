import { FORGOTSUCESS, LOADFORGOT, LOADFORGOTPASSWORD, LOADPASSWORD, LOADRESET, RESETERROR, RESETSUCESS, VERIFYSUCESS } from "./constant"



export const LoadPasswordData = (data)=>({
    type:LOADPASSWORD,
    payload:data
})
    
export const VerifyPassword = (data)=>({
    type:VERIFYSUCESS,
    payload:data
})


export const LoadFogotData = (data)=>({
    type:LOADFORGOT,
    payload:data
})
    
export const SucessPassword = (data)=>({
    type:FORGOTSUCESS,
    payload:data
})

export const LoadRest = (data)=>({
    type:LOADRESET,
    payload:data
})
    
export const SucessReset = (data)=>({
    type:RESETSUCESS,
    payload:data
})

export const ErrorReset = (data)=>({
    type:RESETERROR,
    payload:data
})



