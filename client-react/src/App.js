import './App.css';
import Footer from './components/footer';
import Header from './components/header';
import Item from './components/item';
import List from './components/list';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from './components/main';
import Details from './components/details';
import Search from './components/search';

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        {/* Page Content */}
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <h1 className="my-4">Shop Name</h1>
              <div className="list-group">
                <a href="#" className="list-group-item">Category 1</a>
                <a href="#" className="list-group-item">Category 2</a>
                <a href="#" className="list-group-item">Category 3</a>
              </div>
            </div>
            {/* /.col-lg-3 */}
            <Switch>
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
