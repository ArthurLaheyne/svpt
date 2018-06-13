import React, { Component } from 'react';
import Tournoi from './Tournoi';

class Home2 extends Component {
  state = {tournois: []}

  componentDidMount() {
    fetch('https://guarded-shelf-83545.herokuapp.com/tournois')
      .then(res => res.json())
      .then(tournois => this.setState({ tournois }));
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

    return (
      <div className="App">
        <div>
          {content}
        </div>
      </div>
    );
  }
}

export default Home2;
