import axios  from 'axios'
import React from 'react'
import { FaWindows } from 'react-icons/fa'


export default function Table(props) {
    const deleteData = async() =>{
        await axios.delete(`http://localhost:4000/user/delete/${props.obj._id}`).then(res=>{
        console.log(res.data)
        })
        window.location="/auth/admin"
    }
    
    return (
        <tr>
            <td>{props.obj.fname}</td>
            <td>{props.obj.lname}</td>
            <td>{props.obj.email}</td>
           
            <td> <button type="button"  value ={props.obj.id} onClick={deleteData} class="btn btn-danger btn-sm px-3">Delete</button></td>
        </tr>
    )
}
