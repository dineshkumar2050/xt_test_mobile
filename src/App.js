import React from 'react';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import './App.css';
import LandingPage from './components/landing';
import store from './store';
import {Provider} from 'react-redux';
import FilterPage from './components/filter';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={ LandingPage } />
            <Route path="/filter" component={ FilterPage } />
          </Switch>
        </Router>
      </div>
      </Provider>
  );
}

export default App;
