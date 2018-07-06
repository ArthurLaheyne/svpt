import React from 'react';
import { Route } from "react-router-dom";

import Vainqueur from './pages/Vainqueur';
import TournoisNew from './pages/TournoisNew';
import Home from './pages/Home';
import GiphyNewPost from './pages/GiphyNewPost';
import Home2 from './pages/Home2';
import Admin from './pages/Admin';

const Routing = () => (
  <div>
    <Route exact path="/" component={Home} />
    <Route path="/post-gif" component={GiphyNewPost} />
    <Route path="/tournois" component={TournoisNew} />
    <Route path='/vainqueur' render={() => (
      <Vainqueur joueurConnecte="max" />
    )}/>
    <Route path="/home2" component={Home2} />
    <Route path="/admin" component={Admin} />
  </div>
);

export default Routing;
