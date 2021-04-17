import "./login.css"
import React, {useEffect, useState} from "react";
import {Link, Redirect, useHistory} from "react-router-dom";
import axios from "axios";

export default function Login({count, onCountChange}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState();

    const history = useHistory();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        const user = {username, password};
        // send the username and password to the server
        axios.post(
            "http://localhost:8080/api/user/login",
            user
        ).then((response) => {
            // set the state of the user
            setUser(response.data)

            // store the user in localStorage
            localStorage.setItem('user', JSON.stringify(response.data))
            history.push("/");
        }).catch((err => {
            alert('Login Failed. Please try Again');
        }));
    };

    // If there's a user, redirect to main page
    if (user) {
        return <Redirect to={'/'}/>
    }

    // if there's no user, show the login form
    return (
        <form className="login" onSubmit={handleSubmit}>
            <div className="container">
                <div className="d-flex justify-content-center h-100">
                    <div className="loginForm">
                        <div className="card-header">
                            <h3>Sign In</h3>
                            <div className="d-flex justify-content-end social_icon">
                                <span><i className="fab fa-facebook-square"/></span>
                                <span><i className="fab fa-google-plus-square"/></span>
                                <span><i className="fab fa-twitter-square"/></span>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-user"/></span>
                                </div>
                                <input type="email" className="form-control" value={username} placeholder="username"
                                       onChange={({target}) => setUsername(target.value)}/>
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-key"/></span>
                                </div>
                                <input type="password" className="form-control" value={password} placeholder="password"
                                       onChange={({target}) => setPassword(target.value)}/>
                            </div>
                            <div className="form-group">
                                <button type="submit" defaultValue="Login" className="btn login_btn">
                                    Login
                                </button>
                            </div>
                            <div className="form-group">
                                <Link to={'/register'}>
                                    <button type="register" defaultValue="Register"
                                            className="btn btn-primary">Register
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}