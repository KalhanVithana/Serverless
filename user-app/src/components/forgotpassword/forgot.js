
import React, { useState, } from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import '../../assets/form.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { LoadDataList, LoadRegisterData, LoginUser, SucessDataList } from '../redux/action/user';
import { useNavigate } from 'react-router-dom';
import NavBar from '../headers/nav';
import { ToastContainer, toast } from 'react-toastify';
import { LoadFogotData } from '../redux/action/password';
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
export default function Forgot() {

    const [email, setemail] = useState("");
    const state = useSelector(state => state.LoginReducer)
    const dispatch = useDispatch();

    const verfiyData = async (e) => {
        try {
            e.preventDefault();
            const formdata = {
                email
            }
            dispatch(LoadFogotData(formdata))
        } catch (e) {
            console.log(e)
        }
    }

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
        const { email} = values;
            
        const formdata = {
            email
        }
        dispatch(LoadFogotData(formdata))
      };
    
   
  
const navigate =useNavigate();

    return (
        <div>
            <ToastContainer />
            <NavBar/>

            <div className="">
        <Card
          style={{
            width: "50rem",
            left: "26rem",
            fontFamily: "cursive",
            top: "10rem",
            textAlign:'center'
          }}
          title="Forgot Password"
        >
          <Form
            {...layout}
            name="nest-messages"
            labelCol={{ span: 60 }}
            wrapperCol={{ span: 40 }}
            onFinish={onFinish}
            style={{display:'block'}}
            
          >
            <Form.Item
              name="email"
              label="email"
              rules={[
                {
                  required: true,
                },
                { type: "email" },
               
        
              ]}
              hasFeedback
            >
              <Input placeholder="Enter your email code" />
            </Form.Item>
        
           
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 5 }}>
              <Button block type="primary" htmlType="submit">
                Foogot password
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
             {/* <div className="form">
            <MDBCol>
                <MDBCard style={{ width: "45rem" ,right:"15rem"}}>
                   <MDBCardBody>
                      <form onSubmit={verfiyData}>
                        <p className="h4 text-center mb-4">Forogot Password </p>
                          
                            <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
                               type email
                            </label>
                            <input type="email" id="defaultFormRegisterPasswordEx" className="form-control" value={email} onChange={(e) => {
                                setemail(e.target.value)

                            }} />
                            <div className="text-center mt-4">
                                <button type="submit" class="btn btn-primary btn-rounded">Send</button>
                            </div>
                        </form>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
            </div> */}
        </div>
        
    )
}
