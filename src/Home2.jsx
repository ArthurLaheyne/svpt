import React, { Component } from 'react';
import './Home.css';
import './GifNewForm.css';
import loader from './images/Blocks-0.5s-40px.gif';
import axios from 'axios';
import GifSearch from './GifSearch';
import GifNew from './GifNew';

class Home2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      giphynews: [],
      ready: false,
      showGifSearch: false,
      gifUrl: "https://media1.giphy.com/media/YJBNjrvG5Ctmo/giphy.gif",
      backgroundColor: "",
      color: "",
      text: ""
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

  setText = (event) => {
    this.setState({
      text: event.target.value
    })
  }

  setBackgroundColor = (event) => {
    this.setState({
      backgroundColor: event.target.value
    })
  }

  setColor = (event) => {
    this.setState({
      color: event.target.value
    })
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
          <div key={key}>
            <GifNew
              backgroundColor={giphynew.backgroundColor}
              gifUrl={giphynew.gifUrl}
              text={giphynew.text}
              color={giphynew.color}
            />
          </div>
        )
      });

      return (
        <div id="home">
          <form className="gif-new-form"
            style={{color: "black"}}
            method="post"
            onSubmit={this.sendGif}
          >
            <img onClick={this.searchGif} className="gifUrl" src={this.state.gifUrl} />
            <input className="top" onChange={(event) => {this.setText(event)}} placeholder="text" value={this.state.text} type="text" name="text"/>
            <input onChange={(event) => {this.setColor(event)}} value={this.state.color} type="text" name="color"/>
            <input onChange={(event) => {this.setBackgroundColor(event)}} value={this.state.backgroundColor} type="text" name="backgroundColor"/>
          </form>
          <div>
            <GifNew
              backgroundColor={this.state.backgroundColor}
              gifUrl={this.state.gifUrl}
              text={this.state.text}
              color={this.state.color}
            />
          </div>
          {giphynews}
        </div>
      );
    }
  }
}

export default Home2;
