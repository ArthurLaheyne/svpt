import React, { Component } from 'react';
import { observer, inject } from "mobx-react";

import GiphyNew from '../components/GiphyNew';

import './Home.css';
import loader from '../images/Blocks-0.5s-40px.gif';

const Home = inject("store")(observer(class Home extends Component {

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
    this.props.store.refreshJoueur();
    fetch(process.env.REACT_APP_API_URL + '/tournois')
      .then(res => res.json())
      .then(res => {
        this.setState({
          user: res.user,
          tournois: res.data,
          ready: true
        })
      });
    fetch(process.env.REACT_APP_API_URL + '/giphynews')
      .then(res => res.json())
      .then(res => {
        this.setState({
          giphynews: res.data
        })
      });
  }

  render() {
    if (!this.state.ready) {
      return (
        <div className="total-center">
          <img src={loader} alt="loading"/>
        </div>
      )
    } else {
      let total = 0;
      const tournois = this.state.tournois.slice(0);
      tournois.forEach((tournoi, key) => (
        tournoi.resultat.forEach((joueur, key) => (
          total += joueur.buyIn
        ))
      ));
      const dernierTournoi = tournois[tournois.length - 1];
      const dernierGagnant = dernierTournoi.resultat[0];
      const dernierGagnantJoueur = dernierGagnant.joueur.pseudo;
      let giphynews = [];
      this.state.giphynews.slice(0).reverse().forEach((giphynew, key) => {
        giphynews.push(
          <div key={key}>
            <GiphyNew
              backgroundColor={giphynew.backgroundColor}
              gifUrl={giphynew.gifUrl}
              text={giphynew.text}
              color={giphynew.color}
            />
          </div>
        )
      });

      return (
        <div id="home">
          <div className="news n3">
            <div className="content">
              <p>
                Dernier gagnant
              </p>
              <img src="https://i.giphy.com/media/tQcjerc5JJGxi/giphy.webp" alt="gif"/>
              <p className="top">
                {dernierGagnantJoueur}
              </p>
            </div>
          </div>
          {giphynews}
          <div className="news n2">
            <div className="content">
              <p>
                Gagnant de 2017
              </p>
              <img src="https://media.giphy.com/media/F0uvYzyr2a7Li/giphy.gif" alt="gif"/>
              <p className="top">
                Ben
              </p>
            </div>
          </div>
          <div className="news n4">
            <div className="content">
              <img src="https://media.giphy.com/media/99S1Zo5Z0gByg/giphy.gif" alt="gif"/>
              <p>
                <span className="top">21</span><br />
                Absences d'Adrien consécutives
              </p>
            </div>
          </div>
          <div className="news n1">
            <div className="content">
              <img src="https://media.giphy.com/media/3oFzmqENRBkRTRfLcA/giphy.gif" alt="gif"/>
              <p className="top">
                {total} €
              </p>
              <p>
                Mis en jeu au total
              </p>
            </div>
          </div>
            <div className="news n3">
              <div className="content">
                <p>
                  Dernier gagnant
                </p>
                <img src="https://media.giphy.com/media/aCKMaeduKfFXG/giphy.gif" alt="gif"/>
                <p className="top">
                  {dernierGagnantJoueur}
                </p>
              </div>
            </div>
            <div className="news n2">
              <div className="content">
                <p>
                  Gagnant de 2017
                </p>
                <img src="https://media.giphy.com/media/F0uvYzyr2a7Li/giphy.gif" alt="gif"/>
                <p className="top">
                  Ben
                </p>
              </div>
            </div>
            <div className="news n4">
              <div className="content">
                <img src="https://media.giphy.com/media/99S1Zo5Z0gByg/giphy.gif" alt="gif"/>
                <p>
                  <span className="top">19</span><br />
                  Absences d'Adrien consécutives
                </p>
              </div>
            </div>
            <div className="news n1">
              <div className="content">
                <img src="https://media.giphy.com/media/3oFzmqENRBkRTRfLcA/giphy.gif" alt="gif"/>
                <p className="top">
                  {total} €
                </p>
                <p>
                  Mis en jeu au total
                </p>
              </div>
            </div>
              <div className="news n3">
                <div className="content">
                  <p>
                    Dernier gagnant
                  </p>
                  <img src="https://media.giphy.com/media/aCKMaeduKfFXG/giphy.gif" alt="gif"/>
                  <p className="top">
                    {dernierGagnantJoueur}
                  </p>
                </div>
              </div>
              <div className="news n2">
                <div className="content">
                  <p>
                    Gagnant de 2017
                  </p>
                  <img src="https://media.giphy.com/media/F0uvYzyr2a7Li/giphy.gif" alt="gif"/>
                  <p className="top">
                    Ben
                  </p>
                </div>
              </div>
              <div className="news n4">
                <div className="content">
                  <img src="https://media.giphy.com/media/99S1Zo5Z0gByg/giphy.gif" alt="gif"/>
                  <p>
                    <span className="top">19</span><br />
                    Absences d'Adrien consécutives
                  </p>
                </div>
              </div>
              <div className="news n1">
                <div className="content">
                  <img src="https://media.giphy.com/media/3oFzmqENRBkRTRfLcA/giphy.gif" alt="gif"/>
                  <p className="top">
                    {total} €
                  </p>
                  <p>
                    Mis en jeu au total
                  </p>
                </div>
              </div>
                <div className="news n3">
                  <div className="content">
                    <p>
                      Dernier gagnant
                    </p>
                    <img src="https://media.giphy.com/media/aCKMaeduKfFXG/giphy.gif" alt="gif"/>
                    <p className="top">
                      {dernierGagnantJoueur}
                    </p>
                  </div>
                </div>
                <div className="news n2">
                  <div className="content">
                    <p>
                      Gagnant de 2017
                    </p>
                    <img src="https://media.giphy.com/media/F0uvYzyr2a7Li/giphy.gif" alt="gif"/>
                    <p className="top">
                      Ben
                    </p>
                  </div>
                </div>
                <div className="news n4">
                  <div className="content">
                    <img src="https://media.giphy.com/media/99S1Zo5Z0gByg/giphy.gif" alt="gif"/>
                    <p>
                      <span className="top">19</span><br />
                      Absences d'Adrien consécutives
                    </p>
                  </div>
                </div>
                <div className="news n1">
                  <div className="content">
                    <img src="https://media.giphy.com/media/3oFzmqENRBkRTRfLcA/giphy.gif" alt="gif"/>
                    <p className="top">
                      {total} €
                    </p>
                    <p>
                      Mis en jeu au total
                    </p>
                  </div>
                </div>
                  <div className="news n3">
                    <div className="content">
                      <p>
                        Dernier gagnant
                      </p>
                      <img src="https://media.giphy.com/media/aCKMaeduKfFXG/giphy.gif" alt="gif"/>
                      <p className="top">
                        {dernierGagnantJoueur}
                      </p>
                    </div>
                  </div>
                  <div className="news n2">
                    <div className="content">
                      <p>
                        Gagnant de 2017
                      </p>
                      <img src="https://media.giphy.com/media/F0uvYzyr2a7Li/giphy.gif" alt="gif"/>
                      <p className="top">
                        Ben
                      </p>
                    </div>
                  </div>
                  <div className="news n4">
                    <div className="content">
                      <img src="https://media.giphy.com/media/99S1Zo5Z0gByg/giphy.gif" alt="gif"/>
                      <p>
                        <span className="top">19</span><br />
                        Absences d'Adrien consécutives
                      </p>
                    </div>
                  </div>
                  <div className="news n1">
                    <div className="content">
                      <img src="https://media.giphy.com/media/3oFzmqENRBkRTRfLcA/giphy.gif" alt="gif"/>
                      <p className="top">
                        {total} €
                      </p>
                      <p>
                        Mis en jeu au total
                      </p>
                    </div>
                  </div>
                    <div className="news n3">
                      <div className="content">
                        <p>
                          Dernier gagnant
                        </p>
                        <img src="https://media.giphy.com/media/aCKMaeduKfFXG/giphy.gif" alt="gif"/>
                        <p className="top">
                          {dernierGagnantJoueur}
                        </p>
                      </div>
                    </div>
                    <div className="news n2">
                      <div className="content">
                        <p>
                          Gagnant de 2017
                        </p>
                        <img src="https://media.giphy.com/media/F0uvYzyr2a7Li/giphy.gif" alt="gif"/>
                        <p className="top">
                          Ben
                        </p>
                      </div>
                    </div>
                    <div className="news n4">
                      <div className="content">
                        <img src="https://media.giphy.com/media/99S1Zo5Z0gByg/giphy.gif" alt="gif"/>
                        <p>
                          <span className="top">19</span><br />
                          Absences d'Adrien consécutives
                        </p>
                      </div>
                    </div>
                    <div className="news n1">
                      <div className="content">
                        <img src="https://media.giphy.com/media/3oFzmqENRBkRTRfLcA/giphy.gif" alt="gif"/>
                        <p className="top">
                          {total} €
                        </p>
                        <p>
                          Mis en jeu au total
                        </p>
                      </div>
                    </div>
                      <div className="news n3">
                        <div className="content">
                          <p>
                            Dernier gagnant
                          </p>
                          <img src="https://media.giphy.com/media/aCKMaeduKfFXG/giphy.gif" alt="gif"/>
                          <p className="top">
                            {dernierGagnantJoueur}
                          </p>
                        </div>
                      </div>
                      <div className="news n2">
                        <div className="content">
                          <p>
                            Gagnant de 2017
                          </p>
                          <img src="https://media.giphy.com/media/F0uvYzyr2a7Li/giphy.gif" alt="gif"/>
                          <p className="top">
                            Ben
                          </p>
                        </div>
                      </div>
                      <div className="news n4">
                        <div className="content">
                          <img src="https://media.giphy.com/media/99S1Zo5Z0gByg/giphy.gif" alt="gif"/>
                          <p>
                            <span className="top">19</span><br />
                            Absences d'Adrien consécutives
                          </p>
                        </div>
                      </div>
                      <div className="news n1">
                        <div className="content">
                          <img src="https://media.giphy.com/media/3oFzmqENRBkRTRfLcA/giphy.gif" alt="gif"/>
                          <p className="top">
                            {total} €
                          </p>
                          <p>
                            Mis en jeu au total
                          </p>
                        </div>
                      </div>
                        <div className="news n3">
                          <div className="content">
                            <p>
                              Dernier gagnant
                            </p>
                            <img src="https://media.giphy.com/media/aCKMaeduKfFXG/giphy.gif" alt="gif"/>
                            <p className="top">
                              {dernierGagnantJoueur}
                            </p>
                          </div>
                        </div>
                        <div className="news n2">
                          <div className="content">
                            <p>
                              Gagnant de 2017
                            </p>
                            <img src="https://media.giphy.com/media/F0uvYzyr2a7Li/giphy.gif" alt="gif"/>
                            <p className="top">
                              Ben
                            </p>
                          </div>
                        </div>
                        <div className="news n4">
                          <div className="content">
                            <img src="https://media.giphy.com/media/99S1Zo5Z0gByg/giphy.gif" alt="gif"/>
                            <p>
                              <span className="top">19</span><br />
                              Absences d'Adrien consécutives
                            </p>
                          </div>
                        </div>
                        <div className="news n1">
                          <div className="content">
                            <img src="https://media.giphy.com/media/3oFzmqENRBkRTRfLcA/giphy.gif" alt="gif"/>
                            <p className="top">
                              {total} €
                            </p>
                            <p>
                              Mis en jeu au total
                            </p>
                          </div>
                        </div>
                          <div className="news n3">
                            <div className="content">
                              <p>
                                Dernier gagnant
                              </p>
                              <img src="https://media.giphy.com/media/aCKMaeduKfFXG/giphy.gif" alt="gif"/>
                              <p className="top">
                                {dernierGagnantJoueur}
                              </p>
                            </div>
                          </div>
                          <div className="news n2">
                            <div className="content">
                              <p>
                                Gagnant de 2017
                              </p>
                              <img src="https://media.giphy.com/media/F0uvYzyr2a7Li/giphy.gif" alt="gif"/>
                              <p className="top">
                                Ben
                              </p>
                            </div>
                          </div>
                          <div className="news n4">
                            <div className="content">
                              <img src="https://media.giphy.com/media/99S1Zo5Z0gByg/giphy.gif" alt="gif"/>
                              <p>
                                <span className="top">19</span><br />
                                Absences d'Adrien consécutives
                              </p>
                            </div>
                          </div>
                          <div className="news n1">
                            <div className="content">
                              <img src="https://media.giphy.com/media/3oFzmqENRBkRTRfLcA/giphy.gif" alt="gif"/>
                              <p className="top">
                                {total} €
                              </p>
                              <p>
                                Mis en jeu au total
                              </p>
                            </div>
                          </div>
                            <div className="news n3">
                              <div className="content">
                                <p>
                                  Dernier gagnant
                                </p>
                                <img src="https://media.giphy.com/media/aCKMaeduKfFXG/giphy.gif" alt="gif"/>
                                <p className="top">
                                  {dernierGagnantJoueur}
                                </p>
                              </div>
                            </div>
                            <div className="news n2">
                              <div className="content">
                                <p>
                                  Gagnant de 2017
                                </p>
                                <img src="https://media.giphy.com/media/F0uvYzyr2a7Li/giphy.gif" alt="gif"/>
                                <p className="top">
                                  Ben
                                </p>
                              </div>
                            </div>
                            <div className="news n4">
                              <div className="content">
                                <img src="https://media.giphy.com/media/99S1Zo5Z0gByg/giphy.gif" alt="gif"/>
                                <p>
                                  <span className="top">19</span><br />
                                  Absences d'Adrien consécutives
                                </p>
                              </div>
                            </div>
                            <div className="news n1">
                              <div className="content">
                                <img src="https://media.giphy.com/media/3oFzmqENRBkRTRfLcA/giphy.gif" alt="gif"/>
                                <p className="top">
                                  {total} €
                                </p>
                                <p>
                                  Mis en jeu au total
                                </p>
                              </div>
                            </div>
                              <div className="news n3">
                                <div className="content">
                                  <p>
                                    Dernier gagnant
                                  </p>
                                  <img src="https://media.giphy.com/media/aCKMaeduKfFXG/giphy.gif" alt="gif"/>
                                  <p className="top">
                                    {dernierGagnantJoueur}
                                  </p>
                                </div>
                              </div>
                              <div className="news n2">
                                <div className="content">
                                  <p>
                                    Gagnant de 2017
                                  </p>
                                  <img src="https://media.giphy.com/media/F0uvYzyr2a7Li/giphy.gif" alt="gif"/>
                                  <p className="top">
                                    Ben
                                  </p>
                                </div>
                              </div>
                              <div className="news n4">
                                <div className="content">
                                  <img src="https://media.giphy.com/media/99S1Zo5Z0gByg/giphy.gif" alt="gif"/>
                                  <p>
                                    <span className="top">19</span><br />
                                    Absences d'Adrien consécutives
                                  </p>
                                </div>
                              </div>
                              <div className="news n1">
                                <div className="content">
                                  <img src="https://media.giphy.com/media/3oFzmqENRBkRTRfLcA/giphy.gif" alt="gif"/>
                                  <p className="top">
                                    {total} €
                                  </p>
                                  <p>
                                    Mis en jeu au total
                                  </p>
                                </div>
                              </div>
        </div>
      );
    }
  }
}))

export default Home;
