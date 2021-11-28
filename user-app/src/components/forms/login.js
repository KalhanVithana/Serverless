import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
} from "mdbreact";
import "../../assets/form.css";

import { useDispatch, useSelector } from "react-redux";
import {
  LoadDataList,
  LoadRegisterData,
  LoginUser,
  SucessDataList,
} from "../redux/action/user";
import { useNavigate } from "react-router-dom";
import NavBar from "../headers/nav";
import Errorhandle from "../../misc/errorhandle";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Card,
  Row,
  Col,
  Checkbox,
} from "antd";

export default function Login() {
  const err = useSelector((state) => state.LoginReducer);
  const state = useSelector((state) => state.AuthReducer.AuthUser);
  const { loginerror, loginData, auth } = err;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(async () => {
    if (state) {
      //navigate("/auth/admin");
    }
  }, [state]);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };


  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };


  const onFinish = async (values) => {
    const { fname, lname, email, password } = values;
    const formdata = {
      email,
      password,
    };
    console.log(JSON.stringify(values));
    dispatch(LoadDataList(formdata));
  };

  return (
    <div className="">
      <NavBar />
      <div className="">
        <Card
          style={{
            width: "30rem",
            left: "35rem",
            fontFamily: "cursive",
            top: "5rem",
            textAlign:'center'
          }}
          title="Login User"
        >
          <Form
            {...layout}
            name="nest-messages"
            validateMessages={validateMessages}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 20 }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              label="email"
              rules={[
                {
                  required: true,
                },
                { whitespace: true },
                { type: "email" },
              ]}
              hasFeedback
            >
              <Input placeholder="Enter your email" />
            </Form.Item>
            {loginerror && <Errorhandle message={loginerror} />}

            <Form.Item
              name="password"
              label="password"
              rules={[
                {
                  required: true,
                },
                { whitespace: true },
                {
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$/,
                  message: ' Invalid Password',
                },
              ]}
              hasFeedback
            >
              <Input.Password
                type="password"
                className="form-input"
                placeholder="Enter your password"
                // style={{ left: "0.1%" }}
              />
            </Form.Item>
            <div style={{marginRight:'4rem',marginBottom:'2rem'}}>
              <a href="/for" className="mt-5">
                Forgot password?
              </a>
            </div>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 7 }}>
              <Button block type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}
