import React, { Component } from 'react';
import ReactTable from 'react-table';
import axios from 'axios';
import { observer, inject } from "mobx-react";

import AvatarMini from './AvatarMini';

import 'react-table/react-table.css';
import '../css/profile-card.css';

const ProfilesComponent = inject("store")(observer(class ProfilesComponent extends Component {

  addToken = (pseudo) => {
    let params = {
      quantite: 1,
      pseudo: pseudo
    }
    axios.post(process.env.REACT_APP_API_URL + '/giphynew/addTokens', params).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    });
  }

  render() {
    const columns = [{
      id: 'Joueur',
      Header: 'Joueur',
      accessor: d => d.joueur,
      Cell: row => (
        <div>
          <AvatarMini joueur={row.value} width="30" height="30"/> {row.value}
        </div>
      )
    }, {
      Header: 'Gain brut',
      accessor: 'gainBrut',
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
      id: 'roi',
      Header: 'ROI',
      accessor: joueur => Math.round(joueur.roi),
      sortMethod: inverseSort
    },{
      Header: 'Buy-in',
      accessor: 'buyIn',
      sortMethod: inverseSort
    }];
    if(this.props.store.pseudo === "arthur") {
      columns.push({
        id: 'Tokens',
        Header: 'Tokens',
        accessor: d => d.joueur,
        Cell: row => (
          <div>
            <button onClick={() => this.addToken(row.value)}>+1</button>
          </div>
        )
      });
    }

    const data = [];
    this.props.tournois.forEach( (tournoi) => {
      tournoi.premier = getPremier(tournoi);
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
          if(joueur.joueur === tournoi.premier) {
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
            nbrGagnees: (resultat.joueur === tournoi.premier) ? 1 : 0,
          });
        }
      });
    });

    // Données calculées
    data.forEach( (joueur) => {
        console.log(joueur);
      joueur.roi = (100/joueur.buyIn) * joueur.gainNet;
    });

    return (
      <div>
        {data.slice(0).reverse().map((joueur, i) => {
          console.log(joueur);
          return (
            <div className="profile-card" >
              <div className="left-block">
                <span className="nom-joueur">{ joueur.joueur }</span><br />
                <img src="https://www.province-nord.nc/sites/default/files/logo-facebook.png" alt="" width="100" height="100" /><br />
                <AvatarMini joueur={ joueur.joueur } width="30" height="30"/>
              </div>
              <div className="right-block">
                <ul>
                  <li><i className="fas fa-percent"></i> 55 %</li>
                  <li><i className="fas fa-dollar-sign"></i> 22 €</li>
                  <li><i className="fas fa-users"></i> 28 tournois</li>
                  <li><i className="fas fa-sync-alt"></i> 2 rebuy</li>
                  <li><i className="fas fa-people-carry"></i> 4 finales</li>
                  <li><i className="fas fa-trophy"></i> 2 victoires</li>
                </ul>
                <p>
                  Ce mec est un champion. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus odio purus, cursus eget ligula gravida, consectetur ornare mi. Nam nec elit sed elit euismod tincidunt id ut metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia.
                </p>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

}))

export default ProfilesComponent;


function getPremier(tournoi) {
  var joueurs = tournoi.resultat.slice();
  joueurs.sort( (a,b) => {
    return (a.gainBrut > b.gainBrut) ?
      -1 :
      ((b.gainBrut > a.gainBrut) ?
        1 :
        0)
  });
  return joueurs[0].joueur.pseudo;
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
