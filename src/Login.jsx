import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      joueur: null,
      connecting: false
    };
  }

  componentDidMount() {
    this.setState({
      connecting: false
    });
  }

  responseFacebook = (response) => {
    fetch(process.env.REACT_APP_API_URL + '/auth/facebook/token', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({access_token: response.accessToken})
    })
      .then(res => {
        res.json().then((data) => {
          if (data.joueur) {
            this.setState({
              joueur: data.joueur,
              connecting: false
            })
          }
        });
      });
  }

  logoutCallback = () => {
    this.setState({
      joueur: null
    })
  }

  render() {
    if (this.state.joueur) {
      return (
        <span onClick={() => this.logoutCallback()} className="facebook">{this.state.joueur.pseudo}</span>
      )
    } else if (this.state.connecting) {
      return (
        <span className="facebook">connecting...</span>
      )
    }
    return (
      <div>
        <FacebookLogin
          appId="2593367260889259"
          autoLoad={true}
          fields="name,email,picture"
          textButton="Log FB"
          onClick={this.onClick}
          callback={this.responseFacebook}
        />
      </div>
    );
  }
}

export default Login;
