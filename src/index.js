import React from 'react';
import { render } from "react-dom";
import { unregister } from './registerServiceWorker';
import App from './App';
import JoueurModel from "./models/JoueurModel";
import DevTools from "mobx-react-devtools";
import { Provider } from "mobx-react";

import './css/index.css';
import './css/table.css';

const store = new JoueurModel();

unregister();
render(
  <div>
    <Provider store={store}>
      <App />
    </Provider>
  </div>,
  document.getElementById('root')
);

unregister();
