import React, { useState } from 'react';

import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import Breakdown from './components/breakdown/Breakdown'
import BulkAdd from './components/transactions/BulkAdd'
import Nav from './components/nav/Nav'
import Snapshot from './components/snapshot/Snapshot'

import './App.css'

function App() {
  return (
    <Router>
      <div id="modal-wrapper">

      </div>

      <div className="App">
        <Nav />

        <main>
            <Route path="/add-transactions" component={BulkAdd} />
            <Route path="/breakdown" component={Breakdown} />
            <Route path="/" component={Snapshot} exact />
        </main>
      </div>
    </Router>
  );
}

export default App;
