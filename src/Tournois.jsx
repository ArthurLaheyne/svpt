import React from 'react';
import Tournoi from './Tournoi';

const data = require('./mock.json');

const tournois = data.tournois.slice(0).reverse();
tournois.forEach((tournoi, key) => (
  tournoi.resultat.forEach((joueur, key) => (
    joueur.position = key + 1
  ))
));
const content = tournois.map((tournoi, key) => (
  <Tournoi key={key.toString()}
    resultat={tournoi.resultat}
    id={(tournoi.id)}
    date={tournoi.date}
    lieu={tournoi.lieu}
  />
));


export default function Tournois() {
  return (
    <div>
      {content}
    </div>
  );
}
