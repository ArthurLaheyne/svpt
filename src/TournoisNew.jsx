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
    fetch(process.env.REACT_APP_API_URL + '/tournois')
      .then(res => res.json())
      .then(data => {
        this.setState({
          tournois : data.data,
          ready: true
        });
      });
  }

  render() {
    if (!this.state.ready) {
      return (
        <div className="total-center">
          <img src={loader} alt="loading"/>
        </div>
      );
    } else {
      return (
        <div className="grid">
        {this.state.tournois.slice(0).reverse().map((tournoi, i) => {
          return (
            <Tile
              title={tournoi.id}
              gagnant={tournoi.premier}
              gagnantThune={getGagnantThune(tournoi)}
              deuxieme={getDeuxieme(tournoi)}
              deuxiemeThune={getDeuxiemeThune(tournoi)}
              autreJoueurs={getAutreJoueurs(tournoi)}
              key={"tournoi-" + i}
            />
          )
        })}
        </div>
      )
    }
  }
}

export default TournoisNew;


function getGagnantThune(tournoi) {
  var joueurs = tournoi.resultat.slice();
  return joueurs[0].gainBrut;
}

function getDeuxieme(tournoi) {
  var joueurs = tournoi.resultat.slice();
  return joueurs[1].joueur;
}

function getDeuxiemeThune(tournoi) {
  var joueurs = tournoi.resultat.slice();
  return joueurs[1].gainBrut;
}

function getAutreJoueurs(tournoi) {
  let autreJoueur = tournoi.resultat.map( row => {
    return row.joueur;
  })
  autreJoueur.shift();
  autreJoueur.shift();
  return autreJoueur;
}
