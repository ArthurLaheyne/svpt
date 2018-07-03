import React, { Component } from 'react';

class GifNew extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tournois: [],
      ready: false
    };
  }

  render() {
    return (
      <div className="news">
        <div className="content" style={{backgroundColor: this.props.backgroundColor}}>
          <img src={this.props.gifUrl} alt="gif"/>
          <p className="top" style={{color: this.props.color}}>
            {this.props.text}
          </p>
        </div>
      </div>
    );
  }
}

export default GifNew;
