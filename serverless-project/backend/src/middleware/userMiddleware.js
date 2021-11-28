const Joi = require('joi');

const Authschema = Joi.object({

    // fname: Joi.string()
    //     .alphanum()
    //     .min(3)
    //     .max(30)
    //     .required(),

    //     lname: Joi.string()
    //     .alphanum()
    //     .min(3)
    //     .max(30)
    //     .required(),

        email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),

        password: Joi.string()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$')).required(),

        cfmpassword: Joi.ref("password")



})

const Authlogin = Joi.object({

    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),

    password: Joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$')).required(),

})

const registerValidator = (event)=>{

const eventBody = JSON.parse(event.body)
if(!eventBody) throw Error('400')
const {email,password} =eventBody
    const params = {
      
        email,
        password
    }
    console.log("params =======",params)
    const {error} = Authschema.validate(params)

    if(error) throw Error('400')

}


module.exports = {
    registerValidator,
    
}