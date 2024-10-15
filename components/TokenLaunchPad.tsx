'use client';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Keypair } from '@solana/web3.js';
import { useState } from 'react';
import {
  MINT_SIZE,
  TOKEN_2022_PROGRAM_ID,
  createMintToInstruction,
  createAssociatedTokenAccountInstruction,
  getMintLen,
  createInitializeMetadataPointerInstruction,
  createInitializeMintInstruction,
  TYPE_SIZE,
  LENGTH_SIZE,
  ExtensionType,
  mintTo,
  getOrCreateAssociatedTokenAccount,
  getAssociatedTokenAddressSync,
} from '@solana/spl-token';

export function TokenLaunchPad() {
  const wallet = useWallet();
  const { connection } = useConnection();

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
    async function createToken() {
      const mintKey = Keypair.generate();
      const metadata = {
        mint: mintKey.publicKey,
        name: tokenName,
        symbol: tokenSymbol,
        uri: tokenImage,
        additionalMetadata: [],
      };
      const mintLen = getMintLen([ExtensionType.MetadataPointer]);
    }
    createToken();
  };

  return (
    <div className="relative bg-[#1C243E] w-[100%] md:w-[60%] lg:w-[60%] xl:w-[60%] md:p-4 xl:p-4 lg:p-4 rounded-xl h-[480px] md:h-[550px] lg:h-[550px] xl:h-[550px]">
      <div className="bg-[#0B1022] pr-3 pl-3 md:pr-10 md:pl-10 md:pt-5 lg:pr-10 lg:pl-10 lg:pt-5 xl:pr-10 xl:pl-10 xl:pt-5 pb-10 m-3 md:m-8 lg:m-10 xl:m-10 rounded-xl input-field h-[450px] flex flex-col justify-evenly relative">
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
          className="bg-[#3FBDD0] rounded-xl w-[60%] self-center text-md md:text-xl lg:text-xl xl:text-xl font-semibold"
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
