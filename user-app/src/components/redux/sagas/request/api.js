import axios from "axios"

export const LoginApi =  (data) => {
    console.log("call apiiii login" + JSON.stringify(data))
    const { email, password } = data;
    console.log("name" + email)
    return axios.post('https://r4uzncqbze.execute-api.us-east-1.amazonaws.com/dev/login', { email, password })
}

export const AuthLoginApi =  (data) => {
    console.log("call apiiii login" + JSON.stringify(data))
    const { email, password } = data;
    console.log("name" + email)
    return axios.post('https://r4uzncqbze.execute-api.us-east-1.amazonaws.com/dev/authlogin', { email, password })
}



export const RegsiterApi = (data)=>{
   
    return axios.post('https://r4uzncqbze.execute-api.us-east-1.amazonaws.com/dev/user1',data).then(response => ({ response }))
    .catch(error => ({ error }))
}



export const RegsiterCustomerApi = (data,token)=>{
    console.log("call"+token)
    return axios.post('https://r4uzncqbze.execute-api.us-east-1.amazonaws.com/dev/customer',data,{ headers: { 'Authorization': token },}).then(response => ({ response }))
    .catch(error => ({ error }))
}

export const VerificationApi=(data,token)=>{
    console.log("yoooooooooooo",data)
    const {verifycode} =data
   return  axios.put('https://r4uzncqbze.execute-api.us-east-1.amazonaws.com/dev/veri',data,{ headers: { 'Authorization': token },}).then(response => ({ response }))
   .catch(error => ({ error }))
}

export const resetforgotapi =(data)=>{
    let {email} = data
    console.log("hi call "+email)
    return axios.post('http://localhost:4000/user/forgot',{email});
}

export const Authapi =(token)=>{

     return axios.get('https://r4uzncqbze.execute-api.us-east-1.amazonaws.com/dev/validate',{ headers: { 'Authorization': token }, }).then(response => ({ response }))
    .catch(error => ({ error }))
}

export const Fetchapi =(token)=>{
    return axios.get('https://r4uzncqbze.execute-api.us-east-1.amazonaws.com/dev/customer', { headers: { 'Authorization': token }, }).then(response => ({ response }))
    .catch(error => ({ error }))
}

export const ResetPasswordApi =(data)=>{

    return axios.post('http://localhost:4000/user/reset',data).then(response => ({ response }))
    .catch(error => ({ error }))
}



