import React, { Component } from 'react';
import { observer, inject } from "mobx-react";

import GiphyNew from '../components/GiphyNew';

import '../css/Home.css';
import loader from '../images/Blocks-0.5s-40px.gif';

const Home = inject("store")(observer(class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      giphynews: [],
      ready: false
    };
  }

  componentDidMount() {
    this.props.store.refreshJoueur();
    fetch(process.env.REACT_APP_API_URL + '/giphynews')
      .then(res => res.json())
      .then(res => {
        this.setState({
          giphynews: res.data,
          ready: true
        })
      });
  }

  render() {
    if (!this.state.ready) {
      return (
        <div className="total-center">
          <img src={loader} alt="loading"/>
        </div>
      )
    } else {
      let giphynews = [];
      this.state.giphynews.forEach((giphynew, key) => {
        let element = (
          <div key={key}><div dangerouslySetInnerHTML={{__html: giphynew.body}}></div></div>
        );
        giphynews.push(element);
      });

      return (
        <div id="home">
          { giphynews }
        </div>
      );
    }
  }
}))

export default Home;
