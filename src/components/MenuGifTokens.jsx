import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { LinkContainer } from 'react-router-bootstrap';

const MenuGifTokens = inject("store")(observer(class MenuGifTokens extends Component {

  render() {
    const gifTokens = this.props.store.gifTokens;
    const PostGifLink = gifTokens > 0 ? (
      <LinkContainer to="/post-gif">
        <li className="right" style={{width: '50px'}}>
          <p className="count-gif">{gifTokens}</p>
          <img
            src="https://media.giphy.com/media/54Ya3l8S8y1ggAlzTA/giphy-downsized.gif"
            height="50"
            alt="giphy"
          />
        </li>
      </LinkContainer>
    ) : null;
    return PostGifLink;
  }
}))

export default MenuGifTokens;
