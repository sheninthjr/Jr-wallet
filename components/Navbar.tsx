'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { Box } from 'lucide-react';
import React from 'react';

const Navbar = () => {
  const wallet = useWallet();

  const buttonStyle = {
    backgroundColor: '#3FBDD0',
    borderRadius: '10px',
    color: '#161D33',
  };

  return (
    <nav className="flex justify-between items-center py-4">
      <div className="flex items-center gap-2">
        <Box className="size-8 text-[#3EBDD3]" />
        <div className="flex flex-col gap-4">
          <span className="tracking-tighter text-3xl font-extrabold flex bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent gap-2 items-center">
            Jr Wallet
          </span>
        </div>
      </div>
      <div>
        {wallet.connected ? (
          <WalletDisconnectButton style={buttonStyle} />
        ) : (
          <WalletMultiButton style={buttonStyle} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
