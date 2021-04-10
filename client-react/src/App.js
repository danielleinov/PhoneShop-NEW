import './App.css';
import React from 'react';
import Footer from './components/footer';
import Header from './components/header';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Main from './components/main';
import Details from './components/details';
import Search from './components/search';
import Login from './components/login';

export default function App() {

    return (
        <BrowserRouter>
            <div>
                <Route path="/login" exact component={Login}/>
                <Header/>
                <div className="container">
                    <div className="row">
                        <Switch>
                            <Route path="/" exact component={Main}/>
                            <Route path="/phone" component={() => <Details/>}/>
                            <Route path="/search" component={() => <Search/>}/>
                        </Switch>
                    </div>
                </div>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}
