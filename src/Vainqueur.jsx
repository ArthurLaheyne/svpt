import React from 'react';
import Tournoi from './Tournoi';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const mock = require('./mock.json');

const joueurs = [
  { joueur: 'arthur' },
  { joueur: 'dave' },
  { joueur: 'benj' },
];

// Données cumulées
const data = [];
mock.tournois.forEach( (tournoi) => {
  tournoi.resultat.forEach( (resultat) => {
    let joueur = data.find( (joueur) => {
      return joueur.joueur === resultat.joueur;
    });
    if(joueur) {
      console.log('found');
      console.log(joueur); // This is entire object i.e. `item` not boolean
      joueur.buyIn += resultat.buyIn;
      joueur.gainBrut += resultat.gainBrut;
      joueur.gainNet += resultat.gainBrut - resultat.buyIn;
    }
    else {
      data.push({
        joueur: resultat.joueur,
        buyIn: resultat.buyIn,
        gainBrut: resultat.gainBrut,
        gainNet: resultat.gainBrut - resultat.buyIn,
      });
    }
  });
});

// Données calculées
data.forEach( (joueur) => {
  joueur.roi = (100/joueur.buyIn) * joueur.gainNet;
});

const columns = [{
  Header: 'Joueur',
  accessor: 'joueur',
},{
  Header: 'Buy-in',
  accessor: 'buyIn',
},{
  Header: 'Gain brut',
  accessor: 'gainBrut',
},{
  Header: 'Gain net',
  accessor: 'gainNet',
},{
  Header: 'ROI',
  accessor: 'roi',
}];


export default function Vainqueur() {
  return (
    <div>
      <ReactTable
        data={data}
        columns={columns}
        minRows="0"
        showPagination={false}
        defaultSorted={[
          {
            id: "roi",
            desc: true
          }
        ]}
      />
    </div>
  );
}
