import React, { Component } from 'react';
import Vainqueur2 from './Vainqueur2';
import loader from './images/Blocks-0.5s-40px.gif';

export default class Vainqueur extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tournois: [],
      ready: false
    };
  }

  componentDidMount() {
    fetch('https://guarded-shelf-83545.herokuapp.com/tournois')
      .then(res => res.json())
      .then(tournois => this.setState({
        tournois : tournois,
        ready: true
      }));
  }

  render() {
    return this.state.ready ? (
      <Vainqueur2 tournois={this.state.tournois}/>
    ) : (
      <div className="total-center">
        <img src={loader} alt="loading" />
      </div>
    )
  }

}
