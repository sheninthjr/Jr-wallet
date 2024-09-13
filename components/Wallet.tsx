'use client';

export const Wallet = () => {
  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-4">
          <div>
            <button className="text-md text-black bg-white p-2 rounded-lg">
              Ethereum
            </button>
          </div>
          <div>
            <button className="text-md text-black bg-white p-2 rounded-lg">
              Solana
            </button>
          </div>
        </div>
        <div>
          <button className="text-md text-white bg-indigo-600 p-2 rounded-lg">
            Add Wallet
          </button>
        </div>
      </div>
    </>
  );
};
