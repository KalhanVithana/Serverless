import { AUTHSUCCESS, LOADAUTH } from "./constant"

export const LoadAuth = (data)=>({
    type:LOADAUTH,
    payload:data
})


export const SucessAuth = (data)=>({
    type:AUTHSUCCESS,
    payload:data
})
