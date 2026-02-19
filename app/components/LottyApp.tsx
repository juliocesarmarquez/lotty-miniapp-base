'use client';

import { useState } from 'react';
import { Header } from '@/app/components/Header';
import { StatsPanel } from '@/app/components/StatsPanel';
import { DepositForm } from '@/app/components/DepositForm';
import { DrawHistory } from '@/app/components/DrawHistory';
import { TicketList } from '@/app/components/TicketList';
import { YourProfile } from '@/app/views/YourProfile';
import { Button } from '@/app/components/ui/Button';

type Tab = 'deposit' | 'tickets' | 'history' | 'profile';

const MOCK_ADDRESS = '0x1234567890123456789012345678901234567890';

const MOCK_STATS = {
  prizePool: 3250.75,
  totalDeposits: 82000,
  participantCount: 1420,
  timeUntilDraw: 2 * 86400 + 5 * 3600 + 30 * 60,
};

const MOCK_PROFILE = {
  totalBalance: 575.0,
  usdInPool: 75.0,
  activeTickets: 7,
  currentAPY: 4.2,
  usdcBalance: 500,
};

const TAB_LABELS: Record<Tab, string> = {
  deposit: '💵 Depositar',
  tickets: '🎟 Tickets',
  history: '📜 Historial',
  profile: '👤 Perfil',
};

function WelcomeScreen({ onConnect }: { onConnect: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <img
        src="/lotty200x200.png"
        alt="Lotty icon"
        className="h-24 w-24 object-contain mb-4 animate-bounce-mascot"
      />
      <img
        src="/lottybase.png"
        alt="Lotty on Base"
        className="h-20 w-auto object-contain mb-2 animate-walk-mascot"
      />
      <p className="text-white/60 text-sm mb-2">
        La lotería sin pérdidas en Base
      </p>
      <p className="text-white/40 text-xs mb-8 max-w-xs">
        Deposita USDC, gana tickets, y participa por el premio semanal. Tu capital siempre está seguro.
      </p>
      <Button variant="primary" size="lg" onClick={onConnect}>
        Conectar Wallet
      </Button>
      <p className="text-white/20 text-xs mt-4">Demo UI · datos simulados</p>
    </div>
  );
}

function TabBar({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  return (
    <div className="flex gap-1 p-1 rounded-2xl bg-white/5 border border-white/10">
      {(Object.keys(TAB_LABELS) as Tab[]).map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`flex-1 py-2 px-1 rounded-xl text-xs font-semibold transition-all ${
            active === tab
              ? 'bg-lemon text-black shadow-sm'
              : 'text-white/50 hover:text-white'
          }`}
        >
          {TAB_LABELS[tab]}
        </button>
      ))}
    </div>
  );
}

export function LottyApp() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('deposit');
  const [isLoading, setIsLoading] = useState(false);
  const [isParticipating, setIsParticipating] = useState(false);

  const handleConnect = () => {
    setIsConnected(true);
    setAddress(MOCK_ADDRESS);
  };

  const handleDeposit = async (amount: number) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsParticipating(true);
    setIsLoading(false);
    alert(`✅ Mock: Depositarías $${amount} USDC`);
  };

  const handleWithdraw = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsParticipating(false);
    setIsLoading(false);
    alert('✅ Mock: Retiro completado');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-dark text-white">
      {/* Decorative background */}
      <div className="fixed inset-0 grid-pattern pointer-events-none" />
      <div className="fixed top-20 left-10 w-72 h-72 bg-lemon/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-base-blue/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header walletAddress={address ?? undefined} />

        {!isConnected ? (
          <WelcomeScreen onConnect={handleConnect} />
        ) : (
          <div className="px-4 pt-4 pb-8 max-w-lg mx-auto w-full space-y-4">
            <StatsPanel {...MOCK_STATS} />

            <TabBar active={activeTab} onChange={setActiveTab} />

            {activeTab === 'deposit' && (
              <DepositForm
                onDeposit={handleDeposit}
                onWithdraw={handleWithdraw}
                isLoading={isLoading}
                isParticipating={isParticipating}
                usdcBalance={MOCK_PROFILE.usdcBalance}
              />
            )}
            {activeTab === 'tickets' && <TicketList address={address!} />}
            {activeTab === 'history' && (
              <DrawHistory userAddress={address ?? undefined} />
            )}
            {activeTab === 'profile' && (
              <YourProfile address={address!} {...MOCK_PROFILE} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
