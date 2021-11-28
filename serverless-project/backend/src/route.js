const { userHandler } = require("./handler");
const   {customerHandler}= require('./handler/index')
const { eventMiddleware } = require("../lib/middleware/eventMiddleware");
const MYAUTH = require("../lib/middleware/auth");
const userMiddleware =require('./middleware/userMiddleware')



const userRegister = async (event) => await eventMiddleware(event,userHandler.userRegister);
const  userLogin = async (event) => await eventMiddleware(event,userHandler.userLogin) 
const  authLogin = async (event) => await eventMiddleware(event,userHandler.authLogin) 
const  verifyUser = async (event) => await eventMiddleware(event,MYAUTH,userHandler.verifyUser) 
const  deleteData = async (event) => await eventMiddleware(event,MYAUTH,userHandler.deleteData) 
const  forgotPassword = async (event) => await eventMiddleware(event,userHandler.forgotPassword) 
const  resetPassword = async (event) => await eventMiddleware(event,MYAUTH,userHandler.resetPassword)
const  fetchUsers = async (event) => await eventMiddleware(event,userHandler.fetchUsers) 
const  fetchId = async (event) => await eventMiddleware(event,userHandler.fetchId) 
const  validateID = async (event) => await eventMiddleware(event,MYAUTH,userHandler.validateID) 
const  registerCustomer = async (event) => await eventMiddleware(event,MYAUTH,customerHandler.registerCustomer) 
const  fetchCustomers = async (event) => await eventMiddleware(event,MYAUTH,customerHandler.fetchCustomers) 
const  deleteCustomer = async (event) => await eventMiddleware(event,MYAUTH,customerHandler.deleteCustomer)
const  updateCustomer = async (event) => await eventMiddleware(event,MYAUTH,customerHandler.updateCustomer)  
const  sendEmailApi = async (event) => await eventMiddleware(event,userHandler.sendEmailApi)

module.exports = {
  userRegister,
  userLogin,
  authLogin,
  verifyUser,
  deleteData,
  forgotPassword,
  fetchUsers,
  resetPassword,
  fetchId,
  validateID,
  registerCustomer,
  fetchCustomers,
  deleteCustomer,
  updateCustomer,
  sendEmailApi
};
