import React from 'react';
import ReactDOM from 'react-dom';
import './css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import { Provider } from 'react-redux';

import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import App from './App.js';

import registerServiceWorker from './registerServiceWorker';

import { store, history } from './redux/store';

ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/" component={App} />
            </Switch>
        </ConnectedRouter>
    </Provider>
), document.getElementById("root"));
registerServiceWorker();