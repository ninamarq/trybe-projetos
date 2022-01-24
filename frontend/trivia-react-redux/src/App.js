import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Feedback from './pages/Feedback';
import Game from './pages/Game';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <Switch className="App">
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ Game } />
      <Route path="/config" component={ Settings } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/ranking" component={ Ranking } />
    </Switch>
  );
}
