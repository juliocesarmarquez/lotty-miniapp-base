'use client';

import { LottyDashboard } from '~/components/LottyDashboard';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <LottyDashboard />
      </div>
    </main>
  );
}
