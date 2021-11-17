import axios from 'axios';
import { MDBCard } from 'mdbreact'
import React, { useState,useEffect } from 'react'
import NavbarPage from './NavbarPage'
import { useDispatch, useSelector } from 'react-redux'
import Table from './Table';
import { Loaduser } from '../redux/action/user';
import UserTable from './UserTable';
export default function Admin() {
const data = useSelector(state => state.UserDataReducer.user)
const dispatch = useDispatch();

useEffect(async() => {

    dispatch(Loaduser())
}, [dispatch,])


const DataTable = () => {
    return data.map((res, i) => {
      return <Table key={i} obj={res} />
    })
  }


    return (
        <div>
       <UserTable obj={data}/>
        </div>
    )
}
