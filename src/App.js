import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from './logo.svg';
import './App.css';

import Vainqueur from './Vainqueur';
import Tournois from './Tournois';
import Home from './Home';
import Homeee from './Homeee';

const App = () => (
  <Router>
    <div id="layout-app">
      <Navbar defaultExpanded={false}>
        <Navbar.Header>
          <Navbar.Brand>
            <img src={logo} className="App-logo" alt="logo" />
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <LinkContainer to="/">
            <NavItem eventKey={1}>Home</NavItem>
          </LinkContainer>
          {/* <LinkContainer to="/homeee">
            <NavItem eventKey={1}>Homeee</NavItem>
          </LinkContainer> */}
          <LinkContainer to="/tournois">
            <NavItem eventKey={1}>Tournois</NavItem>
          </LinkContainer>
          <LinkContainer to="/vainqueur">
            <NavItem eventKey={1}>Vainqueur</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>
      <div className="main">
        <Route exact path="/" component={Home} />
        <Route path="/homeee" component={Homeee} />
        <Route path="/tournois" component={Tournois} />
        <Route path="/vainqueur" component={Vainqueur} />
      </div>
    </div>
  </Router>
);

export default App;
