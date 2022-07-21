import './Wallet.css';

import React from "react";

export default function Wallet() {
  return (
    <div className='wc-container'>
      <button className="wc-btn wc-header-btn">Account ID</button>
      <div className='clear'></div>
      <div className='content'>
        <div style={{textAlign: 'center'}}>
          <button className="wc-btn">Mint Token Into Your Wallet</button>
          <p className='tokens-text'>0</p>
          <div className='clear'></div>
        </div>
      </div>
    </div>
  );
}
