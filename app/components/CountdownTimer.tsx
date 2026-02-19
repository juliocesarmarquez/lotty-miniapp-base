'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetSeconds: number;
}

interface TimeUnits {
  d: number;
  h: number;
  m: number;
  s: number;
}

function calcUnits(diff: number): TimeUnits {
  return {
    d: Math.floor(diff / 86400),
    h: Math.floor((diff % 86400) / 3600),
    m: Math.floor((diff % 3600) / 60),
    s: diff % 60,
  };
}

export function CountdownTimer({ targetSeconds }: CountdownTimerProps) {
  const [endTime] = useState(() => Math.floor(Date.now() / 1000) + targetSeconds);
  const [units, setUnits] = useState<TimeUnits | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const tick = () => {
      const diff = endTime - Math.floor(Date.now() / 1000);
      if (diff <= 0) {
        setDone(true);
        setUnits({ d: 0, h: 0, m: 0, s: 0 });
        return;
      }
      setUnits(calcUnits(diff));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endTime]);

  if (done) {
    return (
      <p className="text-lemon font-bold text-lg text-center">🎉 Draw Ready!</p>
    );
  }

  if (!units) return null;

  const blocks: { label: string; value: number }[] = [
    { label: 'D', value: units.d },
    { label: 'H', value: units.h },
    { label: 'M', value: units.m },
    { label: 'S', value: units.s },
  ];

  return (
    <div className="flex items-center justify-center gap-2">
      {blocks.map(({ label, value }, i) => (
        <div key={label} className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <span className="font-mono font-bold text-2xl text-white tabular-nums w-10 text-center">
              {String(value).padStart(2, '0')}
            </span>
            <span className="text-[10px] text-white/40 uppercase tracking-widest">{label}</span>
          </div>
          {i < blocks.length - 1 && (
            <span className="text-white/30 font-bold text-xl mb-3">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
