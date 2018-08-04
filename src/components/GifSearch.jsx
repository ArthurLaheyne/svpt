import React, { Component } from 'react';
import axios from 'axios';

import '../css/GifSearch.css';

import loader from '../images/Blocks-0.5s-40px.gif';
// import GphApiClient from 'giphy-js-sdk-core';

class GifSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gifs: [],
      q: "cheeseburgers",
      loading: false
    };
  }

  componentDidMount() {
    this.search(this.state.q);
  }

  search = (q) => {
    this.setState({
      loading: true
    })
    console.log(q);
    axios.get("https://api.giphy.com/v1/gifs/search?api_key=KhcAV0UPWqs1s8gNpeV5U2F9F7aOqsBc&q=" + q).then(response => {
      if (response.data.data) {
        console.log('test');
        console.log(this.state.q);
        this.setState(prevState => ({
          gifs: response.data.data,
          loading: false
        }))
      } else {
        console.log("erreur requete");
      }
    }).catch(error => {
      console.log(error);
    });
  }

  QSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.q.value);
    this.setState({
      q: event.target.q.value
    })
    this.search(event.target.q.value);
  }

  GifChosen = (url) => {
    this.props.cbGifChosen(url);
  }

  render() {
    console.log(this.state.gifs);
    let gifs = [];
    this.state.gifs.forEach((gif, key) => {
      gifs.push(
        <img width="200" height="200" key={key} src={gif.images.fixed_width_small.url} alt="gif" onClick={() => this.GifChosen(gif.images.original.url)}/>
      );
    });
    return (
      <div>
      <form onSubmit={(event) => {this.QSubmit(event)}}>
        <button className="search"><i className="fas fa-search"></i></button>
        <input type="text" className="input-search" name="q" autoFocus/>
        <button type="button" onClick={this.props.cbGifSearchClosed} className="close" name="close" ><i className="fas fa-times"></i></button>
      </form>
        {this.state.loading &&
          <div className="total-center">
            <img src={loader} alt="loading"/>
          </div>
        }
        {!this.state.loading &&
          <div className="grid-gif">
            { gifs }
          </div>
        }
      </div>
    );
  }
}

export default GifSearch;
