import { observable, computed, action, decorate } from "mobx";

export default class Joueur {
    pseudo = "John"
    gifTokens = 0

    get pseudoComputed() {
        return this.pseudo + "-computed";
    }

    addGifToken() {
        this.gifTokens++;
    }

    setGifToken(gifTokens) {
        this.gifTokens = gifTokens;
    }

    setPseudo(pseudo) {
        this.pseudo = pseudo;
    }

    setFacebookId(facebookId) {
        this.facebookId = facebookId;
    }
}
// when using decorate, all fields should be specified (a class might have many more non-observable internal fields after all)
decorate(Joueur, {
    pseudo: observable,
    gifTokens: observable,
    pseudoComputed: computed,
    addGifToken: action
})
