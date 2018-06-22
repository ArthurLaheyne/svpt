import React, { Component } from 'react';
import axios from 'axios';
import './GifSearch.css';
import GphApiClient from 'giphy-js-sdk-core';

class GifSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gifs: []
    };
  }

  componentDidMount() {
    this.search();
  }

  search = () => {
    axios.get("https://api.giphy.com/v1/gifs/search?api_key=KhcAV0UPWqs1s8gNpeV5U2F9F7aOqsBc&q=cheeseburgers").then(response => {
      console.log(response);
      if (response.data.data) {
        console.log(response.data.data);
        this.setState({
          gifs: response.data.data
        })
      } else {
        console.log("erreur requete");
      }
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    let gifs = [];
    this.state.gifs.forEach((gif, key) => {
      gifs.push(
        <img key={key} src={gif.images.original.url} alt="gif"/>
      );
    });
    return (
      <div>
        <button onClick={this.props.cbGifSearchClosed}>Fermeture</button>
        <button onClick={this.props.cbGifChosen}>Choisi</button>
        <div className="grid">
          { gifs }
        </div>
      </div>
    );
  }
}

export default GifSearch;
