import React, {useEffect} from 'react';
import {Form, Input, Button, Checkbox, Card} from 'antd';
import {withRouter} from 'react-router-dom';

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

const Profile = withRouter(({history}) => {
    const token = localStorage.getItem('token');
    const [user, setUser] = React.useState(null)

    const logOut = () => {
        localStorage.clear();
        history.push('/login');
    }

    console.log('bal', user)
    useEffect(() => {
        fetchUser()
    }, []) // <-- empty dependency array
    const fetchUser = () => {
        axios.get("api/user", {
            headers: {
                authorization: 'Bearer ' + token
            }
        }).then((response) => {
            console.log(response.data)
            setUser(response.data);
        }).catch((e) => {
            console.log(e)
            setUser(undefined);

        });
    }
    return (
        <Card title="User Profile" style={{width: 500}} extra={<Button type='primary' onClick={logOut}>Logout</Button>}>
            <h1> Hello {user?.name}</h1>
            <h3> Your mail is  {user?.email}</h3>


        </Card>
    );
});
export default Profile;
