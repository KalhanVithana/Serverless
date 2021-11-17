import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Modal } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import ColumnGroup from "rc-table/lib/sugar/ColumnGroup";
import { useDispatch, useSelector } from 'react-redux'



export default function UserTable(props) {
  const [userdata, setuserdata] = useState([]);
  const data = useSelector(state => state.UserDataReducer.user)
const dispatch = useDispatch();

  const columns = [
    { title: "first Name", dataIndex: "fname", key: "fname" },
    { title: "lastnName", dataIndex: "lname", key: "lname" },
    { title: "email", dataIndex: "email", key: "email" },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record) => {
        return (
          <>
            <EditOutlined />,
            <DeleteOutlined
              style={{ color: "red", marginLeft: 12 }}
              onClick={()=>{
                ondelete(record)
              }}
            />
          </>
        );
      },
    },
  ];

 console.log(data)
     
  
  const ondelete = (record) => {
   
    
    Modal.confirm({
      title: `are you sure,do you want to delete this user ${record.fname}`,
      okText: "yes",
      okType: "danger",
      onOk: async() => {
        console.log("deleted"); await axios.delete(`http://localhost:4000/user/delete/${record._id}`).then(res=>{
          console.log(res.data)
          })
          window.location="/auth/admin"
      },
    });
    
  };

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      setuserdata(res.data);
      console.log(res.data);
    });
  }, []);

  const DataTable = () => {
    return data.map((res, i) => {
      return  console.log(res.fname)
    })
  }

  return (
    <div style={{margin:"2rem"}}>
      <Table columns={columns} dataSource={props.obj} />,
    </div>
  );
}
