'use client';

import { useState } from 'react';
import { Coins } from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { Card } from '@/app/components/ui/Card';

interface DepositFormProps {
  onDeposit: (amount: number) => Promise<void>;
  onWithdraw: () => Promise<void>;
  isLoading: boolean;
  isParticipating: boolean;
  usdcBalance: number;
}

const PRESETS = [10, 50, 100, 500];

export function DepositForm({
  onDeposit,
  onWithdraw,
  isLoading,
  isParticipating,
  usdcBalance,
}: DepositFormProps) {
  const [inputValue, setInputValue] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);

  const amount = selectedPreset ?? (inputValue ? parseFloat(inputValue) : 0);
  const tickets = Math.floor(amount / 10);
  const isValid = amount > 0 && amount <= usdcBalance;

  const handlePreset = (value: number) => {
    setSelectedPreset(value);
    setInputValue('');
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPreset(null);
    setInputValue(e.target.value);
  };

  const handleDeposit = async () => {
    if (!isValid) return;
    await onDeposit(amount);
  };

  return (
    <div className="space-y-4">
      <Card variant="default" padding="md">
        {/* Balance */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Coins size={16} className="text-lemon" />
            <span className="text-sm font-semibold text-white">Depositar USDC</span>
          </div>
          <span className="text-xs text-white/50">
            Saldo:{' '}
            <span className="text-white font-semibold">
              ${usdcBalance.toLocaleString()} USDC
            </span>
          </span>
        </div>

        {/* Presets */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {PRESETS.map((preset) => (
            <button
              key={preset}
              onClick={() => handlePreset(preset)}
              className={`py-2 rounded-xl text-sm font-bold transition-all ${
                selectedPreset === preset
                  ? 'bg-lemon text-black'
                  : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10'
              }`}
            >
              ${preset}
            </button>
          ))}
        </div>

        {/* Custom input */}
        <div className="relative mb-4">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 font-bold">$</span>
          <input
            type="number"
            min={0}
            max={usdcBalance}
            value={inputValue}
            onChange={handleInput}
            placeholder="Monto personalizado"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-8 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-lemon/40 transition-colors"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 text-xs">USDC</span>
        </div>

        {/* Ticket estimate */}
        {amount > 0 && (
          <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-lemon/5 border border-lemon/10 mb-4">
            <span className="text-xs text-white/50">Tickets a recibir</span>
            <span className="text-sm font-bold text-lemon">
              🎟 {tickets} ticket{tickets !== 1 ? 's' : ''}
            </span>
          </div>
        )}

        <Button
          variant="primary"
          size="lg"
          loading={isLoading}
          disabled={!isValid}
          onClick={handleDeposit}
          className="w-full"
        >
          Depositar
        </Button>

        {amount > usdcBalance && (
          <p className="text-center text-xs text-red-400 mt-2">
            Saldo insuficiente
          </p>
        )}
      </Card>

      {/* Withdrawal section */}
      {isParticipating && (
        <Card variant="outline" padding="md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Tu Participación</p>
              <p className="text-xs text-white/50 mt-0.5">
                Retira en cualquier momento, sin penalización
              </p>
            </div>
            <Button
              variant="secondary"
              size="sm"
              loading={isLoading}
              onClick={onWithdraw}
            >
              Retirar
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
