'use client';

import { Trophy } from 'lucide-react';
import { Card } from '@/app/components/ui/Card';

interface DrawResult {
  round: number;
  date: string;
  prizeUsdc: number;
  winner: string;
  totalTickets: number;
  status: 'active' | 'completed';
}

interface DrawHistoryProps {
  draws?: DrawResult[];
  userAddress?: string;
}

const MOCK_DRAWS: DrawResult[] = [
  {
    round: 42,
    date: new Date().toLocaleDateString('es-AR'),
    prizeUsdc: 3250.75,
    winner: '',
    totalTickets: 125000,
    status: 'active',
  },
  {
    round: 41,
    date: new Date(Date.now() - 7 * 86400 * 1000).toLocaleDateString('es-AR'),
    prizeUsdc: 2850.0,
    winner: '0xabcd1234abcd1234abcd1234abcd1234abcd1234',
    totalTickets: 98234,
    status: 'completed',
  },
  {
    round: 40,
    date: new Date(Date.now() - 14 * 86400 * 1000).toLocaleDateString('es-AR'),
    prizeUsdc: 3100.5,
    winner: '0x9876543298765432987654329876543298765432',
    totalTickets: 102456,
    status: 'completed',
  },
];

function shortAddress(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export function DrawHistory({ draws = MOCK_DRAWS, userAddress }: DrawHistoryProps) {
  if (draws.length === 0) {
    return (
      <Card variant="default" padding="md">
        <div className="text-center py-10">
          <Trophy size={32} className="text-white/20 mx-auto mb-3" />
          <p className="text-white/40 text-sm">No hay sorteos registrados aún</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {draws.map((draw) => {
        const isWinner =
          draw.status === 'completed' &&
          userAddress &&
          draw.winner.toLowerCase() === userAddress.toLowerCase();

        return (
          <Card
            key={draw.round}
            variant={isWinner ? 'glow' : 'default'}
            padding="md"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-white text-sm">Ronda #{draw.round}</h4>
                  {isWinner && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-lemon/10 border border-lemon/30 text-lemon text-[10px] font-bold uppercase">
                      <Trophy size={10} />
                      ¡Ganaste!
                    </span>
                  )}
                </div>
                <p className="text-xs text-white/40 mt-0.5">{draw.date}</p>
              </div>
              <span
                className={`text-[10px] px-2 py-1 rounded-full font-semibold uppercase tracking-wide ${
                  draw.status === 'active'
                    ? 'bg-green-500/15 text-green-400 border border-green-500/20'
                    : 'bg-white/5 text-white/40 border border-white/10'
                }`}
              >
                {draw.status === 'active' ? 'Activo' : 'Completado'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] text-white/40 uppercase mb-0.5">Premio</p>
                <p className="text-sm font-bold text-lemon">
                  ${draw.prizeUsdc.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDC
                </p>
              </div>
              <div>
                <p className="text-[10px] text-white/40 uppercase mb-0.5">Tickets</p>
                <p className="text-sm font-bold text-white">{draw.totalTickets.toLocaleString()}</p>
              </div>
            </div>

            {draw.status === 'completed' && draw.winner && (
              <div className="mt-3 pt-3 border-t border-white/5">
                <p className="text-[10px] text-white/40 uppercase mb-0.5">Ganador</p>
                <p className="text-xs font-mono text-green-400">{shortAddress(draw.winner)}</p>
              </div>
            )}
          </Card>
        );
      })}

      <p className="text-center text-xs text-white/30 pt-1">
        💡 Historial de sorteos desde la blockchain
      </p>
    </div>
  );
}
