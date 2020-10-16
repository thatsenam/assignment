import React from 'react';
import {Alert, Button, Card, Form, Input} from 'antd';

import {Link} from "react-router-dom";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

function Register() {
    const [showResults, setShowResults] = React.useState(false)

    const onFinish = (values) => {
        console.log('Success:', values);

         axios.post("api/register", values).then((response) => {
            console.log(response.data)
            setShowResults(true);
        }).catch((e) => {
            console.log(e)

        })


    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Card title="Default size card" title="Fill the form to Register" style={{width: 500}}>
            <Alert
                message="User Registered"
                description="User Registered Successfullu. Click here to login"
                type="success"
                showIcon
                style={showResults ? {} : {display: 'none'}}
            />
            <br/>
            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label="email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email address!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>


                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password/>
                </Form.Item>


                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                    <p>Already Registered?? <Link to='/login'>Login Now</Link></p>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default Register;
