import './App.css';

import Home from './Home';
import Wallet from './Wallet';

import {
  Routes,
  Route,
} from "react-router-dom";

export default function App() {
  return (<Routes>
      <Route path="/" element={<Home />} />
      <Route path="wallet" element={<Wallet />} />
    </Routes>
  );
}

