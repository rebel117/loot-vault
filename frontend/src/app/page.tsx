<<<<<<< HEAD
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">🎮 Loot Vault</h1>
        <p className="text-xl text-gray-300 mb-8">
          A Gamified DeFi Ecosystem & Decentralized Job Board built on Stellar Soroban
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-cyan-500 p-6">
            <h2 className="text-2xl font-bold mb-3 text-cyan-400">🎰 Loot Vault Protocol</h2>
            <p className="text-gray-300">
              No-loss yield pools where users deposit XLM and winners are drawn to receive accumulated yield.
            </p>
          </div>

          <div className="border border-magenta-500 p-6">
            <h2 className="text-2xl font-bold mb-3 text-magenta-400">⚔️ Mercenary Board</h2>
            <p className="text-gray-300">
              Trustless escrow for freelancers with milestone-based fund releases and dispute resolution.
            </p>
          </div>
        </div>

        <div className="mt-8 p-6 border border-gray-600">
          <h3 className="text-lg font-semibold mb-4">📊 Tech Stack</h3>
          <ul className="grid grid-cols-2 gap-4 text-sm text-gray-300">
            <li>✅ Rust / Soroban Contracts</li>
            <li>✅ Next.js 16 Frontend</li>
            <li>✅ Stellar Network</li>
            <li>✅ Freighter Wallet</li>
            <li>✅ Axum Backend</li>
            <li>✅ TypeScript</li>
          </ul>
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://github.com/godamongstmen897/loot-vault"
            className="inline-block px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded border border-cyan-500"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </main>
  )
=======
'use client';

import CountdownTimer from '../components/CountdownTimer';

export default function Home() {
  // Demo: draw ends in 2 hours, 34 minutes from now
  const now = Date.now();
  const endTime = now + (2 * 3600 + 34 * 60) * 1000;
  const startTime = now;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-12 p-8">
      <h1 className="text-2xl font-mono tracking-widest text-cyan-400/80 uppercase">
        Loot Vault
      </h1>

      <CountdownTimer
        endTime={endTime}
        startTime={startTime}
        size={240}
        strokeWidth={10}
      />

      <div className="flex flex-wrap justify-center gap-8 mt-8">
        {/* Small variant */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-500 font-mono">Small (mobile)</span>
          <CountdownTimer
            endTime={endTime}
            startTime={startTime}
            size={140}
            strokeWidth={6}
          />
        </div>

        {/* Urgent demo: ends in 8 seconds */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-500 font-mono">Urgent (8s left)</span>
          <CountdownTimer
            endTime={Date.now() + 8000}
            startTime={Date.now() - 2000}
            size={140}
            strokeWidth={6}
            label="ENDING SOON"
          />
        </div>

        {/* Finished demo */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-500 font-mono">Finished</span>
          <CountdownTimer
            endTime={Date.now() - 5000}
            startTime={Date.now() - 60000}
            size={140}
            strokeWidth={6}
            label="COMPLETED"
          />
        </div>
      </div>

      <p className="text-xs text-gray-600 font-mono mt-4">
        Countdown timer demo — props: endTime, startTime, size, strokeWidth, label
      </p>
    </main>
  );
>>>>>>> 343a335 (feat: add countdown timer widget with SVG progress ring and glow effects)
}
