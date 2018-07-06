import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { LinkContainer } from 'react-router-bootstrap';

const MenuGifTokens = inject("store")(observer(class MenuGifTokens extends Component {

  render() {
    const gifTokens = this.props.store.joueur ? this.props.store.joueur.gifTokens : 0;
    const GiphyNewPostLink = gifTokens > 0 ? (
      <LinkContainer to="/post-gif">
        <li className="right">
          <p className="count-gif" style={{width: '50px', right: '0'}}>{gifTokens}</p>
          <img
            src="https://media.giphy.com/media/54Ya3l8S8y1ggAlzTA/giphy-downsized.gif"
            height="50"
            alt="giphy"
          />
        </li>
      </LinkContainer>
    ) : null;
    return GiphyNewPostLink;
  }
}))

export default MenuGifTokens;
