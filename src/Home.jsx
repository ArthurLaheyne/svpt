import React, { Component } from 'react';
import './Home.css';
import loader from './images/Blocks-0.5s-40px.gif';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      tournois: [],
      ready: false
    };
  }

  componentDidMount() {
    fetch('https://guarded-shelf-83545.herokuapp.com/tournois')
      .then(res => res.json())
      .then(res => {
        this.setState({
          user: res.user,
          tournois: res.data,
          ready: true
        })
      });
  }

  render() {
    if (!this.state.ready) {
      return (
        <div className="total-center">
          <img src={loader} alt="loading"/>
        </div>
      )
    } else {
      let total = 0;
      const tournois = this.state.tournois.slice(0);
      tournois.forEach((tournoi, key) => (
        tournoi.resultat.forEach((joueur, key) => (
          total += joueur.buyIn
        ))
      ));
      const dernierTournoi = tournois[tournois.length - 1];
      const dernierGagnant = dernierTournoi.resultat[0];
      const dernierGagnantJoueur = dernierGagnant.joueur.pseudo;

      return (
        <div id="home">
          <div className="news n3">
            <div className="content">
              <p>
                Dernier gagnant
              </p>
              <img src="https://media.giphy.com/media/5USTijryafZEQ/giphy.gif" alt="gif"/>
              <p className="top">
                {dernierGagnantJoueur}
              </p>
            </div>
          </div>
          <div className="news n2">
            <div className="content">
              <p>
                Gagnant de 2017
              </p>
              <img src="https://media.giphy.com/media/F0uvYzyr2a7Li/giphy.gif" alt="gif"/>
              <p className="top">
                Ben
              </p>
            </div>
          </div>
          <div className="news n4">
            <div className="content">
              <img src="https://media.giphy.com/media/99S1Zo5Z0gByg/giphy.gif" alt="gif"/>
              <p>
                <span className="top">19</span><br />
                Absences d'Adrien consécutives
              </p>
            </div>
          </div>
          <div className="news n1">
            <div className="content">
              <img src="https://media.giphy.com/media/3oFzmqENRBkRTRfLcA/giphy.gif" alt="gif"/>
              <p className="top">
                {total} €
              </p>
              <p>
                Mis en jeu au total
              </p>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Home;
