'use client';

interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  variant?: 'default' | 'yellow';
}

export function StatCard({ icon, label, value, variant = 'default' }: StatCardProps) {
  return (
    <div
      className={`rounded-xl p-4 flex flex-col gap-1 ${
        variant === 'yellow' ? 'neo-card-yellow' : 'neo-card'
      }`}
    >
      <span className="text-2xl">{icon}</span>
      <p
        className={`text-xl font-bold leading-tight ${
          variant === 'yellow' ? 'text-gradient-lemon' : 'text-white'
        }`}
      >
        {value}
      </p>
      <p className="text-xs text-white/50">{label}</p>
    </div>
  );
}
