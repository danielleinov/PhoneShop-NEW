import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import "./header.css";

export default function Header({count, onCountChange}) {

    const onLogout = (e) => {
        localStorage.clear();
    }

    const route = JSON.parse(localStorage.getItem("cart")) ? `/cart/${JSON.parse(localStorage.getItem("cart"))._id}` : ""

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container">
                <Link className="navbar-brand" to="/">Phoney</Link>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home
                                <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        {!!localStorage.getItem('user') ?
                            <>
                                <li className="nav-item active">
                                    <Link className="nav-link" to={route}>
                                        <svg width="18px" fill="currentColor" viewBox="0 0 20 20">
                                            <path
    d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                                        </svg>
                                        ({count})
                                        <span className="sr-only">(current)</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/" onClick={onLogout}>Logout
                                        <span className="sr-only">(current)</span>
                                    </Link>
                                </li>
                            </>
                            :
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}