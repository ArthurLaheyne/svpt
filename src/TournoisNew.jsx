import React, { Component } from 'react';
import Tile from './Tile';
import './grid-tournoi.css';
import loader from './images/Blocks-0.5s-40px.gif';

class TournoisNew extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tournois: [],
      ready: false
    };
  }

  componentDidMount() {
    fetch('https://guarded-shelf-83545.herokuapp.com/tournois')
      .then(res => res.json())
      .then(tournois => this.setState({
        tournois : tournois,
        ready: true
      }));
  }

  render() {
    return this.state.ready ? (
      <div className="grid">
      {this.state.tournois.slice(0).reverse().map((tournoi, i) => {
        return (
          <Tile
            title={tournoi.id}
            gagnant={getGagnant(tournoi)}
            gagnantThune={getGagnantThune(tournoi)}
            deuxieme={getDeuxieme(tournoi)}
            deuxiemeThune={getDeuxiemeThune(tournoi)}
            autreJoueurs={getAutreJoueurs(tournoi)}
            key={"tournoi-" + i}
          />
        )
      })}
      </div>
    ) : (
      <div className="total-center">
        <img src={loader} alt="loading"/>
      </div>
    )
  }
}

export default TournoisNew;


function getGagnant(tournoi) {
  var joueurs = tournoi.resultat.slice();
  return joueurs[0].joueur.pseudo;
}

function getGagnantThune(tournoi) {
  var joueurs = tournoi.resultat.slice();
  return joueurs[0].gainBrut;
}

function getDeuxieme(tournoi) {
  var joueurs = tournoi.resultat.slice();
  return joueurs[1].joueur.pseudo;
}

function getDeuxiemeThune(tournoi) {
  var joueurs = tournoi.resultat.slice();
  return joueurs[1].gainBrut;
}

function getAutreJoueurs(tournoi) {
  tournoi.resultat.shift();
  tournoi.resultat.shift();
  let autreJoueur = tournoi.resultat.map( row => {
    return row.joueur.pseudo;
  })
  return autreJoueur;
}
