import './App.css';
import React, {useEffect, useState} from 'react';
import io from "socket.io-client";
import Footer from './components/footer';
import Header from './components/header';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Main from './components/main';
import Details from './shop/details';
import Search from './components/search';
import Login from './login/login';
import Cart from './cart/cart';
import Checkout from './checkout/checkout'
import Register from './login/register'

const socket = io.connect("http://localhost:8080");

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

    const [count, setCount] = useState(0);
    useEffect(() => {
        JSON.parse(localStorage.getItem("user")) ?
        fetch('http://localhost:8080/api/cart/user/' + JSON.parse(localStorage.getItem("user"))._id)
            .then((response) => response.json())
            .then((data) => {
                setCount(data.totalQuantity)
                const cartDetails = JSON.stringify(data);
                localStorage.setItem('cart', cartDetails);
            })
            :
            setCount(0)

    },[])
    // higher order component
    const withHeaderAndFooter = (Comp) => (
        <>
            <Header count={count} onCountChange={setCount}/>
            <Comp count={count} onCountChange={setCount}/>
            <Footer/>
        </>
    )
    return (

        <BrowserRouter>
            <Switch>
                {/* public routes go here*/}
                <Route path="/"  exact component={() => withHeaderAndFooter(Main)}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/register" exact component={Register}/>

                {/* private routes go here */}
                <PrivateRoute>
                    <Route path="/phone"  component={() => withHeaderAndFooter(Details)}/>
                    <Route path="/search" component={() => withHeaderAndFooter(Search)}/>
                    <Route path="/cart" component={() => withHeaderAndFooter(Cart)}/>
                    <Route path="/checkout" component={() => withHeaderAndFooter(Checkout)}/>
                </PrivateRoute>
            </Switch>
        </BrowserRouter>
    );
}