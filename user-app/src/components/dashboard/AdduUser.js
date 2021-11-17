import React, { useState,useEffect} from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import NavbarPage from './NavbarPage';
import { LOADCUSTOMER } from '../redux/action/constant';
import { LoadCustomer } from '../redux/action/user';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';import Errorhandle from '../../misc/errorhandle';
;


export default function AddUser() {
  const [fname, setfname] = useState()
  const [lname, setlname] = useState()
  const [email, setemail] = useState()
  const [password, setpassword] = useState();
  const [cfmpassword, setcfmpassword] = useState()
  const state = useSelector(state => state.CustomerReducer)
  const{error} = state
  const dispatch = useDispatch();

  useEffect(() => {
   
  }, [state])

  let schema = yup.object().shape({
    firstname: yup.string().min(3).max(10).required().matches(
      /^[A-Za-z]+$/,
      "Must Contain Characters"

    ),
    lastname: yup.string().min(3).max(10).required().matches(
      /^[A-Za-z]+$/,
      "Must Contain Characters"
    ),
    email: yup.string().email().matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "enter valid email "
    ).required(),
    password: yup.string().matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ).required("Please Enter your password")
    ,
    confirmPassword: yup.string().test(
      "passwords-match",
      "Passwords must match",
      function (value) {
        return this.parent.password === value;
      })
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema)
  }
  );


  const submitData = async (e) => {
    try {
      const formdata = {
        fname, lname, email, password, cfmpassword
      }
      dispatch(LoadCustomer(formdata))

    } catch (e) {
      console.log(e)
    }

  }


  return (

    <div className="" >
      <ToastContainer />
    
      <div className="register" >
        <MDBCol>
          <MDBCard style={{ width: "30rem", bottom: 50, right: 90 }}>
            <MDBCardBody>
              <form onSubmit={handleSubmit(submitData)}>
                <p className="h4 text-center mb-4">Add user</p>
                <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                  Your first name
                </label>
                <input {...register("firstname", { required: true })} type="text" id="defaultFormRegisterNameEx" className="form-control" name="firstname" value={fname} onChange={(e) => {
                  setfname(e.target.value)
                  console.log(e.target.value)
                }} />
                <p style={{ color: "red" }}> {errors.firstname?.message}</p>
                <br />

                <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                  Your  last name
                </label>
                <input  {...register("lastname", { required: true })} type="text" id="defaultFormRegisterNameEx" name="lastname" className="form-control" value={lname} onChange={(e) => {
                  setlname(e.target.value)

                }} />
                <p style={{ color: "red" }}> {errors.lastname?.message}</p>
                <br />
                <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                  Your email
                </label>
                <input {...register("email", { required: true })} type="email" id="defaultFormRegisterEmailEx" name="email" className="form-control" value={email} onChange={(e) => {
                  setemail(e.target.value)

                }} />
                <p style={{ color: "red" }}> {errors.email?.message}</p>
                {error && (<Errorhandle message={error}/>)}
                <br />
                <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
                  Your password
                </label>
                <input  {...register("password", { required: true })} type="password" id="defaultFormRegisterConfirmEx" name="password" className="form-control" value={password} onChange={(e) => {
                  setpassword(e.target.value)

                }} />
                <p style={{ color: "red" }}> {errors.password?.message}</p>

                <br />
                <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
                  Confirm your email
                </label>
                <input  {...register("confirmPassword", { required: true })} type="password" id="defaultFormRegisterPasswordEx" name="confirmPassword" className="form-control" value={cfmpassword} onChange={(e) => {
                  setcfmpassword(e.target.value)


                }} />
                <p style={{ color: "red" }}> {errors.confirmPassword && "not match password"}</p>
                <div className="text-center mt-4">
                  <button type="submit" class="btn btn-primary btn-rounded">Register</button>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </div>
    </div>
  )
}