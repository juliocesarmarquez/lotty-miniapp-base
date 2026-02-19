'use client';

import { useState, useEffect } from 'react';

// Mock draw history
const mockDraws = [
  {
    round: 42,
    date: new Date().toLocaleDateString(),
    prize: '3,200',
    winner: '0x1234...5678',
    tickets: 125000,
    status: 'Active',
  },
  {
    round: 41,
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    prize: '2,850',
    winner: '0xabcd...ef01',
    tickets: 98234,
    status: 'Completed',
  },
  {
    round: 40,
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    prize: '3,100',
    winner: '0x9876...4321',
    tickets: 102456,
    status: 'Completed',
  },
];

export function DrawHistory() {
  const [draws, setDraws] = useState(mockDraws);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setDraws(mockDraws);
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className="bg-gray-800/50 rounded-xl p-6">
      <h3 className="font-semibold mb-4 text-lg">Recent Draws</h3>
      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
          <p className="text-gray-400 text-sm mt-2">Loading draw history...</p>
        </div>
      ) : (
        <div className="space-y-3">
          {draws.map((draw) => (
            <div
              key={draw.round}
              className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-purple-600 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-white">Round #{draw.round}</h4>
                  <p className="text-xs text-gray-400">{draw.date}</p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    draw.status === 'Active'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gray-600/20 text-gray-400'
                  }`}
                >
                  {draw.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <p className="text-xs text-gray-500">Prize Pool</p>
                  <p className="text-sm font-semibold text-purple-400">${draw.prize} USDC</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total Tickets</p>
                  <p className="text-sm font-semibold text-white">{draw.tickets.toLocaleString()}</p>
                </div>
              </div>
              {draw.status === 'Completed' && (
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <p className="text-xs text-gray-500">Winner</p>
                  <p className="text-sm font-mono text-green-400">{draw.winner}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-500 text-center">💡 Draw history is fetched from blockchain events</p>
      </div>
    </div>
  );
}
