import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import WalletPage from './components/walletPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<WalletPage />} />
      </Routes>
    </Router>
  );
}

export default App;
