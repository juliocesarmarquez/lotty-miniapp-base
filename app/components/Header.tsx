'use client';

interface HeaderProps {
  walletAddress?: string;
}

export function Header({ walletAddress }: HeaderProps) {
  const shortAddress = walletAddress
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : null;

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-white/5">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img
          src="/lotty200x200.png"
          alt="Lotty icon"
          className="h-9 w-9 object-contain"
        />
      </div>

      <div className="flex items-center gap-2">
        {/* Base chain badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-base-blue/20 border border-base-blue/30">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#0052FF"/>
            <path
              d="M12.001 4.8C8.028 4.8 4.8 8.028 4.8 12.001c0 3.973 3.228 7.2 7.201 7.2 3.694 0 6.75-2.778 7.163-6.363H12.6V11.36h7.543c.057.421.057.84 0 1.264-.413 4.384-4.17 7.776-8.142 7.776C7.25 20.4 3.6 16.75 3.6 12.001 3.6 7.25 7.25 3.6 12.001 3.6c2.362 0 4.5.917 6.085 2.413l-1.518 1.518A5.996 5.996 0 0012.001 5.4z"
              fill="white"
            />
          </svg>
          <span className="text-xs font-semibold text-base-blue">Base</span>
        </div>

        {/* Wallet address pill */}
        {shortAddress && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <div className="w-2 h-2 rounded-full bg-lemon" />
            <span className="text-xs font-mono text-white/70">{shortAddress}</span>
          </div>
        )}
      </div>
    </header>
  );
}
