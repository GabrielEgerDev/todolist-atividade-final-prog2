import React from 'react';
import { BrowserRouter } from 'react-router-dom'

import Routes from './services/Routes'
import Header from './Components/Header'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
    </BrowserRouter>
  );
}

export default App;