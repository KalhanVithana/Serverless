
import React, { useState,useEffect } from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import '../../assets/form.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import NavBar from '../headers/nav';
import { ToastContainer, toast } from 'react-toastify';
import { LoadPasswordData } from '../redux/action/password';
import Errorhandle from '../../misc/errorhandle';
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

export default function Verify() {
    const [email, setemail] = useState("")
    const [verifycode, setverifycode] = useState("");

    const err = useSelector(state => state.PasswordReducer)
    const {error,auth,validate} =err;
    const dispatch = useDispatch();

    useEffect(() => {
       
    }, [auth])

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      };
    
    


    
   
    const onFinish = async (values) => {
        const { verifycode} = values;
            
        const formdata = {
            verifycode
             }
        console.log(JSON.stringify(values));
        dispatch(LoadPasswordData(formdata));
      };
    
   


    return (
        <div>
            <ToastContainer/>
            <div className="">
        <Card
          style={{
            width: "50rem",
            left: "26rem",
            fontFamily: "cursive",
            top: "10rem",
            textAlign:'center'
          }}
          title="Verification code"
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
              name="verifycode"
              label="verifycode"
              rules={[
                {
                  required: true,
                },
               
        
              ]}
              hasFeedback
            >
              <Input placeholder="Enter your verification code" />
            </Form.Item>
        
           
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 5 }}>
              <Button block type="primary" htmlType="submit">
                Verify
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
{/*          
             <div className="form">
            <MDBCol>
                <MDBCard style={{ width: "45rem" ,right:"15rem"}}>

                    <MDBCardBody>
                        <form onSubmit={verfiyData}>
                        <p className="h4 text-center mb-4">Verification </p>
                          
                            <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
                                Verify code
                            </label>
                            <input type="verifycode" id="defaultFormRegisterPasswordEx" className="form-control" value={verifycode} onChange={(e) => {
                                setverifycode(e.target.value)

                            }} />
                            
                            <div className="text-center mt-4">
                                <button type="submit" class="btn btn-primary btn-rounded">Verify</button>
                                
                            </div>
                        </form>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
            </div> */}
        </div>
        
    )
}
