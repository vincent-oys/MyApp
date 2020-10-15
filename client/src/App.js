import React from 'react';
import './App.css';
import Content from './Components/Contents/Content';
import NavBar from './Components/NavBar/NavBar';
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Content />
      </div>
    </Router>
  );
}

export default App;
