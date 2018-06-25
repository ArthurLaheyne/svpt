import React, { Component } from 'react';
import './Home.css';
import loader from './images/Blocks-0.5s-40px.gif';
import axios from 'axios';
import GifSearch from './GifSearch';

class Home2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      giphynews: [],
      ready: false,
      showGifSearch: false
    };
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_API_URL + '/giphynews')
      .then(res => res.json())
      .then(res => {
        this.setState({
          giphynews: res.data,
          ready: true
        })
      });
  }

  sendGif = (event) => {
    event.preventDefault();
    let params = {
      text:             event.target.text.value,
      backgroundColor:  event.target.backgroundColor.value,
      color:            event.target.color.value,
      gifUrl:           event.target.gifUrl.value
    }
    console.log(
      params
    );

    // do something with form values, and then
    axios.post(process.env.REACT_APP_API_URL + '/giphynew', params).then(response => {
      console.log(response);
      console.log(params);
      let giphynews = this.state.giphynews;
      giphynews.push(params);
      this.setState({
        giphynews: giphynews
      })
      // do something with response, and on response
    }).catch(error => {
      console.log(error);
      // do something when request was unsuccessful
    });
  }

  searchGif = () => {
    this.setState({
      showGifSearch: true
    });
  }

  gifChosen = (url) => {
    console.log("j'ai bien choisi mon gif", url);
    this.setState({
      showGifSearch: false,
      gifUrl: url
    })
  }

  gifSearchClosed = () => {
    console.log("fermeture de la recherche");
    this.setState({
      showGifSearch: false
    })
  }

  render() {
    if (!this.state.ready) {
      return (
        <div className="total-center">
          <img src={loader} alt="loading"/>
        </div>
      )
    } else if (this.state.showGifSearch) {
      return (
        <GifSearch cbGifChosen={this.gifChosen} cbGifSearchClosed={this.gifSearchClosed}/>
      )
    } else {
      let giphynews = [];
      this.state.giphynews.slice(0).reverse().forEach((giphynew, key) => {
        giphynews.push(
          <div className="news" key={key}>
            <div className="content" style={{backgroundColor: giphynew.backgroundColor}}>
              <img src={giphynew.gifUrl} alt="gif"/>
              <p className="top" style={{color: giphynew.color}}>
                {giphynew.text}
              </p>
            </div>
          </div>
        )
      });

      return (
        <div id="home">
          <form
            style={{color: "black"}}
            method="post"
            onSubmit={this.sendGif}
          >
            <input type="text" name="text"/>
            <input type="text" name="color"/>
            <input type="text" name="backgroundColor"/>
            <input onFocus={this.searchGif} type="text" name="gifUrl" value={this.state.gifUrl} readOnly />
            <button type="submit">Envoyer</button>
          </form>
          {giphynews}
        </div>
      );
    }
  }
}

export default Home2;
