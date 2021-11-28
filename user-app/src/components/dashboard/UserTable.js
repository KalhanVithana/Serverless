import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Modal, Input, Form, InputNumber, Button } from "antd";

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
import { useDispatch, useSelector } from "react-redux";

export default function UserTable(props) {
  const [userdata, setuserdata] = useState([]);
  const [isEdit, setisEdting] = useState(false);
  const [Editcustomer, setEditcustomer] = useState(null);
  const data = useSelector((state) => state.UserDataReducer.user);
  const dispatch = useDispatch();

  const columns = [
    { title: "first Name", dataIndex: "fname", key: "fname" },
    { title: "lastnName", dataIndex: "lname", key: "lname" },
    { title: "email", dataIndex: "email", key: "email" },
    { title: "mobile", dataIndex: "mobile", key: "mobile" },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEdit(record);
              }}
            />
            ,
            <DeleteOutlined
              style={{ color: "red", marginLeft: 12 }}
              onClick={() => {
                ondelete(record);
              }}
            />
          </>
        );
      },
    },
  ];

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  console.log(data);

  const ondelete = (record) => {
    Modal.confirm({
      title: `are you sure,do you want to delete this user ${record.fname}`,
      okText: "yes",
      okType: "danger",
      onOk: async () => {
        console.log("deleted");
        await axios
          .delete(
            `https://r4uzncqbze.execute-api.us-east-1.amazonaws.com/dev/customer/${record.id}`,
            { headers: { Authorization: props.token } }
          )
          .then((res) => {
            console.log(res.data);
          });
        window.location = "/auth/admin";
      },
    });
  };

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
      setuserdata(res.data);
      console.log(res.data);
    });
  }, []);

  const onEdit = (record) => {
    setisEdting(true);
    setEditcustomer({ ...record });
  };
  const EditData = async (obj) => {
    console.log("userss", obj);

    await axios
      .put(
        `https://r4uzncqbze.execute-api.us-east-1.amazonaws.com/dev/customer`,
        obj,
        { headers: { Authorization: props.token } }
      )
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <div style={{ margin: "2rem" }}>
      <Table columns={columns} dataSource={props.obj} />,
      <Modal
        title="Edit Customer"
        okText="ok"
        visible={isEdit}
        onCancel={() => {
          setisEdting(false);
        }}
        onOk={() => {
          console.log(Editcustomer.id);
          const data = {
            id: Editcustomer.id,
            fname: Editcustomer.fname,
            lname: Editcustomer.lname,
            email: Editcustomer.email,
            mobile: Editcustomer.mobile,
          };
          EditData(data);
          setisEdting(false);
        }}
      >
        <Input
          value={Editcustomer?.fname}
          onChange={(e) => {
            setEditcustomer((pre) => {
              return { ...pre, fname: e.target.value };
            });
          }}
        />
        <Input
          value={Editcustomer?.lname}
          onChange={(e) => {
            setEditcustomer((pre) => {
              return { ...pre, lname: e.target.value };
            });
          }}
        />
        <Input
          value={Editcustomer?.email}
          onChange={(e) => {
            setEditcustomer((pre) => {
              return { ...pre, email: e.target.value };
            });
          }}
        />
        <Input
          value={Editcustomer?.mobile}
          onChange={(e) => {
            setEditcustomer((pre) => {
              return { ...pre, mobile: e.target.value };
            });
          }}
        />
      </Modal>
    </div>
  );
}
