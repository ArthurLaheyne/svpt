import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './vainqueur.css';
import Avatar from './Avatar';
import AvatarMini from './AvatarMini';

const mock = require('./mock.json');

// Données cumulées
const data = [];
mock.tournois.forEach( (tournoi) => {
  tournoi.premier = getPremier(tournoi);
  tournoi.resultat.forEach( (resultat) => {
    let joueur = data.find( (joueur) => {
      return joueur.joueur === resultat.joueur;
    });
    if(joueur) {
      joueur.buyIn += resultat.buyIn;
      joueur.gainBrut += resultat.gainBrut;
      joueur.gainNet += resultat.gainBrut - resultat.buyIn;
      joueur.nbrJouees += 1;
      if(joueur.joueur === tournoi.premier.joueur) {
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
        nbrGagnees: (resultat.joueur === tournoi.premier.joueur) ? 1 : 0,
      });
    }
  });
});

// Données calculées
data.forEach( (joueur) => {
  joueur.roi = (100/joueur.buyIn) * joueur.gainNet;
});


export default class Vainqueur extends Component {

  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.state = {
      showWinner: false,
    };
  }

  handleLoginClick() {
    this.setState({showWinner: true});
  }

  render() {
    const vainqueur = getPremierROI(data);
    const button = (
      <div className="button-container">
        <button className="btn btn-light" onClick={this.handleLoginClick} >Afficher vainqueur</button>
      </div>
    );
    const winnerIs = (
      <div>
        <div className="winner-is-container">
          <h1>
            <Avatar joueur={vainqueur.joueur} width="100" height="100"/><br />
            { vainqueur.joueur }
          </h1>
          <ReactTable
            data={data}
            columns={columns}
            resizable={false}
            minRows="0"
            showPagination={false}
            defaultSorted={[
              {
                id: "gainNet"
              }
            ]}
          />
        </div>
      </div>
    );
    // return this.state.showWinner ? winnerIs : button;
    return winnerIs;
  }

}

const columns = [{
  Header: 'Joueur',
  accessor: 'joueur',
  Cell: row => (
    <div>
      <AvatarMini joueur={row.value} width="30" height="30"/> {row.value}
    </div>
  )
}, {
  id: 'roi',
  Header: 'ROI',
  accessor: joueur => Math.round(joueur.roi),
  sortMethod: inverseSort
},{
  Header: 'Gain net',
  accessor: 'gainNet',
  sortMethod: inverseSort
},{
  Header: 'Victoires',
  accessor: 'nbrGagnees',
  sortMethod: inverseSort
},{
  Header: 'Tournois',
  accessor: 'nbrJouees',
  sortMethod: inverseSort
},{
  Header: 'Gain brut',
  accessor: 'gainBrut',
  sortMethod: inverseSort
},{
  Header: 'Buy-in',
  accessor: 'buyIn',
  sortMethod: inverseSort
}];


function getPremier(tournoi) {
  var joueurs = tournoi.resultat.slice();
  joueurs.sort( (a,b) => {
    return (a.gainBrut > b.gainBrut) ?
      -1 :
      ((b.gainBrut > a.gainBrut) ?
        1 :
        0)
  });
  return joueurs[0];
}


function getPremierROI(joueurs) {
  var joueurs2 = joueurs.slice();
  joueurs2.sort( (a,b) => {
    return (a.roi > b.roi) ?
      -1 :
      ((b.roi > a.roi) ?
        1 :
        0)
  });
  return joueurs2[0];
}


function inverseSort(a, b, desc) {
  // force null and undefined to the bottom
  a = a === null || a === undefined ? -Infinity : a;
  b = b === null || b === undefined ? -Infinity : b;
  // force any string values to lowercase
  a = typeof a === "string" ? a.toLowerCase() : a;
  b = typeof b === "string" ? b.toLowerCase() : b;
  // Return either 1 or -1 to indicate a sort priority
  if (a < b) {
    return 1;
  }
  if (a > b) {
    return -1;
  }
  // returning 0 or undefined will use any subsequent column sorting methods or the row index as a tiebreaker
  return 0;
}
