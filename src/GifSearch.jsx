import React, { Component } from 'react';
import axios from 'axios';
import './GifSearch.css';
import GphApiClient from 'giphy-js-sdk-core';

class GifSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gifs: [],
      q: "cheeseburgers"
    };
  }

  componentDidMount() {
    this.search(this.state.q);
  }

  search = (q) => {
    console.log(q);
    axios.get("https://api.giphy.com/v1/gifs/search?api_key=KhcAV0UPWqs1s8gNpeV5U2F9F7aOqsBc&q=" + q).then(response => {
      if (response.data.data) {
        console.log('test');
        this.setState(prevState => ({
          gifs: [...prevState.gifs, response.data.data]
        }))
      } else {
        console.log("erreur requete");
      }
    }).catch(error => {
      console.log(error);
    });
  }

  QChange = (event) => {
    console.log(event.target.value);
    this.setState({
      q: event.target.value
    })
    this.search(event.target.value);
  }

  GifChosen = (url) => {
    this.props.cbGifChosen(url);
  }

  render() {
    let gifs = [];
    this.state.gifs.forEach((gif, key) => {
      gifs.push(
        <img key={key} src={gif.images.original.url} alt="gif" onClick={() => this.GifChosen(gif.images.original.url)}/>
      );
    });
    return (
      <div>
        <input onChange={(event) => {this.QChange(event)}} type="text" className="input-search" name="q" autoFocus/>
        <button onClick={this.props.cbGifSearchClosed} className="close" name="close" >X</button>
        <div className="grid-gif">
          { gifs }
        </div>
      </div>
    );
  }
}

export default GifSearch;
