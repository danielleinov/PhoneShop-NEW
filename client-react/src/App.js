import './App.css';
import React from 'react';
import Footer from './components/footer';
import Header from './components/header';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Main from './components/main';
import Details from './shop/details';
import Search from './components/search';
import Login from './login/login';

export default function App() {

    // A wrapper for <Route> that redirects to the login
    // screen if you're not yet authenticated.
    function PrivateRoute({children, ...rest}) {

        return (
            <Route
                {...rest}
                render={() =>
                    !!localStorage.getItem('user') ? (
                        children
                    ) : (
                        <Redirect
                            to='/login'
                        />
                    )
                }
            />
        );
    }

    // higher order component
    const withHeaderAndFooter = (Comp) => (
        <>
            <Header/>
            <Comp/>
            <Footer/>
        </>
    )

    return (
        <BrowserRouter>
            <Switch>
                {/* public routes go here*/}
                <Route path="/" exact component={() => withHeaderAndFooter(Main)}/>
                <Route path="/login" exact component={Login}/>

                {/* private routes go here */}
                <PrivateRoute>
                    <Route path="/phone" component={() => withHeaderAndFooter(Details)}/>
                    <Route path="/search" component={() => withHeaderAndFooter(Search)}/>
                </PrivateRoute>
            </Switch>
        </BrowserRouter>
    );
}