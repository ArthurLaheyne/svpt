import React from 'react';
import { Route } from "react-router-dom";

import Stats from './pages/Stats';
import Historique from './pages/Historique';
import Home from './pages/Home';
import GiphyNewPost from './pages/GiphyNewPost';
import TournoiPost from './pages/TournoiPost';
import Home2 from './pages/Home2';

const Routing = () => (
  <div>
    <Route exact path="/" component={Home} />
    <Route path="/post-gif" component={GiphyNewPost} />
    <Route path="/post-tournoi" component={TournoiPost} />
    <Route path="/historique" component={Historique} />
    <Route path='/stats' render={() => (
      <Stats joueurConnecte="max" />
    )}/>
    <Route path="/home2" component={Home2} />
  </div>
);

export default Routing;
