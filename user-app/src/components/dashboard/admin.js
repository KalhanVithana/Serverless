import axios from 'axios';
import { MDBCard } from 'mdbreact'
import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loaduser } from '../redux/action/user';
import UserTable from './UserTable';
export default function Admin() {
const data = useSelector(state => state.UserDataReducer.user)
const dispatch = useDispatch();

useEffect(async() => {

 
    dispatch(Loaduser())
   

}, [dispatch,])





  let usertoken = localStorage.getItem("Authorization")
    return (
        <div>
       <UserTable obj={data} token= {usertoken}/>
        </div>
    )
}
