import React from 'react';
import {List, Form, Input, Button, Checkbox, Card, Avatar} from 'antd';

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
            allUsers: []
        }
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

    render() {


        const logOut = () => {
            localStorage.clear();
            // history.push('/login');
        }

        console.log('bal', this.state.user)


        return (
            <div className="container">
                <Card title="User Profile" style={{width: 700}}
                      extra={<Button type='primary' onClick={logOut}>Logout</Button>}>
                    <h3>Hello {this.state.user?.name}</h3>
                </Card>
                <p>User List</p>
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.allUsers}
                    renderItem={item => (
                        <List.Item
                            actions={[<a key="list-loadmore-edit">Edit</a>, <a key="list-loadmore-more">Delete</a>]}

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
            </div>


        );
    }
}

export default Profile;
