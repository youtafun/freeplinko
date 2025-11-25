import React, { useState, useCallback } from 'react';
import { Settings, RefreshCw, DollarSign, Wallet, AlertCircle } from 'lucide-react';
import GameCanvas from '../components/GameCanvas';
import { Ball, PlinkoSettings, RiskLevel, HistoryItem } from '../types';
import { CANVAS_WIDTH } from '../constants';

const Game: React.FC = () => {
  const [balance, setBalance] = useState(1000.00);
  const [balls, setBalls] = useState<Ball[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  
  const [settings, setSettings] = useState<PlinkoSettings>({
    rows: 16,
    risk: RiskLevel.MEDIUM,
    betAmount: 10,
  });

  const handleDrop = useCallback(() => {
    if (balance < settings.betAmount) {
      alert("Insufficient balance!");
      return;
    }

    setBalance(prev => prev - settings.betAmount);

    // Random slight horizontal offset for start position so it doesn't fall exactly same way every time
    const startX = CANVAS_WIDTH / 2 + (Math.random() - 0.5) * 10;

    const newBall: Ball = {
      id: Math.random().toString(36).substr(2, 9),
      x: startX,
      y: 50,
      vx: 0,
      vy: 0,
      radius: 7,
      color: '#f472b6', // pink-400
      restitution: 0.5,
      active: true,
      value: settings.betAmount,
    };

    setBalls(prev => [...prev, newBall]);
  }, [balance, settings.betAmount]);

  const handleBallFinish = useCallback((ball: Ball, multiplier: number) => {
    // Determine payout
    const payout = ball.value * multiplier;
    
    setBalance(prev => prev + payout);
    
    setHistory(prev => {
      const newItem: HistoryItem = {
        id: ball.id,
        multiplier,
        bet: ball.value,
        payout,
        timestamp: Date.now()
      };
      return [newItem, ...prev].slice(0, 10); // Keep last 10
    });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] overflow-hidden bg-slate-950">
      {/* Left Sidebar - Controls */}
      <div className="w-full lg:w-96 bg-slate-900 border-r border-white/10 p-6 flex flex-col gap-6 overflow-y-auto z-20 shadow-2xl">
        <div className="bg-slate-800 p-4 rounded-xl border border-white/5 shadow-inner">
           <label className="text-xs text-slate-400 font-bold uppercase mb-1 block">Current Balance</label>
           <div className="flex items-center gap-2 text-2xl font-mono text-green-400 font-bold">
             <Wallet className="w-6 h-6" />
             ${balance.toFixed(2)}
           </div>
        </div>

        {/* Controls Form */}
        <div className="space-y-6">
          
          {/* Bet Amount */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-bold text-slate-300">Bet Amount</label>
              <span className="text-xs text-slate-500">Min: 0.10 - Max: 100.00</span>
            </div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                <DollarSign size={16} />
              </div>
              <input 
                type="number" 
                value={settings.betAmount}
                onChange={(e) => setSettings({...settings, betAmount: Math.max(0.1, Number(e.target.value))})}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg py-3 pl-10 pr-4 focus:ring-2 focus:ring-pink-500 focus:outline-none transition-all font-mono"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                <button onClick={() => setSettings(s => ({...s, betAmount: s.betAmount / 2}))} className="px-2 py-1 text-xs bg-slate-800 hover:bg-slate-700 rounded text-slate-300">½</button>
                <button onClick={() => setSettings(s => ({...s, betAmount: s.betAmount * 2}))} className="px-2 py-1 text-xs bg-slate-800 hover:bg-slate-700 rounded text-slate-300">2x</button>
              </div>
            </div>
          </div>

          {/* Risk Level */}
          <div>
            <label className="text-sm font-bold text-slate-300 mb-2 block">Risk Level</label>
            <div className="grid grid-cols-3 gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
              {(['LOW', 'MEDIUM', 'HIGH'] as RiskLevel[]).map((level) => (
                <button
                  key={level}
                  onClick={() => setSettings({...settings, risk: level})}
                  className={`py-2 text-xs font-bold rounded-md transition-all ${
                    settings.risk === level 
                      ? 'bg-gradient-to-br from-pink-500 to-violet-600 text-white shadow-lg' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Rows */}
          <div>
            <label className="text-sm font-bold text-slate-300 mb-2 block">Rows: {settings.rows}</label>
            <div className="grid grid-cols-3 gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
               {[8, 12, 16].map((rowNum) => (
                 <button
                   key={rowNum}
                   onClick={() => setSettings({...settings, rows: rowNum})}
                   className={`py-2 text-xs font-bold rounded-md transition-all ${
                     settings.rows === rowNum 
                       ? 'bg-slate-700 text-white border border-slate-500' 
                       : 'text-slate-400 hover:text-white hover:bg-slate-800'
                   }`}
                 >
                   {rowNum}
                 </button>
               ))}
            </div>
          </div>

          <button 
            onClick={handleDrop}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-black text-lg shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transform active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            PLAY
          </button>

        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex-1 relative bg-[#0f172a] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black opacity-80 pointer-events-none"></div>
        
        <div className="relative w-full max-w-[800px] aspect-[4/3] bg-slate-900/50 rounded-2xl border border-white/5 backdrop-blur-sm shadow-2xl overflow-hidden">
           <GameCanvas 
             balls={balls} 
             setBalls={setBalls} 
             settings={settings}
             onBallFinish={handleBallFinish}
           />
        </div>
      </div>

      {/* Right Sidebar - History/Stats (Hidden on mobile usually, simplified here) */}
      <div className="hidden xl:block w-72 bg-slate-900 border-l border-white/10 p-6 overflow-y-auto">
        <h3 className="flex items-center gap-2 font-bold text-slate-300 mb-6">
          <RefreshCw size={16} /> History
        </h3>
        
        <div className="space-y-2">
          {history.length === 0 && (
             <div className="text-center text-slate-600 py-10 italic text-sm">No games played yet</div>
          )}
          {history.map((item) => (
            <div key={item.id} className="bg-slate-800/50 rounded-lg p-3 flex justify-between items-center border border-white/5 animate-in slide-in-from-right-2">
              <div>
                <div className={`text-sm font-bold ${item.payout >= item.bet ? 'text-green-400' : 'text-slate-400'}`}>
                  {item.multiplier}x
                </div>
                <div className="text-xs text-slate-500">
                  Bet: ${item.bet.toFixed(2)}
                </div>
              </div>
              <div className={`font-mono font-bold ${item.payout >= item.bet ? 'text-green-400' : 'text-slate-500'}`}>
                +${item.payout.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;