import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Image from 'next/image';
import React, { useState } from 'react';

export function SendTransaction() {
  const wallet = useWallet();

  const [recipient, setRecipient] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('SOL');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleRecipientChange = (e: any) => {
    setRecipient(e.target.value);
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const selectCurrency = (currency: string) => {
    setSelectedCurrency(currency);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative-container bg-[#1C243E] w-1/2 p-4 rounded-xl h-[550px]">
      <div className="bg-[#0B1022] pr-10 pl-10 pb-10 m-10 rounded-xl h-[450px] flex flex-col justify-evenly relative">
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

        <div className="relative flex justify-between mb-4">
          <div
            className="relative w-44 h-14 bg-[#1C243E] p-4 rounded-xl text-white cursor-pointer"
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
            <div className="absolute top-16 w-44 bg-[#1C243E] rounded-xl text-white z-10">
              <div
                className="flex items-center p-3 hover:bg-[#3FBDD0] hover:rounded-xl cursor-pointer"
                onClick={() => selectCurrency('SOL')}
              >
                <Image
                  src="/sol.png"
                  alt="SOL"
                  width={24}
                  height={24}
                  className="w-6 h-6 mr-2"
                />
                <strong>SOL</strong>
              </div>
              <div
                className="flex items-center p-3 hover:bg-[#3FBDD0] hover:rounded-xl cursor-pointer"
                onClick={() => selectCurrency('ETH')}
              >
                <Image
                  src="/eth.png"
                  width={24}
                  height={24}
                  alt="ETH"
                  className="w-6 h-6 mr-2"
                />
                <strong>ETH</strong>
              </div>
              <div
                className="flex items-center p-3 hover:bg-[#3FBDD0] hover:rounded-xl cursor-pointer"
                onClick={() => selectCurrency('BTC')}
              >
                <Image
                  src="/btc.png"
                  width={24}
                  height={24}
                  alt="BTC"
                  className="w-6 h-6 mr-2"
                />
                <strong>BTC</strong>
              </div>
            </div>
          )}

          <input
            placeholder="Enter amount"
            className="rounded-xl w-48 outline-none pl-4 bg-[#1C243E] text-white h-14"
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
                <button className="bg-[#3FBDD0] w-full py-2 rounded-xl text-[#161D33]">
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
