import React from 'react';
import './index.css'
import Home from './Home.js'
import Pass from './Pass.js'
import login from './Login.js'
import { BrowserRouter, Route } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Route component = { login } exact path="/" />
        <Route component = { Home } path="/home" />
        <Route component = { Pass } path="/pass" />
      </div>
    </BrowserRouter>
  );
};
export default App;