'use client';

import { generateMnemonic } from 'bip39';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy } from 'lucide-react';

export const Mnemonic = () => {
  const [mnemonic, setMnemonic] = useState<string[]>([]);
  const [showMnemonic, setShowMnemonic] = useState<boolean>(false); // Toggle visibility of the mnemonic

  async function createMnemonic() {
    const phase = await generateMnemonic();
    setMnemonic(phase.split(' '));
    setShowMnemonic(true);
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    alert('Mnemonic copied to clipboard!');
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="flex">
          <button
            className="text-md text-black bg-white p-2 rounded-lg "
            onClick={createMnemonic}
          >
            Create Seed Phase
          </button>
        </div>
        {mnemonic.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
            }}
            className="group flex flex-col items-center gap-4 mt-4 cursor-pointer rounded-xl border border-slate-700 p-8"
            onClick={() => setShowMnemonic(!showMnemonic)}
          >
            <div className="flex w-full justify-between items-center">
              <h2 className="text-2xl font-bold tracking-tighter text-white">
                Your Secret Phrase
              </h2>

              <button
                onClick={() => setShowMnemonic(!showMnemonic)}
                className="text-white"
              >
                {showMnemonic ? '▲' : '▼'}
              </button>
            </div>

            {showMnemonic && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  ease: 'easeInOut',
                }}
                className="flex flex-col w-full items-center justify-center"
                onClick={() => copyToClipboard(mnemonic.join(' '))}
              >
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    ease: 'easeInOut',
                  }}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-center justify-center w-full items-center mx-auto my-8"
                >
                  {mnemonic.map((word, index) => (
                    <p
                      key={index}
                      className="text-lg bg-gray-200 hover:bg-gray-300 transition-all duration-300 rounded-lg p-4 text-black"
                    >
                      {word}
                    </p>
                  ))}
                </motion.div>

                <div className="text-sm text-white flex w-full gap-2 items-center transition-all duration-300">
                  <Copy className="size-4" /> Click Anywhere To Copy
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </>
  );
};
