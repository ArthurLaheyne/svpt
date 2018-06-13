import React, { Component } from 'react';
import Tournoi from './Tournoi';
import loader from './images/Blocks-0.5s-40px.gif';

class Tournois extends Component {

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
    const tournois = this.state.tournois.slice(0).reverse();
    tournois.forEach((tournoi, key) => (
      tournoi.resultat.forEach((joueur, key) => {
        joueur.position = key + 1;
        joueur.joueur = joueur.joueur.pseudo;
      })
    ));
    const content = tournois.map((tournoi, key) => (
      <Tournoi key={key.toString()}
        resultat={tournoi.resultat}
        id={(tournoi.id)}
        date={tournoi.date}
        lieu={tournoi.lieu}
      />
    ));

    return this.state.ready ? (
      <div>
        {content}
      </div>
    ) : (
      <div className="total-center">
        <img src={loader} alt="loading"/>
      </div>
    )
  }
}

export default Tournois;
