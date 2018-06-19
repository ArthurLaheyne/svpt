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
      const data = [];
      this.state.tournois.forEach( (tournoi) => {
        tournoi.premier = getGagnant(tournoi);
        tournoi.resultat.forEach( (resultat) => {
          resultat.joueur = resultat.joueur.pseudo
          let joueur = data.find( (joueur) => {
            return joueur.joueur === resultat.joueur;
          });
          if(joueur) {
            joueur.buyIn += resultat.buyIn;
            joueur.gainBrut += resultat.gainBrut;
            joueur.gainNet += resultat.gainBrut - resultat.buyIn;
            joueur.nbrJouees += 1;
            if(joueur.joueur === tournoi.premier.pseudo) {
              joueur.nbrGagnees += 1;
            }
          }
          else {
            data.push({
              joueur: resultat.joueur,
              buyIn: resultat.buyIn,
              gainBrut: resultat.gainBrut,
              gainNet: resultat.gainBrut - resultat.buyIn,
              nbrJouees: 1,
              nbrGagnees: (resultat.joueur === tournoi.premier.pseudo) ? 1 : 0,
            });
          }
          if(resultat.joueur === tournoi.premier.pseudo) {
            let joueur2 = data.find( (j) => {
              return j.joueur === resultat.joueur;
            });
            tournoi.premier.victoires = joueur2.nbrGagnees;
          }
        });
      });
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


function getGagnant(tournoi) {
  var joueurs = tournoi.resultat.slice();
  return joueurs[0].joueur;
}

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
  tournoi.resultat.shift();
  tournoi.resultat.shift();
  let autreJoueur = tournoi.resultat.map( row => {
    return row.joueur;
  })
  return autreJoueur;
}
