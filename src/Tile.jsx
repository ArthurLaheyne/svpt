import React, { Component } from 'react';
import Avatar from './Avatar';
import AvatarMini from './AvatarMini';

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
            <Avatar joueur={this.props.gagnant} width="100" height="100"/><br />
            <span className="gagnant-pseudo">{this.props.gagnant} !</span>
          </div>
          <div className="gagnant-thune">
            <span>{this.props.gagnantThune}€</span>
          </div>
          <div className="deuxieme">
            <AvatarMini joueur={this.props.deuxieme} width="30" height="30"/> {this.props.deuxiemeThune}€
          </div>
        </div>
        <div className="autre-joueurs">
        {this.props.autreJoueurs.map((joueur, i) => {
           return (
             <AvatarMini joueur={joueur} width="30" height="30" key={"autre-joueur-" + joueur}/>
           )
        })}
        </div>
      </div>
    );
  }
}

export default Tile;
