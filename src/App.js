import React from 'react';
import logo from './logo.svg';
import './App.css';
import GoalsManager from './containers/GoalsManager/GoalsManager'

function App() {
  return (
    <div className="App">
      <div>Logo | Nav</div>
      <main className="Content">
        <GoalsManager />
      </main>
    </div>
  );
}

export default App;
