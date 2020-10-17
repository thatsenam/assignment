import React from 'react';
import {Form, Input, Button, Checkbox, Card} from 'antd';
import {Link} from "react-router-dom";
import {Redirect} from 'react-router-dom';

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

const Login = () => {

    const [loggedIn, setLoggedIn] = React.useState(localStorage.getItem('token') !== null)
    console.log(loggedIn, localStorage.getItem('token'))

    const onFinish = (values) => {
        console.log('Success:', values);
        axios.post("api/login", values).then((response) => {
            console.log(response.data)
            // setShowResults(true);
            let token = response.data.token;
            if (token) {
                localStorage.setItem('token', token);
                setLoggedIn(true);
                this.props.history.push('/profile')
            }
            console.log(response.data)


        }).catch((e) => {
            console.log(e)

        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    if (loggedIn) {
        return <Redirect to='/profile'/>
    }
    return (

        <Card title="Default size card" title="Please Login" style={{width: 500}}>

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
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
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

                <Form.Item {...tailLayout} valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                    <p>Not Registered?? <Link to='/register'>Register Now</Link></p>
                </Form.Item>
            </Form>
        </Card>
    );
};
export default Login;
