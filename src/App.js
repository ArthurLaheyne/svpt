import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Navbar, Nav, NavItem, Jumbotron, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from './logo.svg';
import './App.css';

import Vainqueur from './Vainqueur';
import Tournois from './Tournois';

const App = () => (
  <Router>
    <div id="layout-app">
      <Navbar expanded={false}>
        <Navbar.Header>
          <Navbar.Brand>
            <img src={logo} className="App-logo" alt="logo" />
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
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
        <Route path="/tournois" component={Tournois} />
        <Route path="/vainqueur" component={Vainqueur} />
      </div>
    </div>
  </Router>
);

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

export default App;