import React, { Component } from 'react';

class Home2 extends Component {
  state = {joueurs: []}

  componentDidMount() {
    fetch('https://guarded-shelf-83545.herokuapp.com/users')
      .then(res => res.json())
      .then(joueurs => this.setState({ joueurs }));
  }

  render() {
    return (
      <div className="App">
        <h1>Users</h1>
        {this.state.joueurs.map(joueur =>
          <div key={joueur._id}>{joueur.pseudo}</div>
        )}
      </div>
    );
  }
}

export default Home2;
