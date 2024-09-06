'use client';
import { generateMnemonic } from 'bip39';
import { useState } from 'react';

export const Mnemonic = () => {
  const [mnemonic, setMnemoic] = useState<string[]>([]);
  async function createMnemonic() {
    const phase = await generateMnemonic();
    setMnemoic(phase.split(' '));
  }
  return (
    <>
      <div className="flex flex-col justify-center items-center max-w-max">
        <button
          className="text-xl text-black bg-white p-3 rounded"
          onClick={createMnemonic}
        >
          Create my Seed phrase
        </button>

        <div className="flex flex-wrap justify-center items-center mt-4 max-w-max bg-gray-950 border border-bg-white border-4 rounded-xl p-4 grid grid-cols-4">
          {mnemonic.map((value, index) => (
            <div
              key={index}
              className="bg-white text-black p-4 m-2 border border-gray-300 rounded-lg shadow text-center  "
            >
              <button className="">{value}</button>
            </div>
          ))}

          <div className="text-gray-500 p-2">Copy</div>
        </div>
      </div>{' '}
    </>
  );
};
