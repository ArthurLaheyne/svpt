import { observable, computed, action, decorate } from "mobx";
import axios from 'axios';

export default class Joueur {
    pseudo = null
    gifTokens = 0
    joueur = null

    get pseudoComputed() {
      return this.joueur.pseudo + "-computed";
    }

    addGifToken() {
      if (this.joueur) {
        this.joueur.gifTokens = this.joueur.gifTokens ? this.joueur.gifTokens + 1 : 1;
      }
    }

    setJoueur(joueur) {
      this.joueur = joueur;
    }

    issetJoueur() {
      return this.joueur && this.joueur.facebookId;
    }

    refreshJoueur() {
      let self = this;
      if (this.issetJoueur()) {
        axios.post(process.env.REACT_APP_API_URL + '/user', {
          facebookId: this.joueur.facebookId
        })
        .then(function (response) {
          self.setJoueur(response.data.joueur);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    }
}
// when using decorate, all fields should be specified (a class might have many more non-observable internal fields after all)
decorate(Joueur, {
    joueur: observable,
    pseudoComputed: computed,
    addGifToken: action,
    refreshJoueur: action
})
