'use client';

import { useState } from 'react';
import { TicketPurchase } from './TicketPurchase';
import { UserStats } from './UserStats';
import { PrizePool } from './PrizePool';
import { DrawCountdown } from './DrawCountdown';
import { TicketList } from './TicketList';
import { ShareButton } from './ShareButton';
import { DrawHistory } from './DrawHistory';

// Mock user address - reemplazar con tu sistema de autenticación
const MOCK_ADDRESS = '0x1234567890123456789012345678901234567890';

export function LottyDashboard() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'buy' | 'tickets' | 'history'>('buy');

  const handleConnect = () => {
    setIsConnected(true);
    setAddress(MOCK_ADDRESS);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🎰</span>
          <h1 className="text-2xl font-bold">Lotty</h1>
        </div>
        {isConnected && address ? (
          <div className="flex items-center gap-2 px-4 py-2 bg-purple-600 rounded-lg">
            <div className="h-6 w-6 rounded-full bg-purple-400"></div>
            <span className="text-sm font-medium">
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>
            <button
              onClick={() => {
                setIsConnected(false);
                setAddress(null);
              }}
              className="ml-2 text-xs hover:underline"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={handleConnect}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors"
          >
            Connect Wallet
          </button>
        )}
      </header>

      {isConnected && address ? (
        <>
          <PrizePool />
          <DrawCountdown />
          <UserStats address={address} />
          <div className="mb-6">
            <ShareButton address={address} />
          </div>
          <div className="flex gap-2 mb-4">
            {(['buy', 'tickets', 'history'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          {activeTab === 'buy' && <TicketPurchase />}
          {activeTab === 'tickets' && <TicketList address={address} />}
          {activeTab === 'history' && <DrawHistory />}
        </>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-xl mb-4">Welcome to Lotty!</h2>
          <p className="text-gray-400 mb-8">
            Connect your wallet to start playing the no-loss lottery
          </p>
          <div className="space-y-4">
            <button
              onClick={handleConnect}
              className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg font-medium mx-auto"
            >
              Connect Wallet
            </button>
            <p className="text-xs text-gray-500 mt-4">
              This is a UI-only demo. Connect to see mock data.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
