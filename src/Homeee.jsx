import React from 'react';
import Tournoi from './Tournoi';
import Gallery from './Gallery';

const data = require('./mock.json');

const elements = [
  {src: "https://media.giphy.com/media/3oFzmqENRBkRTRfLcA/giphy.gif"},
  {src: "https://media.giphy.com/media/F0uvYzyr2a7Li/giphy.gif"},
  {src: "https://media.giphy.com/media/26ufdkXNlsT1RAEHC/giphy.gif"},
  {src: "https://media.giphy.com/media/99S1Zo5Z0gByg/giphy.gif"}
]

export default function Homeees() {
  return (
    <div id="homeee">
      <Gallery elements={elements}/>
    </div>
  );
}
