import './Home.css';

import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className='wc-container'>
      <Link to="/wallet">
        <button className="wc-btn wc-header-btn">Connect Wallet</button>
      </Link>
      <div className='clear'></div>
      <p className='text-banner'>Please connect to your wallet</p>
    </div>
  );
}
