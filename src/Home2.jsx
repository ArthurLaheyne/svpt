import React, { Component } from 'react';
import './Home.css';
import './GifNewForm.css';
import loader from './images/Blocks-0.5s-40px.gif';
import axios from 'axios';
import GifSearch from './GifSearch';
import GifNew from './GifNew';
import {CirclePicker} from 'react-color';

class Home2 extends Component {

  constructor(props) {
    super(props);
    this.textarea = React.createRef();
    this.state = {
      user: null,
      giphynews: [],
      ready: false,
      showGifSearch: false,
      gifUrl: "https://media1.giphy.com/media/YJBNjrvG5Ctmo/giphy.gif",
      backgroundColor: "red",
      color: "blue",
      text: ""
    };
  }

  componentDidMount() {
    var tx = this.textarea;
    for (var i = 0; i < tx.length; i++) {
      tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
    }
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

  setHeightTextArea = (event) => {
    event.target.style.height = 'auto';
    event.target.style.height = (event.target.scrollHeight) + 'px';
  }

  colorPickerComplete = (color) => {
    this.setState({
      backgroundColor: this.hexToRgbA(color.hex, 0.7),
      color: this.hexToRgbA(this.invertColor(color.hex), 1),
    });
  };

  invertColor(hex) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    // invert color components
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    // pad each with zeros and return
    return '#' + this.padZero(r) + this.padZero(g) + this.padZero(b);
  }

  padZero(str, len) {
      len = len || 2;
      var zeros = new Array(len).join('0');
      return (zeros + str).slice(-len);
  }

  hexToRgbA(hex, opacity){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
      c= hex.substring(1).split('');
      if(c.length=== 3){
        c= [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c= '0x'+c.join('');
      return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+opacity+')';
    }
    throw new Error('Bad Hex');
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
            method="post"
            onSubmit={this.sendGif}
          >
            <p
              className="gif-new"
              style={{
                color: this.state.color,
                backgroundColor: this.state.backgroundColor
              }}
            >
              <img onClick={this.searchGif} className="gifUrl" src={this.state.gifUrl} />
              <textarea
                ref={this.textarea}
                onInput={(event) => {this.setHeightTextArea(event)}}
                onChange={(event) => {this.setText(event)}}
                className="top"
                placeholder="text"
                value={this.state.text}
                name="text"
                rows="1"
              >
              </textarea>
            </p>
            <div style={{padding: "10px"}}>
              <div style={{marginBottom: "10px"}}>
                <CirclePicker
                  colors={['#ee0000', '#ee0077', '#ea00ee', '#7700ee', '#0000ee', '#0077ee', '#00eeee', '#00ee77', '#00ee00', '#77ee00', '#eeee00', '#ee7700']}
                  width="auto"
                  color={ this.state.backgroundColor }
                  onChangeComplete={ this.colorPickerComplete }
                />
              </div>
            </div>
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
