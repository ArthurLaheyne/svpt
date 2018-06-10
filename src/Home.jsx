import React from 'react';
import Tournoi from './Tournoi';
import './Home.css';


const data = require('./mock.json');

let total = 0;
const tournois = data.tournois.slice(0);
tournois.forEach((tournoi, key) => (
  tournoi.resultat.forEach((joueur, key) => (
    total += joueur.buyIn
  ))
));
const dernierTournoi = tournois[tournois.length - 1];
const dernierGagnant = dernierTournoi.resultat[0];
const dernierGagnantJoueur = dernierGagnant.joueur;

export default function Tournois() {
  return (
    <div id="home">
      <div className="news n1">
        <div className="content">
          <img src="https://media.giphy.com/media/3oFzmqENRBkRTRfLcA/giphy.gif" />
          <p className="top">
            {total} €
          </p>
          <p>
            Mis en jeu au total
          </p>
        </div>
      </div>
      <div className="news n2">
        <div className="content">
          <p>
            Gagnant de 2017
          </p>
          <img src="https://media.giphy.com/media/F0uvYzyr2a7Li/giphy.gif" />
          <p className="top">
            Ben
          </p>
        </div>
      </div>
      <div className="news n3">
        <div className="content">
          <p>
            Dernier gagnant
          </p>
          <img src="https://media.giphy.com/media/26ufdkXNlsT1RAEHC/giphy.gif" />
          <p className="top">
            {dernierGagnantJoueur}
          </p>
        </div>
      </div>
      <div className="news n4">
        <div className="content">
          <img src="https://media.giphy.com/media/99S1Zo5Z0gByg/giphy.gif" />
          <p className="top">
            0
          </p>
          <p>
            Absences de Math consécutives
          </p>
        </div>
      </div>
    </div>
  );
}
