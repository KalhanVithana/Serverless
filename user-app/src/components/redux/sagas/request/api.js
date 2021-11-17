import axios from "axios"

export const LoginApi =  (data) => {
    console.log("call apiiii login" + JSON.stringify(data))
    const { email, password } = data;
    console.log("name" + email)
    return axios.post('http://localhost:4000/user/login', { email, password })
}

export const AuthLoginApi =  (data) => {
    console.log("call apiiii login" + JSON.stringify(data))
    const { email, password } = data;
    console.log("name" + email)
    return axios.post('http://localhost:4000/user/auth/login', { email, password })
}



export const RegsiterApi = (data)=>{
    console.log("call"+data)
    const {email,password} =data;
    return axios.post('http://localhost:4000/user/register',data).then(response => ({ response }))
    .catch(error => ({ error }))
}



export const RegsiterCustomerApi = (data,token)=>{
    console.log("call"+token)
    return axios.post('http://localhost:4000/user/admin/add',data,{headers:{'x-auth':token}}).then(response => ({ response }))
    .catch(error => ({ error }))
}

export const VerificationApi=(data,token)=>{
    console.log(data)
    const {verifycode} =data
   return  axios.post('http://localhost:4000/user/ver',data,{headers:{'x-auth':token}}).then(response => ({ response }))
   .catch(error => ({ error }))

}

export const resetforgotapi =(data)=>{
    let {email} = data
    console.log("hi call "+email)
    return axios.post('http://localhost:4000/user/forgot',{email});
}

export const Authapi =(token)=>{
    return axios.post('http://localhost:4000/user/auth',null,{headers:{'x-auth':token}}).then(response => ({ response }))
    .catch(error => ({ error }))
}

export const Fetchapi =(token)=>{
    return axios.get('http://localhost:4000/user/admin/customers', { headers: { 'x-auth': token } }).then(response => ({ response }))
    .catch(error => ({ error }))
}

export const ResetPasswordApi =(data)=>{

    return axios.post('http://localhost:4000/user/reset',data).then(response => ({ response }))
    .catch(error => ({ error }))
}



