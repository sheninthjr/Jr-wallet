'use client';

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import Image from 'next/image';
import { useState, ChangeEvent } from 'react';

export function RequestAirDrop() {
  const [solAmount, setSolAmount] = useState<number>(1);

  const wallet = useWallet();
  const { connection } = useConnection();

  const handleAirDrop = () => {
    if (!wallet.publicKey || solAmount <= 0) {
      return;
    }
    async function airDrop() {
      try {
        await connection.requestAirdrop(
          wallet.publicKey!,
          solAmount * LAMPORTS_PER_SOL,
        );
        alert('Airdropped SOL to your wallet');
      } catch (error) {
        console.error('Airdrop failed', error);
      }
    }
    airDrop();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setSolAmount(isNaN(value) ? 0 : value);
  };

  return (
    <div className="pt-36 w-full flex items-center justify-center">
      <div className="relative bg-[#1C243E] w-1/2 rounded-xl flex flex-col justify-center items-center space-y-8 p-10 animated-container">
        <div className="relative w-full">
          <input
            placeholder="Enter the amount of SOL"
            value={solAmount}
            onChange={handleChange}
            className="bg-[#0B1022] w-full p-3 rounded-xl border-none outline-none text-white pr-12 input-field"
          />
          <Image
            src="/sol.png"
            alt="SOL"
            width={50}
            height={50}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8"
          />
        </div>
        <button
          className="bg-[#3FBDD0] rounded-xl text-xl font-semibold"
          onClick={handleAirDrop}
        >
          {wallet.connected === true ? (
            <div className="pl-3 pr-3 pt-2 pb-2">Air Drop</div>
          ) : (
            <WalletMultiButton
              style={{
                color: '#0B1022',
                background: 'transparent',
              }}
            />
          )}
        </button>
      </div>
    </div>
  );
}
