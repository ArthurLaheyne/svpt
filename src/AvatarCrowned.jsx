import React from 'react';
import images from './mock.js';


export default function AvatarCrowned(props) {
  return (
    <div style={{width: props.width+'px', height: props.height+'px', display: 'inline-block', textAlign: 'left', position: 'relative'}}>
      <img style={{position: 'absolute'}} alt={props.joueur} src={images[props.joueur]} width={props.width} height={props.height} />
      <img style={{position: 'absolute'}} alt={props.joueur} src={images['crown-100']} width={props.width} height={props.height} />
      <p style={{position: 'absolute', fontSize: '16px', width: '100%', height: '100%', padding: '19px 0px 0 45px', color: 'black'}}>{props.victoires > 1 ? props.victoires : null}</p>
    </div>
  );
}
