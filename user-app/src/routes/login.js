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
import { useDispatch, useSelector } from 'react-redux'
import { LoadDataList, LoadRegisterData, LoginUser, SucessDataList } from '../components//redux/action/user';
import { useNavigate } from 'react-router-dom';
import { Form, Input, InputNumber, Button, Card, Row, Col } from "antd";
import Errorhandle from "../misc/errorhandle";
import NavBar from "../components/headers/nav";
export default function Login1() {
    const err = useSelector(state => state.LoginReducer);
    const state = useSelector(state => state.AuthReducer.AuthUser)
    const { loginerror, loginData, auth } = err;
  const dispatch = useDispatch();

  
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
    const { fname, lname, email, password } = values;
    const formdata = {
     
      email,
      password,
      
    };
    console.log(JSON.stringify(values));
    dispatch(LoadDataList(formdata));
  };
  return (
      <div >

<NavBar />
      
    <div style={{ margin: "5rem" }}>
      <Card
        style={{ width: "30rem", left: "25rem", fontFamily: "cursive",top:'5rem' }}
        title="Login User" 
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
          {loginerror && (<Errorhandle message={loginerror} />)}

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
                  ' "Invalid Password"',
              },
            ]}
            hasFeedback
          >
            <Input.Password type='password'   className="form-input" placeholder="Enter your password" style={{right:'1rem'}} />
          </Form.Item>


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
