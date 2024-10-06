'use client';
import { useState, useRef, useEffect } from 'react';
import { SendTransaction } from './SendTransaction';
import { RequestAirDrop } from './RequestAirDrop';
import { HistoryTransaction } from './HistoryTransaction';
import { Swap } from './Swap';

export function ScreenTab() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Send Transaction', 'Swap', 'Request Airdrop', 'History'];
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
  });

  useEffect(() => {
    if (tabRefs.current[activeTab]) {
      const { offsetLeft, clientWidth } = tabRefs.current[activeTab];
      setIndicatorStyle({
        left: offsetLeft + clientWidth / 2,
        width: clientWidth + 50,
      });
    }
  }, [activeTab]);

  return (
    <div className="w-full">
      <div className="flex justify-around items-center font-semibold pt-10 relative">
        {tabs.map((tab, index) => (
          <div
            key={index}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            className={`cursor-pointer px-4 py-2 ${
              activeTab === index
                ? 'text-white bg-[#3EBDD3] rounded'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </div>
        ))}
        <div
          className="absolute bottom-0 h-1 bg-[#3EBDD3] transition-all duration-300 ease-in-out"
          style={{
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
            transform: 'translateX(-50%)',
          }}
        />
      </div>
      <div className="mt-8 p-4 text-black flex justify-center">
        {activeTab === 0 && <SendTransaction />}
        {activeTab === 1 && <Swap />}
        {activeTab === 2 && <RequestAirDrop />}
        {activeTab === 3 && <HistoryTransaction />}
      </div>
    </div>
  );
}
