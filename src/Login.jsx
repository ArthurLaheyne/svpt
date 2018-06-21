import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import AvatarMini from './AvatarMini';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      joueur: null,
      connecting: false,
      failed: false,
      showMenu: false,
    };
  }

  componentDidMount() {
    // this.setState({
    //   connecting: true
    // });
  }

  responseFacebook = (response) => {
    console.log('test');
    fetch(process.env.REACT_APP_API_URL + '/auth/facebook/token', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({access_token: response.accessToken})
    })
      .then(res => {
        if (!res.ok) {
        } else {
          res.json().then((data) => {
            if (data.joueur) {
              this.setState({
                joueur: data.joueur,
                connecting: false
              })
            }
          });
        }
        this.setState({
          connecting: false
        })
      });
  }

  logout = () => {
    console.log('deco');
    this.setState({
      joueur: null
    })
  }

  login = () => {
    this.setState({
      connecting: true
    })
  }

  failed = () => {
    this.setState({
      connecting: false,
      failed: true
    })
  }

  toggleMenu = () => {
    console.log('bonjour');
    this.setState(prevState => ({
      showMenu: !prevState.showMenu
    }))
  }

  render() {
    if (this.state.joueur) {
      return (
        <div className="facebook" onClick={this.toggleMenu}>
          <AvatarMini joueur={this.state.joueur.pseudo} width="30" height="30"/> <span >{this.state.joueur.pseudo} </span>
          <div id="account-menu" style={{ display: this.state.showMenu ? "block" : "none"}}>
            <ul>
              <li onClick={this.logout}>Déconnexion</li>
            </ul>
          </div>
        </div>
      )
    } else if (this.state.connecting) {
      return (
        <div className="facebook">
          <span>connecting...</span>
        </div>
      )
    }
    return (
      <div>
        <FacebookLogin
          appId="2593367260889259"
          autoLoad={true}
          onFailure={this.failed}
          fields="name,email,picture"
          textButton={"Log FB" + (this.state.failed ? "(f)" : "")}
          onClick={this.login}
          callback={this.responseFacebook}
        />
      </div>
    );
  }
}

export default Login;
