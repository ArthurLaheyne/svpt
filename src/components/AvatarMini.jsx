import React from 'react';
import PropTypes from 'prop-types';
import images from '../mock.js';


export default function Avatar(props) {
  return (
    <img alt={props.joueur} src={images[props.joueur+'-mini']} width={props.width} height={props.height} />
  );
}


Avatar.propTypes = {
  joueur: PropTypes.string.isRequired
};
