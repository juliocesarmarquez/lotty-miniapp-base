'use client';

import { useState } from 'react';

const TICKET_PRICE = 10;

export function TicketPurchase() {
  const [ticketAmount, setTicketAmount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const totalAmount = ticketAmount * TICKET_PRICE;

  const handlePurchase = async () => {
    setIsLoading(true);
    // Simular delay de transacción
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert(`🎟️ Mock: Would purchase ${ticketAmount} ticket(s) for $${totalAmount} USDC\n\nIn production, this would trigger a blockchain transaction.`);
    setIsLoading(false);
    setTicketAmount(1);
  };

  return (
    <div className="bg-gray-800/50 rounded-xl p-6">
      <h3 className="font-semibold mb-4 text-lg">🎟️ Buy Tickets</h3>
      <div className="mb-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={() => setTicketAmount(Math.max(1, ticketAmount - 1))}
            className="w-12 h-12 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-bold text-2xl transition-colors"
            disabled={ticketAmount <= 1}
          >
            -
          </button>
          <div className="text-center min-w-[120px]">
            <p className="text-4xl font-bold text-white">{ticketAmount}</p>
            <p className="text-sm text-gray-400">
              {ticketAmount === 1 ? 'ticket' : 'tickets'}
            </p>
          </div>
          <button
            onClick={() => setTicketAmount(ticketAmount + 1)}
            className="w-12 h-12 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-bold text-2xl transition-colors"
          >
            +
          </button>
        </div>
        <div className="flex gap-2 mb-4">
          {[1, 5, 10, 20].map((count) => (
            <button
              key={count}
              onClick={() => setTicketAmount(count)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                ticketAmount === count
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {count}
            </button>
          ))}
        </div>
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Total Cost</span>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">${totalAmount}</p>
              <p className="text-xs text-gray-400">USDC</p>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-gray-700">
            <p className="text-xs text-gray-500">${TICKET_PRICE} USDC per ticket</p>
          </div>
        </div>
      </div>
      <button
        onClick={handlePurchase}
        disabled={isLoading}
        className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Processing...' : `Buy ${ticketAmount} Ticket${ticketAmount > 1 ? 's' : ''} 🎟️`}
      </button>
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <span className="text-green-400 text-sm">✓</span>
            <p className="text-xs text-gray-400">Your principal is never at risk</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-400 text-sm">✓</span>
            <p className="text-xs text-gray-400">Withdraw anytime without penalty</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-400 text-sm">✓</span>
            <p className="text-xs text-gray-400">Earn yield while you participate</p>
          </div>
        </div>
      </div>
    </div>
  );
}
