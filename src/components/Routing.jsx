import React from 'react';
import { Route } from "react-router-dom";

import Vainqueur from './Vainqueur';
import TournoisNew from './TournoisNew';
import Home from './Home';
import PostGif from './PostGif';
import Home2 from './Home2';
import Admin from './Admin';

const Routing = () => (
  <div>
    <Route exact path="/" component={Home} />
    <Route path="/post-gif" component={PostGif} />
    <Route path="/tournois" component={TournoisNew} />
    <Route path='/vainqueur' render={() => (
      <Vainqueur joueurConnecte="max" />
    )}/>
    <Route path="/home2" component={Home2} />
    <Route path="/admin" component={Admin} />
  </div>
);

export default Routing;
