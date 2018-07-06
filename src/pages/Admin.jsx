import React, { Component } from 'react';

class Admin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      tournois: [],
      giphynews: [],
      ready: false
    };
  }

  componentDidMount() {
    // fetch(process.env.REACT_APP_API_URL + '/tournois')
    //   .then(res => res.json())
    //   .then(res => {
    //     this.setState({
    //       user: res.user,
    //       tournois: res.data,
    //       ready: true
    //     })
    //   });
    // fetch(process.env.REACT_APP_API_URL + '/giphynews')
    //   .then(res => res.json())
    //   .then(res => {
    //     this.setState({
    //       giphynews: res.data
    //     })
    //   });
  }

  render() {
    // if (!this.state.ready) {
    //   return (
    //     <div className="total-center">
    //       <img src={loader} alt="loading"/>
    //     </div>
    //   )
    // } else {
    //   let total = 0;
    //   const tournois = this.state.tournois.slice(0);
    //   tournois.forEach((tournoi, key) => (
    //     tournoi.resultat.forEach((joueur, key) => (
    //       total += joueur.buyIn
    //     ))
    //   ));
    //   const dernierTournoi = tournois[tournois.length - 1];
    //   const dernierGagnant = dernierTournoi.resultat[0];
    //   const dernierGagnantJoueur = dernierGagnant.joueur.pseudo;
    //   let giphynews = [];
    //   this.state.giphynews.slice(0).reverse().forEach((giphynew, key) => {
    //     giphynews.push(
    //       <div key={key}>
    //         <GifNew
    //           backgroundColor={giphynew.backgroundColor}
    //           gifUrl={giphynew.gifUrl}
    //           text={giphynew.text}
    //           color={giphynew.color}
    //         />
    //       </div>
    //     )
    //   });

    return (
      <div>
        <p>pouet</p>
      </div>
    );
    // }
  }
}

export default Admin;
