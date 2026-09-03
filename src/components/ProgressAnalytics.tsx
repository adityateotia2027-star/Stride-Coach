import React from 'react';
import { 
  TrendingUp, 
  Activity, 
  Trophy, 
  Flame, 
  Zap, 
  Heart, 
  Clock, 
  Calculator,
  ChevronRight
} from 'lucide-react';
import { UserProfile } from '../types';

interface ProgressAnalyticsProps {
  user: UserProfile;
}

export const ProgressAnalytics: React.FC<ProgressAnalyticsProps> = ({ user }) => {
  // Sample pace zones computed from user VDOT
  const easyZone = `${user.currentEasyPace} - 6:00`;
  const marathonZone = `${user.targetPace}`;
  const thresholdZone = "4:20 - 4:35";
  const intervalZone = "3:55 - 4:10";

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 pb-28">
      
      {/* Header */}
      <div className="bg-[#18181B] border border-white/5 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold font-mono uppercase">
              VDOT FITNESS SCORE: {user.vdot}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
            Performance & VDOT Analytics
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 text-right font-mono">
            <div className="text-[10px] text-gray-400 uppercase">Estimated VDOT</div>
            <div className="text-xl font-bold text-orange-400">{user.vdot}</div>
          </div>
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Race Time Predictor Table (Col Span 7) */}
        <div className="lg:col-span-7 bg-[#18181B] border border-white/5 rounded-3xl p-6 shadow-xl space-y-6">
          <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
            <Calculator className="w-4 h-4 text-orange-500" />
            <span>VDOT Race Finish Time Predictor</span>
          </h2>

          <div className="rounded-2xl border border-white/5 overflow-hidden font-mono text-xs">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-gray-400 text-[10px] uppercase">
                <tr>
                  <th className="p-3">Distance</th>
                  <th className="p-3">Estimated Finish</th>
                  <th className="p-3">Avg Pace</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-200">
                <tr className="hover:bg-white/5">
                  <td className="p-3 font-bold text-white">5K</td>
                  <td className="p-3 text-orange-400 font-bold">20:45</td>
                  <td className="p-3 text-gray-400">4:09 /km</td>
                </tr>
                <tr className="hover:bg-white/5">
                  <td className="p-3 font-bold text-white">10K</td>
                  <td className="p-3 text-orange-400 font-bold">43:10</td>
                  <td className="p-3 text-gray-400">4:19 /km</td>
                </tr>
                <tr className="hover:bg-white/5 bg-orange-500/5">
                  <td className="p-3 font-bold text-white">Half Marathon</td>
                  <td className="p-3 text-orange-400 font-bold">1:35:20</td>
                  <td className="p-3 text-gray-400">4:31 /km</td>
                </tr>
                <tr className="hover:bg-white/5">
                  <td className="p-3 font-bold text-white">Marathon</td>
                  <td className="p-3 text-orange-400 font-bold">3:18:45</td>
                  <td className="p-3 text-gray-400">4:42 /km</td>
                </tr>
                <tr className="hover:bg-white/5">
                  <td className="p-3 font-bold text-white">HYROX Open</td>
                  <td className="p-3 text-amber-400 font-bold">1:08:30</td>
                  <td className="p-3 text-gray-400">100% Target Station</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Pace Zones Matrix (Col Span 5) */}
        <div className="lg:col-span-5 bg-[#18181B] border border-white/5 rounded-3xl p-6 shadow-xl space-y-6">
          <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4 text-orange-500" />
            <span>Target Training Pace Zones</span>
          </h2>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
              <div>
                <div className="font-bold text-emerald-400">Zone 2 Easy / Base</div>
                <div className="text-[10px] text-gray-400">Aerobic capacity</div>
              </div>
              <div className="font-bold text-white">{easyZone} /{user.unitPreference}</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
              <div>
                <div className="font-bold text-blue-400">Marathon Pace (M-Pace)</div>
                <div className="text-[10px] text-gray-400">Specific race rhythm</div>
              </div>
              <div className="font-bold text-white">{marathonZone} /{user.unitPreference}</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
              <div>
                <div className="font-bold text-amber-400">Threshold (T-Pace)</div>
                <div className="text-[10px] text-gray-400">Lactate clearance</div>
              </div>
              <div className="font-bold text-white">{thresholdZone} /{user.unitPreference}</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
              <div>
                <div className="font-bold text-rose-400">Interval (I-Pace)</div>
                <div className="text-[10px] text-gray-400">VO2 Max stimulus</div>
              </div>
              <div className="font-bold text-white">{intervalZone} /{user.unitPreference}</div>
            </div>
          </div>
        </div>

      </div>

      {/* Personal Records Wall */}
      <div className="bg-[#18181B] border border-white/5 rounded-3xl p-6 shadow-xl space-y-4">
        <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
          <Trophy className="w-4 h-4 text-orange-500" />
          <span>Personal Bests & Station Records</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="text-[10px] text-gray-400 uppercase">5K Personal Best</div>
            <div className="text-xl font-bold text-white">21:15</div>
            <div className="text-[10px] text-orange-400 mt-1">4:15 /km</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="text-[10px] text-gray-400 uppercase">10K Personal Best</div>
            <div className="text-xl font-bold text-white">44:30</div>
            <div className="text-[10px] text-orange-400 mt-1">4:27 /km</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="text-[10px] text-gray-400 uppercase">Sled Push 152kg</div>
            <div className="text-xl font-bold text-amber-400">2:18 min</div>
            <div className="text-[10px] text-gray-400 mt-1">4 x 12.5m</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className="text-[10px] text-gray-400 uppercase">100 Wallballs</div>
            <div className="text-xl font-bold text-amber-400">4:45 min</div>
            <div className="text-[10px] text-gray-400 mt-1">6kg Unbroken Sets</div>
          </div>
        </div>
      </div>

    </div>
  );
};
