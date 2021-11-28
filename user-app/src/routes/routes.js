import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  Navigate,
} from "react-router-dom";
import Register from "../components/forms/register";
import Login from "../components/forms/login";
import Admin from "../components/dashboard/admin";
import Registeruser from "../components/dashboard/Registeruser";
import Verify from "../components/verification/verify";
import Forgot from "../components/forgotpassword/forgot";
import ResetPassword from "../components/forgotpassword/resetpassword";
import { LoadAuth } from "../components/redux/action/auth";
import { useDispatch, useSelector } from "react-redux";
import Home from "../container/home";
import "../assets/ant.css";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function UserRoute() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.L);

  useEffect(async () => {
    const login = async () => {
      //  const token = localStorage.setItem("Authorization","")
      //     await axios.get('https://r4uzncqbze.execute-api.us-east-1.amazonaws.com/dev/validate',{ headers: { 'Authorization': token }, }).then(res=>{
      //              console.log(res.data)
      // })
      // })
    };
    login();

    // const config = {
    //     headers: { Authorization: `Bearer ${token}` }
    // };

    //     console.log("token =======",token)

    //   await axios.post('http://localhost:4000/user/y',null,config).then(res=>{
    //         console.log(res.data)
    //     })
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/valid" element={<Verify />} />
        <Route path="/for" element={<Forgot />} />
        <Route path="/reset/:id" element={<ResetPassword />} />
        <Route exact path="/auth" element={<Authentication />}>
          <Route path="admin" element={<Admin />} />
          <Route path="add" element={<Registeruser />} />
        </Route>
      </Routes>
    </>
  );
}

function Authentication({ children }) {
  const [data, setdata] = useState();
  const state = useSelector((state) => state.AuthReducer.ErrorStatus);

  console.log(state);
  const [collapsed, setcollapsed] = useState(false);

  const onCollapse = () => {
    setcollapsed(!collapsed);
  };

  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(LoadAuth());
  }, [dispatch, state]);

  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>

            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="2">
                <Link to="/auth/add">Add User</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/auth/admin">List User</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="4" icon={<PieChartOutlined />}>
              <Link
                to="/"
                onClick={() => {
                  localStorage.setItem("Authorization", "");
                }}
              >
                logout
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: "0 16px" }}>
            {state ? <Navigate replace to="/login" /> : children}
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

function AdminDash() {
  return <h1 style={{ color: "white" }}>Admin</h1>;
}

function User() {
  return <h1 style={{ color: "white" }}>U1</h1>;
}
