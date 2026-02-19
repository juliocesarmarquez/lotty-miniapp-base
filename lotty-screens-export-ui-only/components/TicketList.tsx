'use client';

import { useState } from 'react';

interface TicketListProps {
  address: string;
}

// Mock tickets data
const mockTickets = [
  { id: '123456', amount: 10, isActive: true },
  { id: '123457', amount: 20, isActive: true },
  { id: '123458', amount: 10, isActive: false },
];

export function TicketList({ address }: TicketListProps) {
  const [tickets, setTickets] = useState(mockTickets);
  const [withdrawingId, setWithdrawingId] = useState<string | null>(null);

  const handleWithdraw = async (ticketId: string) => {
    setWithdrawingId(ticketId);
    // Simular delay de transacción
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert(`🎟️ Mock: Would withdraw ticket #${ticketId}\n\nIn production, this would trigger a blockchain transaction.`);
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, isActive: false } : t))
    );
    setWithdrawingId(null);
  };

  const activeTickets = tickets.filter((t) => t.isActive);

  if (activeTickets.length === 0) {
    return (
      <div className="bg-gray-800/50 rounded-xl p-6">
        <h3 className="font-semibold mb-4">Your Tickets</h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🎟️</div>
          <p className="text-gray-400 text-sm">No active tickets.</p>
          <p className="text-gray-500 text-xs mt-1">Buy your first ticket to participate in the draw!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 rounded-xl p-6">
      <h3 className="font-semibold mb-4">Your Tickets ({activeTickets.length})</h3>
      <div className="space-y-3">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className={`rounded-lg p-4 border-2 transition-all ${
              ticket.isActive
                ? 'bg-gray-900/50 border-gray-700 hover:border-purple-600'
                : 'bg-gray-900/30 border-gray-800 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎟️</span>
                <div>
                  <p className="font-medium text-white">Ticket #{ticket.id.slice(-6)}</p>
                  <p className="text-xs text-gray-400">${ticket.amount} USDC</p>
                  {ticket.isActive ? (
                    <p className="text-xs text-green-400 mt-1">✓ Active in current draw</p>
                  ) : (
                    <p className="text-xs text-gray-500 mt-1">Withdrawn</p>
                  )}
                </div>
              </div>
              {ticket.isActive && (
                <button
                  onClick={() => handleWithdraw(ticket.id)}
                  disabled={withdrawingId === ticket.id}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {withdrawingId === ticket.id ? 'Withdrawing...' : 'Withdraw'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-500 text-center">💡 Withdraw anytime without losing your principal</p>
      </div>
    </div>
  );
}
