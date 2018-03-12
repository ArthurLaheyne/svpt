import React from 'react';
import Tournoi from './Tournoi';

const data = require('./mock.json');

const tournois = data.tournois.map((tournoi, key) => (
  <Tournoi key={key.toString()}
    resultat={tournoi.resultat}
    numero={key.toString()}
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
