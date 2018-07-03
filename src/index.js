import React from 'react';
import ReactDOM from 'react-dom';
import { unregister } from './registerServiceWorker';
import App from './components/App';

import './index.css';
import './components/table.css';
unregister();
ReactDOM.render(<App />, document.getElementById('root'));
unregister();
