'use client';

import { useState, useEffect } from 'react';

interface UserStatsProps {
  address: string;
}

// Mock user stats
const mockUserStats = {
  tickets: 3,
  streak: 5,
  multiplier: 1.5,
  winChance: 12.5,
};

export function UserStats({ address }: UserStatsProps) {
  const [stats, setStats] = useState(mockUserStats);
  const [isLoading, setIsLoading] = useState(false);

  // Simular carga de datos (opcional - puedes reemplazar con tu API)
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setStats(mockUserStats);
      setIsLoading(false);
    }, 500);
  }, [address]);

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <StatCard
        label="Tickets"
        value={stats.tickets.toString()}
        icon="🎟️"
        loading={isLoading}
      />
      <StatCard
        label="Streak"
        value={`${stats.streak} wks`}
        icon="🔥"
        subtext={`${stats.multiplier}x`}
        loading={isLoading}
      />
      <StatCard
        label="Win Chance"
        value={`${stats.winChance}%`}
        icon="🎯"
        loading={isLoading}
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  subtext,
  loading,
}: {
  label: string;
  value: string;
  icon: string;
  subtext?: string;
  loading?: boolean;
}) {
  return (
    <div className="bg-gray-800/50 rounded-xl p-4 text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-lg font-bold">{loading ? '...' : value}</div>
      <div className="text-xs text-gray-400">{label}</div>
      {subtext && <div className="text-xs text-purple-400 mt-1">{subtext}</div>}
    </div>
  );
}
