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
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { LOADCUSTOMER } from "../components/redux/action/constant";
import { LoadCustomer } from "../components/redux/action/user";
import { Form, Input, InputNumber, Button, Card, Row, Col } from "antd";
import Errorhandle from "../misc/errorhandle";
import NavBar from "../components/headers/nav";
export default function SignUp() {
  const dispatch = useDispatch();
  const state = useSelector(state => state.CustomerReducer)
  const{error} = state
  
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  /* eslint-disable no-template-curly-in-string */
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
  /* eslint-enable no-template-curly-in-string */

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
    dispatch(LoadCustomer(formdata));
  };
  return (
    <div >

    <NavBar />
    <div style={{ margin: "5rem" }}>
      <Card
        style={{ width: "40rem", left: "28rem", fontFamily: "cursive" }}
        title="Register User" 
      >
        <Form
          {...layout}
          name="nest-messages"
          validateMessages={validateMessages}
          labelCol={{ span: 6}}
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
            <Input placeholder="Enter your lastname"  />
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
            {error && (<Errorhandle message={error}/>)}
          </Form.Item>

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
            <Input.Password type='password'   className="form-input" placeholder="Enter your password" style={{right:'1rem'}} />
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
            <Input.Password type='password'  type="password" placeholder="Enter your password" style={{right:'1rem'}} />
          </Form.Item>
          

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 7 }}>
            <Button block type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
    </div>
  );
}
