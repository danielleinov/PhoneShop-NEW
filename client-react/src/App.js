import './App.css';
import React, { useState, useEffect } from 'react';
import Footer from './components/footer';
import Header from './components/header';
import Item from './components/item';
import List from './components/list';
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Main from './components/main';
import Details from './components/details';
import Search from './components/search';
import CheckUser from './checkLogin';
import Login from './components/login';


export default function App() {
  //const history = useHistory();
  //const [connectedUser, setConnectedUser] = useState(JSON.parse(localStorage.getItem("user")))
  //const [cloudAccountDetails, setCloudAccountDetails] = useState(JSON.parse(localStorage.getItem("cloudAccount")));
  return (
    <BrowserRouter>
      <div>
        <Header />
        {/* Page Content */}
        <div className="container">
          <div className="row">
            {/* /.col-lg-3 */}
            <Switch>
              <Route path="/login" exact component={Login} />
              <Route path="/" exact component={Main} />
              <Route path="/phone" component={() => <Details />} />
              <Route path="/search" component={() => <Search  />} />
            </Switch>           
          </div>
          {/* /.row */}
        </div>
        {/* /.container */}
        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>

  );
}
