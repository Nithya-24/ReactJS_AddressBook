import './App.css';
import Home from "./components/Home/home";
import AddressBook from './components/AddressBook/addressBook';
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Dashboard from './components/Dashboard/dashboard';

function App() {
  return (
    <>
      <Home />
      <Router>
        <div className="App">
              <Switch>
                  <Route exact path="/" component={Dashboard}/>
                  <Route exact path="/form" component={AddressBook}/>
                  <Route exact path="/form/:id" component={AddressBook}/>
              </Switch>
        </div>
      </Router>
      </>
  );
}

export default App;