'use client';

import { useState } from 'react';
import { Copy, Check, Wallet } from 'lucide-react';
import { Card } from '@/app/components/ui/Card';
import { Button } from '@/app/components/ui/Button';
import { StatCard } from '@/app/components/StatCard';

interface YourProfileProps {
  address: string;
  totalBalance: number;
  usdInPool: number;
  activeTickets: number;
  currentAPY: number;
  usdcBalance: number;
  onMintUsdc?: () => void;
  isMinting?: boolean;
  contractsReady?: boolean;
}

export function YourProfile({
  address,
  totalBalance,
  usdInPool,
  activeTickets,
  currentAPY,
  usdcBalance,
  onMintUsdc,
  isMinting = false,
  contractsReady = false,
}: YourProfileProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shortAddr = `${address.slice(0, 6)}...${address.slice(-4)}`;
  const weeklyYield = ((usdInPool * (currentAPY / 100)) / 52).toFixed(2);

  return (
    <div className="space-y-4">
      {/* Wallet card */}
      <Card variant="default" padding="md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-lemon/20 border border-lemon/30 flex items-center justify-center shrink-0">
            <Wallet size={18} className="text-lemon" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-white/40 mb-0.5">Wallet</p>
            <p className="text-sm font-mono text-white truncate">{shortAddr}</p>
          </div>
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            {copied ? (
              <Check size={14} className="text-green-400" />
            ) : (
              <Copy size={14} className="text-white/50" />
            )}
          </button>
        </div>
      </Card>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          icon="💰"
          label="Balance Total"
          value={`$${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          variant="yellow"
        />
        <StatCard
          icon="🏊"
          label="En Pool"
          value={`$${usdInPool.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
        />
        <StatCard
          icon="🎟"
          label="Tickets Activos"
          value={activeTickets.toLocaleString()}
        />
        <StatCard
          icon="📈"
          label="APY Actual"
          value={`${currentAPY.toFixed(1)}%`}
          variant="yellow"
        />
      </div>

      {/* USDC balance + faucet */}
      <Card variant="default" padding="md">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-white/40">Saldo USDC</p>
            <p className="text-xl font-bold text-white">${usdcBalance.toLocaleString()} USDC</p>
          </div>
          {usdcBalance < 100 && onMintUsdc && (
            <Button
              variant="secondary"
              size="sm"
              loading={isMinting}
              onClick={onMintUsdc}
              disabled={!contractsReady}
            >
              🪙 Get 1000 Test USDC
            </Button>
          )}
        </div>
        {!contractsReady && (
          <p className="text-xs text-white/30">Los contratos no están disponibles en esta red</p>
        )}
      </Card>

      {/* Account stats */}
      <Card variant="default" padding="md">
        <h3 className="text-sm font-bold text-white mb-3">Estadísticas de Cuenta</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Total depositado</span>
            <span className="text-white font-semibold">${usdInPool.toLocaleString()} USDC</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Yield estimado semanal</span>
            <span className="text-lemon font-semibold">${weeklyYield} USDC</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/50">Red</span>
            <span className="text-base-blue font-semibold">Base Mainnet</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
