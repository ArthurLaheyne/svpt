import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import AvatarMini from './AvatarMini';
import { inject } from "mobx-react";

const Login = inject("store")(class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      connecting: false,
      failed: false,
      showMenu: false
    };
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
        if (!res.ok) {
        } else {
          res.json().then((data) => {
            if (data.joueur) {
              this.setState({
                joueur: data.joueur,
                connecting: false
              })
              sessionStorage.setItem('joueur', data.joueur.pseudo);
              sessionStorage.setItem('facebookId', data.joueur.facebookId);
              sessionStorage.setItem('gifTokens', data.joueur.gifTokens);
              this.props.store.setGifToken(data.joueur.gifTokens);
              this.props.store.setPseudo(data.joueur.pseudo);
              this.props.store.setFacebookId(data.joueur.facebookId);
            }
          });
        }
        this.setState({
          connecting: false
        })
      });
  }

  logout = () => {
    this.props.store.setJoueur(null);
  }

  login = () => {
    // this.setState({
    //   connecting: true
    // })
    // fetch(process.env.REACT_APP_API_URL + '/users')
    //   .then(res => res.json())
    //   .then(data => {
    //     const joueurData = data.data[7];
    //     this.setState({
    //       joueur: joueurData,
    //       connecting: false
    //     })
    //     // sessionStorage.setItem('joueur', joueurData.pseudo);
    //     this.props.store.setJoueur({
    //       pseudo: "arthur",
    //       facebookId: "10216858591964151",
    //       gifTokens: 3
    //     });
    //   });
    // console.log('fonction à supprimer');
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
    if (this.props.store.joueur) {
      return (
        <div className="facebook" onClick={this.toggleMenu}>
          <AvatarMini joueur={this.props.store.joueur.pseudo} width="30" height="30"/> <span >{this.props.store.joueur.pseudo} </span>
          <div id="account-menu" style={{ display: this.state.showMenu ? "block" : "none"}}>
            <ul>
              <li onClick={this.logout}>Déconnexion</li>
              {/* <li><Link to="/admin">Admin</Link></li> */}
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
})

export default Login;
