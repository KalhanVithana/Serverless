import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { Table,Modal } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  EditOutlined,
  DeleteOutlined

} from '@ant-design/icons';
import ColumnGroup from 'rc-table/lib/sugar/ColumnGroup';


const columns = [

  { title: 'first Name', dataIndex: 'name', key: 'name' },
  { title: 'lastnName', dataIndex: 'email', key: 'email' },
  { title: 'Address', dataIndex: 'username', key: 'username' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => {
      return<>
      <EditOutlined/>,
      <DeleteOutlined  style={{color:"red",marginLeft:12}} onClick={ondelete}/>
      </>

    }
  },
];


const ondelete=()=>{
Modal.confirm({
  title:"are you sure,do you want to delete this user ",
  okText:'yes',
  okType:'danger',
  onOk:()=>{

    console.log("deleted")
  }
})

}

export default function PrivateRoute() {
const [userdata,setuserdata] = useState([
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    name: 'Not Expandable',
    age: 29,
    address: 'Jiangsu No. 1 Lake Park',
    description: 'This not expandable',
  },
  {
    key: 4,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',

  },

]);

useEffect(()=>{

  axios.get('https://jsonplaceholder.typicode.com/users').then(res=>{
    setuserdata(res.data)
    console.log(res.data)
  })
},[])


   


    
    return (
        <div>
          <Table
    columns={columns}
   
    dataSource={userdata}
  />,
        </div>
    )
}

function AdminDash() {

    return (
        <h1 style={{ color: "white" }}>Admin</h1>
    )
}

function AdminDash1() {

    return (
        <h1 style={{ color: "white" }}>dd</h1>
    )
}