import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import './App.css';
import GoalsManager from './containers/GoalsManager/GoalsManager'
import Nav from './components/Nav/Nav'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        
        <Nav />
        <main className="Content">
          <GoalsManager />
        </main>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
