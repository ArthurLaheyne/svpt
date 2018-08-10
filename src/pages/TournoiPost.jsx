import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import { observer, inject } from "mobx-react";

const TournoiPost = inject("store")(observer(class TournoiPost extends Component {

  constructor(props) {
    super(props);
    this.state = {
      joueurs: [],
      lieu: "",
      date: (new Date()).toLocaleDateString("fr-FR", { year: 'numeric', month: 'long', day: 'numeric' }),
      id: "SVPT #100",
      resultats: [{}, {}, {}],
      sendingStatus: null,
      redirect: false,
      error: null
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_API_URL + '/users')
      .then(res => res.json())
      .then(data => {
        const joueurs = [];
        data.data.forEach((joueur) => {
          joueurs.push({
            pseudo: joueur.pseudo,
            id: joueur._id,
            in: false
          });
        });
        this.setState({
          joueurs : joueurs
        });
      });
  }

  sendTournoi = (event) => {
    event.preventDefault();
    this.setState({
      sendingStatus: "loading",
      error: null
    })
    let params = {tournoi: {
      lieu: this.state.lieu,
      date: this.state.date,
      id: this.state.id,
      resultat: this.state.resultats
    }}
    console.log(
      params
    );

    // do something with form values, and then
    axios.post(process.env.REACT_APP_API_URL + '/tournoi', params).then(response => {
      console.log(response);
      console.log(params);
      setTimeout(() => {
        this.setState({
          sendingStatus: "success"
        });
        setTimeout(() => {
          this.setState({
            redirect: true
          });
        }, 500);
      }, 500);
      // do something with response, and on response
    }).catch(error => {
      console.log(error);
      setTimeout(() => {
        this.setState({
          sendingStatus: "failed",
          error: JSON.stringify(error, Object.getOwnPropertyNames(error))
        });
      }, 500);
      // do something when request was unsuccessful
    });
  }

  handleResultatChange = (idx) => (evt) => {
    const newResultats = this.state.resultats.map((resultat, sidx) => {
      if (idx !== sidx) return resultat;
      return { ...resultat, [evt.target.name]: evt.target.value };
    });
    this.setState({ resultats: newResultats });
  }

  handleAddJoueur = (idx) => {
    let joueurIdx = {};
    this.state.joueurs.map((joueur, sidx) => {
      if (idx == sidx) joueurIdx = joueur;
    });
    const newJoueurs = this.state.joueurs.map((joueur, sidx) => {
      if (idx !== sidx) return joueur;
      return { ...joueur, in: true };
    });
    this.setState({
      resultats: this.state.resultats.concat([{joueur: joueurIdx.id}]),
      joueurs: newJoueurs
    });
  }

  handleRemoveJoueur = (idx) => () => {
    this.setState({
      resultats: this.state.resultats.filter((s, sidx) => idx !== sidx)
    });
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    console.log(this.state.resultats, this.state.joueurs);
    return (
      <div id="post-tournoi">
        <form className="gif-new-form"
          method="post"
          onSubmit={this.sendTournoi}
        >
          <label>Lieu : <input type="text" name="lieu" style={{color: "black"}} value={ this.state.lieu } onChange={this.handleInputChange} /></label>
          <label>Date : <input type="text" name="date" style={{color: "black"}} value={ this.state.date } onChange={this.handleInputChange} /></label>
          <label>Id : <input type="text" name="id" style={{color: "black"}} value={ this.state.id } onChange={this.handleInputChange} /></label>
          <h4>Résultats</h4>
          {this.state.resultats.map((resultat, idx) => (
            <div className="resultat">
              <input
                type="text"
                name="joueur"
                placeholder={`Joueur #${idx + 1}`}
                value={resultat.joueur}
                onChange={this.handleResultatChange(idx)}
                style={{color: "black"}}
              />
              <input
                type="text"
                name="buyIn"
                placeholder={`Joueur #${idx + 1}`}
                value={resultat.buyIn}
                onChange={this.handleResultatChange(idx)}
                style={{color: "black"}}
              />
              <input
                type="text"
                name="gainBrut"
                placeholder={`Joueur #${idx + 1}`}
                value={resultat.gainBrut}
                onChange={this.handleResultatChange(idx)}
                style={{color: "black"}}
              />
              <button type="button" onClick={this.handleRemoveJoueur(idx)} className="small">-</button>
            </div>
          ))}
          {this.state.joueurs.map((joueur, idx) => (
            <button type="button" onClick={() => { this.handleAddJoueur(idx) }}>{ joueur.pseudo }</button>
          ))}
          <input type="submit" value="Envoyer" />
        </form>
      </div>
    );
  }

}))

export default TournoiPost;
