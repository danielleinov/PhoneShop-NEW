import "./login.css"
import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import axios from "axios";

export default function Logout() {
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            localStorage.removeItem('user');
        }
    }, []);

    return <Redirect to='/login'/>
}