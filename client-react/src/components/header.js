import React from "react";
import {Link, Redirect, useHistory} from "react-router-dom";
import "./header.css";

export default function Header() {

    const history = useHistory();

    const onLogout = (e) => {
        localStorage.removeItem('user');
    }

    const doSearch = (e) => {
        if (e.target.value === "")
            history.push('/');
        else
            history.push('/search?q=' + e.target.value);
    }

    // if (window.location.pathname === '/login') {
    //     return null;
    // }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container">
                <Link className="navbar-brand" to="/">Phoney</Link>
                <input placeholder="Search By Phone Name" className="form-control" onChange={doSearch}/>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                        aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home
                                <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        { !!localStorage.getItem('user') ?
                            <li className="nav-item">
                                <Link className="nav-link" to="/" onClick={onLogout}>Logout
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            :
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                        }
                        {/*<li className="nav-item">*/}
                        {/*    <Link className="nav-link" to="/login">Login*/}
                        {/*        <span className="sr-only">(current)</span>*/}
                        {/*    </Link>*/}
                        {/*</li>*/}
                        {/*<li className="nav-item">*/}
                        {/*    <Link className="nav-link" to="/logout">Logout*/}
                        {/*        <span className="sr-only">(current)</span>*/}
                        {/*    </Link>*/}
                        {/*</li>*/}
                    </ul>
                </div>
            </div>
        </nav>
    );
}