import { Mnemonic } from '@/components/Mnemonic';
import Navbar from '@/components/Navbar';
import { Wallet } from '@/components/Wallet';

export default function Home() {
  return (
    <>
      <main className="max-w-7xl mx-auto flex flex-col gap-4 p-4 min-h-[92vh]">
        <Navbar />
        <Mnemonic />
        <Wallet />
      </main>
    </>
  );
}
