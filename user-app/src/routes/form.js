import React from "react";
import { Form, Input, InputNumber, Button, Card,Row,Col } from "antd";

export default function FORMID() {
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

   console.log(values)

  };


  return (
    <div>
             
        
      <Card style={{ width: "40rem", marginRight: "120rem" }}>
     
        <Form
          {...layout}
          name="nest-messages"
          validateMessages={validateMessages}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 30 }}
          onFinish={onFinish}
          labelAlign={'left'}
          style={{alignItems:'center',textAlign:'center'}}
        >
          <Form.Item
            name={["user", "fname"]}
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
            name={["user", "lname"]}
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
            name={["user", "email"]}
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

          <Form.Item
            name="password"
            label="password"
            rules={[
              {
                required: true,
              },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,64}$/,
                message:
                  ' "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"',
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>


          <Form.Item
            name="confirm"
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
        <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 7 }}>
            <Button block type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
