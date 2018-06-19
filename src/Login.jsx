import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      joueur: null
    };
  }

  componentDidMount() {
    // fetch('https://guarded-shelf-83545.herokuapp.com/tournois')
    //   .then(res => res.json())
    //   .then(tournois => this.setState({ tournois }));
  }

  responseFacebook = (response) => {
    fetch('https://guarded-shelf-83545.herokuapp.com/auth/facebook/token', {
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
              joueur: data.joueur
            })
          }
        });
      });
  }

  render() {
    if (this.state.joueur) {
      return (
        <span className="facebook">{this.state.joueur.pseudo}</span>
      )
    }
    return (
      <div>
        <FacebookLogin
          appId="2593367260889259"
          autoLoad={true}
          fields="name,email,picture"
          onClick={this.onClick}
          callback={this.responseFacebook} />
      </div>
    );
  }
}

export default Login;
