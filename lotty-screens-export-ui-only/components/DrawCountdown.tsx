'use client';

import { useState, useEffect } from 'react';

// Mock: próximo sorteo en 2 días, 5 horas, 30 minutos
const MOCK_NEXT_DRAW_SECONDS = 2 * 86400 + 5 * 3600 + 30 * 60;

export function DrawCountdown() {
  const [timeLeft, setTimeLeft] = useState('--:--:--');

  useEffect(() => {
    // Calcular tiempo hasta el próximo sorteo mock
    const nextDraw = Math.floor(Date.now() / 1000) + MOCK_NEXT_DRAW_SECONDS;

    const updateCountdown = () => {
      const now = Math.floor(Date.now() / 1000);
      const diff = nextDraw - now;

      if (diff <= 0) {
        setTimeLeft('Draw Ready!');
        return;
      }

      const days = Math.floor(diff / 86400);
      const hours = Math.floor((diff % 86400) / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      const seconds = diff % 60;

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else {
        setTimeLeft(
          `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gray-800/50 rounded-xl p-4 mb-6 text-center">
      <p className="text-sm text-gray-400 mb-1">Next Draw In</p>
      <p className="text-2xl font-mono font-bold text-purple-400">{timeLeft}</p>
    </div>
  );
}
