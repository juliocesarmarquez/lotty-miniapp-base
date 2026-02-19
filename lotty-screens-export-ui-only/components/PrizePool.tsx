'use client';

import { useState, useEffect } from 'react';

// Mock prize amount
const mockPrizeAmount = 3250.75;

export function PrizePool() {
  const [prizeAmount, setPrizeAmount] = useState('0.00');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setPrizeAmount(mockPrizeAmount.toFixed(2));
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 mb-6 text-center">
      <p className="text-sm text-purple-200 mb-1">Current Prize Pool</p>
      <h2 className="text-4xl font-bold mb-2">{isLoading ? '...' : `$${prizeAmount}`}</h2>
      <p className="text-xs text-purple-200">USDC</p>
    </div>
  );
}
