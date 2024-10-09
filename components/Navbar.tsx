'use client';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { Box } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number>();

  useEffect(() => {
    async function getBalance() {
      if (wallet.publicKey) {
        const response = await connection.getBalance(wallet.publicKey);
        setBalance(response / LAMPORTS_PER_SOL);
      } else {
        setBalance(undefined);
      }
    }
    getBalance();
  }, [connection, wallet.publicKey, wallet.connected]);

  const buttonStyle = {
    backgroundColor: '#3FBDD0',
    borderRadius: '10px',
    color: '#161D33',
  };

  return (
    <div className="flex justify-between items-center py-4">
      <div className="flex items-center gap-2">
        <Box className="size-8 text-[#3EBDD3]" />
        <div className="flex flex-col gap-4">
          <span className="tracking-tighter text-3xl font-extrabold flex bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent gap-2 items-center">
            <a href="/">Jr Wallet</a>
          </span>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4">
        <div
          className={`${balance !== undefined && `bg-[#1C243E] p-3 font-semibold text-gray-300 rounded-xl`}`}
        >
          {balance !== undefined ? `${balance.toFixed(2)} SOL` : ''}
        </div>
        <div>
          {wallet.connected ? (
            <WalletDisconnectButton style={buttonStyle} />
          ) : (
            <WalletMultiButton style={buttonStyle} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
