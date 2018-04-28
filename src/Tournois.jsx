import React from 'react';
import Tournoi from './Tournoi';

const data = require('./mock.json');

const tournois = data.tournois.slice(0).reverse().map((tournoi, key) => (
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
      {tournois}
    </div>
  );
}
