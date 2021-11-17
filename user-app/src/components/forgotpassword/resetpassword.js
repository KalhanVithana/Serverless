import React, { useState } from "react";
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
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  LoadDataList,
  LoadRegisterData,
  LoginUser,
  SucessDataList,
} from "../redux/action/user";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../headers/nav";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadRest } from "../redux/action/password";
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

export default function ResetPassword() {
  const [password, setpassword] = useState("");
  const [cfmpassword, setcfmpassword] = useState();
  const params = useParams();
  const { id: resetToken } = params;
  console.log(resetToken);
  const navigate = useNavigate();

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

  const dispatch = useDispatch();

  const ResetPassword = async (e) => {
    try {
      const formdata = {
        password,
        resetToken,
      };
      //  await axios.post('http://localhost:4000/user/reset',formdata).then(res=>{
      //       console.log(res.data)
      //       toast.success("password reset successfully")
      //       navigate('/login', { replace: true })

      //   }).catch(err=>{
      //       console.log(err)
      //       toast.error("password reset error")
      //   });

      dispatch(LoadRest(formdata));
    } catch (e) {
      console.log(e);
    }
  };

  const onFinish = async (values) => {
    const { password } = values;

    const formdata = {
      password,
      resetToken,
    };
    dispatch(LoadRest(formdata));
  };

  return (
    <div>
      <ToastContainer />

      <div className="">
        <Card
          style={{
            width: "30rem",
            left: "35rem",
            fontFamily: "cursive",
            top: "10rem",
            textAlign:'center'
          }}
          title="Reset Password"
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
                  message: " Invalid Password",
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
                Reset Password
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>

      {/* <div className="form">
                <MDBCol>
                    <MDBCard style={{ width: "45rem", right: "15rem" }}>
                        <MDBCardBody>
                            <form onSubmit={handleSubmit(ResetPassword)}>
                                <p className="h4 text-center mb-4">Reset Password </p>

                                <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
                                    new password
                                </label>
                                <input  {...register("password", { required: true })} type="password" id="defaultFormRegisterConfirmEx" name="password" className="form-control" value={password} onChange={(e) => {
                                    setpassword(e.target.value)
                                  

                                }} />
                                <p style={{ color: "red" }}> {errors.password?.message}</p>

                                <br />
                                <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
                                    Confirm your password
                                </label>
                                <input  {...register("confirmPassword", { required: true })} type="password" id="defaultFormRegisterPasswordEx" name="confirmPassword" className="form-control" value={cfmpassword} onChange={(e) => {
                                    setcfmpassword(e.target.value)


                                }} />
                                <p style={{ color: "red" }}> {errors.confirmPassword && "not match password"}</p>
                                <div className="text-center mt-4">
                                    <button type="submit" class="btn btn-primary btn-rounded">Update</button>
                                </div>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </div> */}
    </div>
  );
}
