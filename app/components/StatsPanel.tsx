'use client';

import { Card } from '@/app/components/ui/Card';
import { CountdownTimer } from '@/app/components/CountdownTimer';

interface StatsPanelProps {
  prizePool: number;
  totalDeposits: number;
  participantCount: number;
  timeUntilDraw: number;
}

export function StatsPanel({
  prizePool,
  totalDeposits,
  participantCount,
  timeUntilDraw,
}: StatsPanelProps) {
  return (
    <Card variant="glow" padding="md">
      {/* Prize pool */}
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lemon/10 border border-lemon/20 mb-3">
          <span>🏆</span>
          <span className="text-xs font-semibold text-lemon uppercase tracking-wider">Premio Actual</span>
        </div>
        <p className="text-gradient-lemon text-5xl font-bold tabular-nums leading-none">
          ${prizePool.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <p className="text-white/40 text-sm mt-1">USDC</p>
      </div>

      {/* Countdown */}
      <div className="mb-5">
        <p className="text-center text-xs text-white/40 uppercase tracking-wider mb-2">
          Próximo sorteo en
        </p>
        <CountdownTimer targetSeconds={timeUntilDraw} />
      </div>

      {/* Divider */}
      <div className="border-t border-white/5 mb-4" />

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="text-center">
          <p className="text-white font-bold text-lg">
            ${totalDeposits.toLocaleString()}
          </p>
          <p className="text-white/40 text-xs">Total depositado</p>
        </div>
        <div className="text-center">
          <p className="text-white font-bold text-lg">
            {participantCount.toLocaleString()}
          </p>
          <p className="text-white/40 text-xs">Participantes</p>
        </div>
      </div>

      {/* Aave badge */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
          <span className="text-xs">⚡</span>
          <span className="text-xs text-white/50">Powered by Aave • ~4% APY</span>
        </div>
      </div>
    </Card>
  );
}
