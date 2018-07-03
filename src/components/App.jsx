import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import './App.css';

import Vainqueur from './Vainqueur';
import TournoisNew from './TournoisNew';
import Home from './Home';
import PostGif from './PostGif';
import Login from './Login';
import Home2 from './Home2';
import Admin from './Admin';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gifTokens: null
    };
  }

  componentDidMount() {
    this.setState({
      gifTokens: sessionStorage.getItem('gifTokens')
    });
  }

  JoueurMaj = (tokens) => {
    this.setState({
      gifTokens: tokens
    });
  }

  render() {
    const PostGifLink = this.state.gifTokens > 0 ? (
      <LinkContainer to="/post-gif">
        <li className="right">
          <p className="count-gif">{this.state.gifTokens}</p>
          <img
            src="https://media.giphy.com/media/54Ya3l8S8y1ggAlzTA/giphy-downsized.gif"
            height="50"
            alt="giphy"
          />
        </li>
      </LinkContainer>
    ) : null;
    return (
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
                <Login cbLogin={this.JoueurMaj}/>
              </li>
              {PostGifLink}
            </Nav>
          </Navbar>
          <div className="main">
            <Route exact path="/" component={Home} />
            <Route path="/post-gif" component={PostGif} />
            <Route path="/tournois" component={TournoisNew} />
            <Route path='/vainqueur' render={() => (
              <Vainqueur joueurConnecte="max" />
            )}/>
            <Route path="/home2" component={Home2} />
            <Route path="/admin" component={Admin} />
          </div>
        </div>
      </Router>
    )
  }
}
