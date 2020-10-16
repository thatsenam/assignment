import "antd/dist/antd.css";
import React from 'react';
import ReactDOM from 'react-dom';
import {DatePicker, Button, Menu, SubMenu} from 'antd';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, Redirect
} from "react-router-dom";
import Login from './login'
import Register from './register'
import Profile from "./profile";

function App() {


    return (
        <Router>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">

                        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                        <Switch>
                            <Route path="/login">
                                <Login/>
                            </Route>
                            <Route path="/register">
                                <Register/>
                            </Route>
                            <Route path="/profile">
                                <Profile/>
                            </Route>
                            <Route path="/">
                                <Home/>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>

    );
}

function Home() {
    const [loggedIn, setLoggedIn] = React.useState(localStorage.getItem('token') !== null)

    if (loggedIn) {
        return <Redirect to='/profile'/>
    }
    return <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-12">
                <div className="card text-center">
                    <div className="card-header"><h2>Welcome to Enam's Assignment</h2></div>
                    <div className="card-body">You have to <Link to="/login">Login</Link> or <Link
                        to="/register">Register</Link> to view secret content
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}

export default App;

// DOM element
if (document.getElementById('user')) {
    ReactDOM.render(<App/>, document.getElementById('user'));
}
