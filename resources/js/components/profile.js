import React from 'react';
import {List, Form, Input, Button, Checkbox, Card, Avatar, Modal} from 'antd';

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

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            allUsers: [],
            visible: false,
            newUserModal: false,
            edit_user_id: null,
            edit_user_name: null,
            edit_user_email: null,


        }
        // this.delta = this.delta.bind(this);
    }

    componentDidMount() {
        this.fetchUser()
        this.fetchUsers()
        // this.fetchUsers()
    }


    fetchUser() {
        const token = localStorage.getItem('token');

        axios.get("api/userinfo", {
            headers: {
                authorization: 'Bearer ' + token
            }
        }).then((response) => {
            console.log(response.data)

            this.setState({user: response.data})
            // setUser(response.data);
        }).catch((e) => {
            console.log(e)
            this.setState({user: null})

            // setUser(undefined);
        });
    }

    fetchUsers() {
        const token = localStorage.getItem('token');

        axios.get("api/user", {
            headers: {
                authorization: 'Bearer ' + token
            }
        }).then((response) => {
            console.log(response.data)
            // setAllUsers(response.data);
            // this.setState({user: response.data})
            this.setState({allUsers: response.data})


        }).catch((e) => {
            console.log(e)
            // setAllUsers([]);
            this.setState({allUsers: []})

        });
    }

    showModal(id, name, email) {
        console.log(id, 'selected id', name, email)

        this.setState({
            visible: true,
        });
        setTimeout(() => {
            this.form.resetFields()
            this.setState({
                edit_user_id: id,
                edit_user_name: name,
                edit_user_email: email,
            });
            setTimeout(() => {
                this.form.resetFields()
                this.setState({
                    edit_user_id: id,
                    edit_user_name: name,
                    edit_user_email: email,
                });
            }, 100)
        }, 100)


    };

    showNewUserModal() {

        this.setState({
            newUserModal: true,
        });


    };

    handleOk(e) {
        this.submitButton.click()
        console.log(e);
    };

    handleNewUser(e) {
        this.newUserSubmitButton.click()
        console.log(e);
    };

    handleNewUserCancel(e) {

        console.log(e);
        this.setState({
            newUserModal: false,
        });
    };

    handleCancel(e) {

        console.log(e);
        this.setState({
            visible: false,
        });
    };

    onFinish(values) {
        const token = localStorage.getItem('token');

        console.log('Success:', values);

        axios.get(`api/user/${values.id}/edit`, {
            headers: {
                authorization: 'Bearer ' + token
            },
            params: values

        }).then((response) => {
            console.log(response.data)
            this.fetchUsers()
            this.fetchUser()

        }).catch((e) => {
            console.log(e)

        });
        this.setState({
            visible: false,
        });
    };

    createUser(values) {
        const token = localStorage.getItem('token');

        console.log('creating.. user', values);

        axios.post("api/register", values).then((response) => {
            console.log(response.data)
            this.fetchUsers()
            this.fetchUser()

        }).catch((e) => {
            console.log(e)

        });
        this.setState({
            newUserModal: false,
        });
    };

    onFinishFailed(errorInfo) {
        console.log('Failed:', errorInfo);

    };

    deleteUser(id) {
        const token = localStorage.getItem('token');
        axios.delete(`api/user/${id}`, {
            headers: {
                authorization: 'Bearer ' + token
            },
        }).then((response) => {
            console.log(response.data)
            this.fetchUsers()

        }).catch((e) => {
            console.log(e)

        });
    }

    render() {


        const logOut = () => {
            localStorage.clear();
        }

        console.log('bal', this.state.user)


        return (
            <div className="container">
                <Card title="User Profile" style={{width: 700}}
                      extra={<Button type='primary' onClick={logOut}>Logout</Button>}>
                    <h3>Hello {this.state.user?.name} [{this.state.user?.email}]</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda at, blanditiis expedita
                        nostrum quos voluptatum! Architecto cumque dicta eveniet provident veritatis! Aliquid ducimus
                        fuga minus praesentium repudiandae sit soluta voluptatibus.</p>
                </Card>
                <p>User List</p>
                <Button type="primary" onClick={() => this.showNewUserModal()}>Add New
                    User</Button>
                <br/>
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.allUsers}
                    renderItem={item => (
                        <List.Item
                            actions={[<a key="list-loadmore-edit" className="btn btn-sm  btn-info"
                                         onClick={() => this.showModal(item.id, item.name, item.email)}>Edit</a>,
                                <a className="btn btn-sm btn-danger" key="list-loadmore-more"
                                   onClick={() => this.deleteUser(item.id)}
                                   hidden={this.state.user?.id === item.id}>Delete</a>]}

                        >
                            <List.Item.Meta
                                avatar={<Avatar
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                title={item.name}
                                description={item.email}
                            />
                        </List.Item>
                    )}
                />
                <Modal
                    title="Edit User"
                    visible={this.state.visible}
                    onOk={(e) => this.handleOk(e)}
                    onCancel={(e) => this.handleCancel(e)}
                >
                    <Form ref={form => this.form = form}
                          name="basic"
                          initialValues={{
                              remember: false,
                          }}
                          onFinish={(v) => this.onFinish(v)}
                          onFinishFailed={(v) => this.onFinishFailed(v)}
                    >
                        <Form.Item
                            label="User ID"
                            name="id"
                            initialValue={this.state.edit_user_id}

                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your id!',
                                },
                            ]}
                        >
                            <Input readOnly/>
                        </Form.Item>
                        <Form.Item
                            label="Username"
                            name="name"
                            initialValue={this.state.edit_user_name}

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
                            label="Email"
                            name="email"
                            initialValue={this.state.edit_user_email}

                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>


                        <Form.Item hidden>
                            <Button type="primary" htmlType="submit" hidden ref={button => this.submitButton = button}>
                                Update
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    title="Add New User"
                    visible={this.state.newUserModal}
                    onOk={(e) => this.handleNewUser(e)}
                    onCancel={(e) => this.handleNewUserCancel(e)}
                >
                    <Form
                        name="basic"
                        initialValues={{
                            remember: false,
                        }}
                        onFinish={(v) => this.createUser(v)}
                        onFinishFailed={(v) => this.onFinishFailed(v)}
                    >

                        <Form.Item
                            label="Username"
                            name="name"


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
                            label="Email"
                            name="email"


                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
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


                        <Form.Item hidden>
                            <Button type="primary" htmlType="submit" hidden
                                    ref={button => this.newUserSubmitButton = button}>
                                Add User
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>


        );
    }
}


export default Profile;
