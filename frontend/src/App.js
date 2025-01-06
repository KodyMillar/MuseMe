import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Navbar from './components/layout/navigation/Navbar/Navbar';
import Home from './pages';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Buy from './pages/purchases/Buy';
import PurchaseBook from './pages/purchases/PurchaseBook';
import PurchaseComplete from './pages/purchases/PurchaseComplete';
import Play from './pages/play/Play';
import MyProgress from './pages/progress/MyProgress';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/auth/login" element={<Login />}></Route>
        <Route path="/auth/register" element={<Register />}></Route>
        <Route path="/buy" element={<Buy />}></Route>
        <Route path="/buy/purchase/:bookId" element={<PurchaseBook />} />
        <Route path="/buy/purchase-complete"  element={<PurchaseComplete />} />
        <Route path="/play" element={<Play />}></Route>
        <Route path="/my-progress" element={<MyProgress />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
