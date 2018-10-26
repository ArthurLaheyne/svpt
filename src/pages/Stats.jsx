import React, { Component } from 'react';
import { observer, inject } from "mobx-react";

import Vainqueur2 from '../components/Vainqueur2';
import Nivo from '../components/Nivo';

import loader from '../images/Blocks-0.5s-40px.gif';

const Stats = inject("store")(observer(class Vainqueur extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tournois: [],
      ready: false
    };
  }

  componentDidMount() {
    this.props.store.refreshJoueur();
    fetch(process.env.REACT_APP_API_URL + '/tournois')
      .then(res => res.json())
      .then(data => {
        this.setState({
          tournois : data.data,
          ready: true
        });
      });
  }

  render() {
    return this.state.ready ? (
      <div>
        <Vainqueur2 tournois={this.state.tournois} />
        <Nivo tournois={this.state.tournois} />
      </div>
    ) : (
      <div className="total-center">
        <img src={loader} alt="loading" />
      </div>
    )
  }

}))

export default Stats;
