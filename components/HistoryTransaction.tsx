'use client';

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useState, useEffect } from 'react';

export function HistoryTransaction() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (wallet.publicKey) {
      fetchTransactionHistory();
    }
  }, [wallet.publicKey]);

  const fetchTransactionHistory = async () => {
    setLoading(true);
    try {
      const confirmedSignatures =
        await connection.getConfirmedSignaturesForAddress2(wallet.publicKey!, {
          limit: 10,
        });

      const transactionDetails = await Promise.all(
        confirmedSignatures.map(async (signatureInfo) => {
          const transaction = await connection.getConfirmedTransaction(
            signatureInfo.signature,
          );
          return transaction;
        }),
      );

      setTransactions(transactionDetails);
    } catch (error) {
      console.error('Failed to fetch transactions', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-10 w-full flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-4 text-white">
        Transaction History
      </h2>

      {loading ? (
        <p className="text-white">Loading transactions...</p>
      ) : transactions.length > 0 ? (
        <div className="w-full max-w-4xl bg-[#1C243E] p-8 rounded-lg">
          <ul className="space-y-4 text-white">
            {transactions.map((tx, index) => (
              <li key={index} className="p-4 rounded-lg bg-[#0B1022]">
                <p>
                  <strong>Signature:</strong> {tx?.transaction?.signatures[0]}
                </p>
                <p>
                  <strong>Slot:</strong> {tx?.slot}
                </p>
                <p>
                  <strong>Block Time:</strong>{' '}
                  {tx?.blockTime
                    ? new Date(tx.blockTime * 1000).toLocaleString()
                    : 'N/A'}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-white">No transactions found for this wallet.</p>
      )}
    </div>
  );
}
