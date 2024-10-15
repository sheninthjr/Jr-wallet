'use client';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Image from 'next/image';
import React, { useState } from 'react';

export function SendTransaction() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [recipient, setRecipient] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('SOL');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [amount, setAmount] = useState<string | null>(null);

  const isValidSolanaAddress = (address: string) => {
    try {
      const pubkey = new PublicKey(address);
      return PublicKey.isOnCurve(pubkey);
    } catch (error) {
      return false;
    }
  };

  async function SendMoney() {
    try {
      const lamports = parseFloat(amount || '0') * LAMPORTS_PER_SOL;
      if (lamports <= 0 || !recipient) {
        alert('Please enter a valid amount and recipient.');
        return;
      }
      if (!isValidSolanaAddress(recipient)) {
        alert('Invalid Solana address. Please enter a valid Solana address.');
        return;
      }
      const transaction = new Transaction();
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey!,
          toPubkey: new PublicKey(recipient),
          lamports,
        }),
      );

      const signature = await wallet.sendTransaction(transaction, connection);
      const latestBlockhash = await connection.getLatestBlockhash();
      const confirmation = await connection.confirmTransaction({
        signature,
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
      });
      if (confirmation.value.err) {
        alert('Transaction failed.');
      } else {
        alert('Transaction Successful!');
      }
    } catch (error) {
      console.error('Transaction failed', error);
      alert('Transaction failed. Please try again.');
    }
  }

  const handleRecipientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipient(e.target.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const selectCurrency = (currency: string) => {
    setSelectedCurrency(currency);
    setIsDropdownOpen(false);
  };

  const isSendDisabled =
    !wallet.connected || !amount || parseFloat(amount) <= 0 || !recipient;

  return (
    <div className="relative bg-[#1C243E] w-[100%] md:w-[70%] lg:w-1/2 xl:w-1/2 md:p-4 xl:p-4 lg:p-4 rounded-xl h-[480px] md:h-[550px] lg:h-[550px] xl:h-[550px]">
      <div className="bg-[#0B1022] pr-10 pl-10 pb-10 m-3 md:m-8 lg:m-10 xl:m-10 rounded-xl input-field h-[450px] flex flex-col justify-evenly relative">
        <Image
          src="/sol.png"
          alt="SOL"
          id="sol"
          width={50}
          height={50}
          className="coin-animation"
        />
        <Image
          src="/eth.png"
          alt="ETH"
          id="eth"
          width={50}
          height={50}
          className="coin-animation"
        />
        <Image
          src="/btc.png"
          alt="BTC"
          id="btc"
          width={50}
          height={50}
          className="coin-animation"
        />
        <Image
          src="/shiba.png"
          alt="Shiba"
          id="shiba"
          width={50}
          height={50}
          className="coin-animation"
        />
        <div className="relative flex flex-col space-y-6 lg:space-y-0 xl:space-y-0 gap-2 lg:flex-row xl:flex-row justify-between mb-4 ">
          <div
            className="relative w-[90%]-6 lg:w-44 xl:w-44 h-14 bg-[#1C243E] p-4 rounded-xl text-white cursor-pointer"
            onClick={toggleDropdown}
          >
            <div className="flex justify-between items-center">
              <Image
                src={`/${selectedCurrency.toLowerCase()}.png`}
                alt={selectedCurrency}
                width={24}
                height={24}
                className="w-6 h-6 mr-2"
              />
              <strong>{selectedCurrency}</strong>
              <span className="ml-auto">▼</span>
            </div>
          </div>

          {isDropdownOpen && (
            <div className="absolute top-16 w-[100%] md:[70%] lg:w-44 xl:w-44 bg-[#1C243E] rounded-xl text-white z-10">
              {['SOL', 'ETH', 'BTC'].map((currency) => (
                <div
                  key={currency}
                  className="flex input-fi items-center p-3 hover:bg-[#3FBDD0] hover:rounded-xl cursor-pointer"
                  onClick={() => selectCurrency(currency)}
                >
                  <Image
                    src={`/${currency.toLowerCase()}.png`}
                    alt={currency}
                    width={24}
                    height={24}
                    className="w-6 h-6 mr-2"
                  />
                  <strong>{currency}</strong>
                </div>
              ))}
            </div>
          )}

          <input
            placeholder="Enter amount"
            value={amount || ''}
            onChange={handleAmountChange}
            className="rounded-xl  w-[90%]-6 lg:w-44 xl:w-44 outline-none pl-4 bg-[#1C243E] text-white h-14"
          />
        </div>

        <input
          type="text"
          value={recipient}
          onChange={handleRecipientChange}
          placeholder="Recipient's Address"
          className="rounded-xl w-full outline-none h-14 pl-4 py-2 bg-[#1C243E] text-white"
        />

        <div className="mt-4 text-center">
          <div className="bg-[#3FBDD0] w-full py-1 rounded-xl text-[#161D33] relative">
            <div className="font-bold text-xl">
              {wallet.connected === false ? (
                <WalletMultiButton
                  style={{
                    backgroundColor: 'transparent',
                    height: '100%',
                    width: '100%',
                    border: 'none',
                    color: '#161D33',
                  }}
                />
              ) : (
                <button
                  className={`w-full bg-[#3FBDD0] py-2 rounded-xl text-[#161D33] ${
                    isSendDisabled ? 'cursor-not-allowed' : ' cursor-pointer'
                  }`}
                  onClick={SendMoney}
                  disabled={isSendDisabled}
                >
                  Send
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
