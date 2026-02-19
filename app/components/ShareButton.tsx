'use client';

interface ShareButtonProps {
  address: string;
}

// Mock stats para compartir
const mockShareStats = {
  tickets: 3,
  streak: 5,
};

export function ShareButton({ address }: ShareButtonProps) {
  const handleShare = () => {
    const text =
      `🎰 I'm playing Lotty - the no-loss lottery!\n\n` +
      `🎟️ ${mockShareStats.tickets} tickets\n` +
      `🔥 ${mockShareStats.streak} week streak\n\n` +
      `Join me and win prizes without risking your principal!`;

    // En producción, esto podría usar Web Share API o Farcaster
    if (navigator.share) {
      navigator.share({
        title: 'Lotty - No-Loss Lottery',
        text: text,
      }).catch(() => {
        // Fallback a alert si share falla
        alert(`Share:\n\n${text}\n\nIn production, this would share to Farcaster or other platforms.`);
      });
    } else {
      // Fallback: copiar al clipboard o mostrar alert
      navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!\n\nIn production, this would share to Farcaster.');
      }).catch(() => {
        alert(`Share:\n\n${text}\n\nIn production, this would share to Farcaster or other platforms.`);
      });
    }
  };

  return (
    <button
      onClick={handleShare}
      className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
    >
      <span>📣</span>
      Share on Farcaster
    </button>
  );
}
