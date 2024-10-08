'use client';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState } from 'react';

export function TokenLaunchPad() {
  const wallet = useWallet();

  const [tokenName, setTokenName] = useState<string>('');
  const [tokenSymbol, setTokenSymbol] = useState<string>('');
  const [tokenImage, setTokenImage] = useState<string>('');
  const [tokenSupply, setTokenSupply] = useState<number | undefined>(undefined);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    switch (id) {
      case 'name':
        setTokenName(value);
        break;
      case 'symbol':
        setTokenSymbol(value);
        break;
      case 'image':
        setTokenImage(value);
        break;
      case 'supply':
        const supplyValue = parseFloat(value);
        setTokenSupply(isNaN(supplyValue) ? undefined : supplyValue);
        break;
      default:
        break;
    }
  };

  const handleCreateToken = () => {
    console.log('handleCreateToken');
  };

  return (
    <div className="relative-container bg-[#1C243E] w-[70%] p-4 rounded-xl h-[550px]">
      <div className="bg-[#0B1022] pr-10 pl-10 m-10 rounded-xl input-field h-[450px] flex flex-col justify-evenly relative">
        <input
          placeholder="Enter the token name"
          id="name"
          value={tokenName}
          onChange={handleValueChange}
          className="rounded-xl outline-none pl-4 bg-[#1C243E] text-white h-14"
        />
        <input
          placeholder="Enter the token symbol"
          id="symbol"
          value={tokenSymbol}
          onChange={handleValueChange}
          className="rounded-xl outline-none pl-4 bg-[#1C243E] text-white h-14"
        />
        <input
          placeholder="Enter the image url"
          id="image"
          value={tokenImage}
          onChange={handleValueChange}
          className="rounded-xl outline-none pl-4 bg-[#1C243E] text-white h-14"
        />
        <input
          placeholder="Enter the initail supply"
          id="supply"
          value={tokenSupply}
          onChange={handleValueChange}
          className="rounded-xl outline-none pl-4 bg-[#1C243E] text-white h-14"
        />
        <button
          className="bg-[#3FBDD0] rounded-xl w-[60%] self-center text-xl font-semibold"
          onClick={handleCreateToken}
        >
          {wallet.connected === true ? (
            <div className="pl-3 pr-3 pt-2 pb-2">Create Token</div>
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
