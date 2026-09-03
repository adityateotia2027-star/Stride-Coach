import React, { useState } from 'react';
import { 
  Flag, 
  Clock, 
  Flame, 
  ShieldCheck, 
  ChevronRight, 
  Droplet, 
  Zap, 
  Printer,
  Sparkles
} from 'lucide-react';
import { UserProfile } from '../types';
import { HYROX_STATIONS_INFO } from '../data/initialData';

interface RacePlannerProps {
  user: UserProfile;
}

export const RacePlanner: React.FC<RacePlannerProps> = ({ user }) => {
  const [pacingStrategy, setPacingStrategy] = useState<'negative' | 'even' | 'conservative'>('negative');

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 pb-28">
      
      {/* Header */}
      <div className="bg-[#18181B] border border-white/5 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold font-mono uppercase">
              RACE DAY EXECUTION
            </span>
            <span className="text-xs text-gray-400 font-mono">
              Target: {user.targetFinishTime || '1:12:00'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
            {user.raceName || 'HYROX World Championship'} Strategy
          </h1>
        </div>

        <button 
          onClick={() => window.print()}
          className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-white font-bold text-xs transition-all flex items-center gap-2 font-mono"
        >
          <Printer className="w-4 h-4 text-orange-400" />
          <span>Print Pace Band</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* HYROX Station Target Breakdown (Col Span 7) */}
        <div className="lg:col-span-7 bg-[#18181B] border border-white/5 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-500" />
              <span>HYROX Station Pacing & Roxzone Strategy</span>
            </h2>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {HYROX_STATIONS_INFO.map((st, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white flex items-center gap-2">
                    <span className="text-orange-400 font-bold">Station {i+1}:</span>
                    <span>{st.name} ({st.distanceOrReps})</span>
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{st.tips}</div>
                </div>

                <div className="text-right pl-3">
                  <div className="text-sm font-bold text-amber-400">{st.targetTimeMin} min</div>
                  <div className="text-[9px] uppercase text-gray-500">Target</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nutrition & Gel Timing Matrix (Col Span 5) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-[#18181B] border border-white/5 rounded-3xl p-6 shadow-xl space-y-4">
            <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Droplet className="w-4 h-4 text-orange-500" />
              <span>Race Nutrition & Hydration Protocol</span>
            </h2>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
                <div className="font-bold text-orange-400">T-3 Hours Pre-Race</div>
                <div className="text-[11px] text-gray-300">Carb meal: Oats + Banana + 500ml Electrolytes</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
                <div className="font-bold text-amber-400">T-15 Mins Warmup</div>
                <div className="text-[11px] text-gray-300">1 Hydrogel (25g Carbs) + 200ml water</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
                <div className="font-bold text-emerald-400">Station 4 (Burpee Broad Jumps)</div>
                <div className="text-[11px] text-gray-300">Sip 100ml water in Roxzone water station</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
                <div className="font-bold text-blue-400">Station 6 (Farmers Carry)</div>
                <div className="text-[11px] text-gray-300">Caffeine Gel (30g Carbs) + Salt tab for final kick</div>
              </div>
            </div>
          </div>

          {/* Printable Wrist Band Preview */}
          <div className="bg-[#18181B] border border-white/5 rounded-3xl p-6 shadow-xl space-y-3 text-center">
            <h3 className="text-xs font-bold text-white font-mono uppercase">Race Day Wrist Pace Band</h3>
            
            <div className="p-3 rounded-2xl bg-amber-400 text-black font-mono text-[10px] font-bold tracking-widest uppercase">
              1K: 4:30 | 2K: 9:00 | SLED: 11:30 | 5K: 22:30 | FINISH: 1:08:00
            </div>

            <p className="text-[10px] text-gray-400 font-mono">
              Designed to fit standard paper wristband dimensions for race day wearing.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
