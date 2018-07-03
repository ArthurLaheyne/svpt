import React, { Component } from 'react';
import AvatarMini from './AvatarMini';
import AvatarCrowned from './AvatarCrowned';

class Tile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tournois: [],
      ready: false
    };
  }

  render() {
    return (
      <div className="tile">
        <div className="gagnant-container">
          <h3 className="title">{this.props.title}</h3>
          <div className="gagnant">
            <AvatarCrowned joueur={this.props.gagnant.pseudo} width="100" height="118" victoires={this.props.gagnant.victoires}/><br />
            <span className="gagnant-pseudo">{this.props.gagnant.pseudo} !</span>
          </div>
          <div className="gagnant-thune">
            <span>{this.props.gagnantThune}€</span>
          </div>
          <div className="deuxieme">
            <AvatarMini joueur={this.props.deuxieme.pseudo} width="30" height="30"/> {this.props.deuxiemeThune}€
          </div>
        </div>
        <div className="autre-joueurs">
        {this.props.autreJoueurs.map((joueur, i) => {
           return (
             <AvatarMini joueur={joueur.pseudo} width="30" height="30" key={"autre-joueur-" + joueur.pseudo}/>
           )
        })}
        </div>
      </div>
    );
  }
}

export default Tile;
