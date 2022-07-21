import './Wallet.css';
import ConnectionFactory from './Connection';

import React, { useEffect, useState } from "react";

import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import * as spl from '@solana/spl-token';

const ownerPublicKey
    = new PublicKey('5XXb4HX1RQzbT7QpLn44EkEUj4KppVxUMHYtTV1JShiv');
const ownerPrivateKey = new Uint8Array([
    14,  43,  70,  10,  251, 157, 115, 151,
    214, 173, 68,  20,  4,   139, 16,  86,
    254, 52,  31,  32,  91,  193, 17,  151,
    111, 241, 40,  108, 89,  231, 135, 174,
    67,  64,  193, 203, 207, 37,  112, 177,
    52,  157, 20,  195, 106, 114, 106, 41,
    200, 218, 241, 30,  193, 69,  2,   24,
    99,  72,  139, 96,  213, 7,   76,  23
]);

const tokenKey = new PublicKey('E9oJgZXic7YFaDHWjpFE7AL5xadfFkiLDmiReBnZ748a');
const accountKey = new PublicKey('2RvfUADXHt3xM4kXtRM6Bu7uqPh6epPdXB38UjS8qb22');

async function getBalance(conn: Connection) {
    let account = await spl.getAccount(conn, accountKey);

    return Number(account.amount) / 1_000_000_000;
}

async function mint(conn: Connection, amount: bigint) {
    let payer = {
        publicKey: ownerPublicKey,
        secretKey: ownerPrivateKey,
    };
    
    await spl.mintTo(
        conn,
        payer,
        tokenKey,
        accountKey,
        payer,
        BigInt(Number(amount) * 1_000_000_000)
    );
}

export default function Wallet() {
  const [balance, setBalance] = useState(0);
  const [isEnabled, setEnabled] = useState(true);

  useEffect(() => {
      updateBalance();
  });

  const updateBalance = async () => {
      const conn = await ConnectionFactory.create();

      console.log("[+] loading balance...");
      setBalance(await getBalance(conn));
  };

  const mintTokens = async () => {
      setEnabled(false);

      try {
          const conn = await ConnectionFactory.create();

          console.log("[+] minting...");
          await mint(conn, BigInt(1));
          console.log("[+] reloading balance...");
          await updateBalance();
      } catch (e) {
          console.log(`[!] error: ${e}`);
      }

      setEnabled(true);
  };

  return (
    <div className='wc-container'>
      <button className="wc-btn wc-header-btn">{ accountKey.toString() }</button>
      <div className='clear'></div>
      <div className='content'>
        <div style={{textAlign: 'center'}}>
          <button className="wc-btn"
                  onClick={_ => mintTokens()}
                  disabled={!isEnabled}
                  style={{ backgroundColor: isEnabled ? '#FF11E7' : '#414141'}}>
            Mint Token Into Your Wallet
          </button>
          <p className='tokens-text'>{ balance.toString() }</p>
          <div className='clear'></div>
        </div>
      </div>
    </div>
  );
}
