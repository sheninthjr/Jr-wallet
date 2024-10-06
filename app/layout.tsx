import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import WalletProviderWrapper from '@/lib/WalletProviderWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jr Wallet',
  description: 'Created by Sheninth Jr',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProviderWrapper>{children}</WalletProviderWrapper>
      </body>
    </html>
  );
}
