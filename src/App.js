import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './App.css';

import Vainqueur from './Vainqueur';
import TournoisNew from './TournoisNew';
import Home from './Home';
import Home2 from './Home2';
import Login from './Login';


const App = () => (
  <Router>
    <div id="layout-app">
      <Navbar defaultExpanded={false}>
        <Nav>
          <LinkContainer exact to="/">
            <NavItem eventKey={1}><i className="fas fa-home"></i></NavItem>
          </LinkContainer>
          <LinkContainer to="/tournois">
            <NavItem eventKey={2}><i className="fas fa-trophy"></i></NavItem>
          </LinkContainer>
          <LinkContainer to="/vainqueur">
            <NavItem eventKey={3}><i className="fas fa-chart-bar"></i></NavItem>
          </LinkContainer>
          <li className="right">
            <Login />
          </li>
        </Nav>
      </Navbar>
      <div className="main">
        <Route exact path="/" component={Home} />
        <Route path="/home2" component={Home2} />
        <Route path="/tournois" component={TournoisNew} />
        <Route path="/vainqueur" component={Vainqueur} />
      </div>
    </div>
  </Router>
);

export default App;
