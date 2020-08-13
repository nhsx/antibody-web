import React from 'react';
import TestResult from '../TestResult';
import appContainer from './container';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TestResult container={appContainer} />
      </header>
    </div>
  );
}

export default App;
