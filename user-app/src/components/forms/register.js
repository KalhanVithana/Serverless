import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
} from "mdbreact";
import axios from "axios";
import { LoadRegisterData, RegisterUser } from "../redux/action/user";
import { useDispatch, useSelector } from "react-redux";
import { AdminReducer } from "../redux/reducer/admin";
import NavBar from "../headers/nav";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Errorhandle from "../../misc/errorhandle";
import { Form, Input, InputNumber, Button, Card, Row, Col } from "antd";

export default function Register() {
  const [errorhanlde, seterrorhanlde] = useState();
  const [validate, setvalidate] = useState(false);
  const err = useSelector((state) => state.AdminReducer);
  const { error, auth } = err;
  const dispatch = useDispatch();

  useEffect(() => {}, [err]);
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
    const { fname, lname, email, password, cfmpassword } = values;
    const formdata = {
      fname,
      lname,
      email,
      password,
      cfmpassword,
    };
    console.log(formdata);
    dispatch(LoadRegisterData(formdata));
  };

  return (
    <div className="">
      <NavBar />
      <div style={{ margin: "5rem" }}>
        <Card
          style={{ width: "40rem", left: "28rem", fontFamily: "cursive",  textAlign:'center' }}
          title="Register"
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
              name="fname"
              label="first Name"
              rules={[
                {
                  required: true,
                },
                {
                  pattern: /^[A-Za-z]+$/,
                  message: "Must Contain Characters",
                },
                { whitespace: true },
                { min: 3 },
              ]}
              hasFeedback
            >
              <Input placeholder="Enter your first name" />
            </Form.Item>

            <Form.Item
              name="lname"
              label="Last Name"
              rules={[
                {
                  required: true,
                },
                {
                  pattern: /^[A-Za-z]+$/,
                  message: "Must Contain Characters",
                },
                { whitespace: true },
                { min: 3 },
              ]}
              hasFeedback
            >
              <Input placeholder="Enter your lastname" />
            </Form.Item>

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
           
              {error && <Errorhandle message={error} />}
          

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
                  message:
                    ' "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"',
                },
              ]}
              hasFeedback
            >
              <Input.Password
                type="password"
                className="form-input"
                placeholder="Enter your password"
                style={{ right: "1rem" }}
              />
            </Form.Item>

            <Form.Item
              name="cfmpassword"
              label="confirm password"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("password doens't match!"));
                  },
                }),
              ]}
              hasFeedback
            >
              <Input.Password
                type="password"
                type="password"
                placeholder="Enter your password"
                style={{ right: "1rem" }}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 7 }}>
              <Button block type="primary" htmlType="submit">
                SignUp
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}
