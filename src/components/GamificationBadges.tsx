import React from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, 
  Trophy, 
  Zap, 
  Flame, 
  Share2, 
  Milestone, 
  CheckCircle2, 
  Users,
  Sparkles
} from 'lucide-react';
import { UserProfile, BadgeItem } from '../types';
import { BADGES_CATALOG } from '../data/initialData';

interface GamificationBadgesProps {
  user: UserProfile;
}

export const GamificationBadges: React.FC<GamificationBadgesProps> = ({ user }) => {
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF5500', '#FFB700', '#00FF66', '#FFFFFF']
    });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 pb-28">
      
      {/* Header */}
      <div className="bg-[#18181B] border border-white/5 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold font-mono uppercase flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
              <span>{user.streakDays}-DAY ACTIVE STREAK</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
            Achievements & Leaderboard
          </h1>
        </div>

        <button
          onClick={triggerConfetti}
          className="px-5 py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-lg shadow-orange-500/20 transition-all flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Celebrate Progress</span>
        </button>
      </div>

      {/* Badges Grid */}
      <div className="bg-[#18181B] border border-white/5 rounded-3xl p-6 shadow-xl space-y-4">
        <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4 h-4 text-orange-500" />
          <span>Unlocked Badges Catalog</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BADGES_CATALOG.map((b) => {
            const isUnlocked = b.progressPercent >= 100;
            return (
              <div
                key={b.id}
                onClick={triggerConfetti}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                  isUnlocked
                    ? 'bg-white/5 border-orange-500/30 hover:border-orange-500'
                    : 'bg-white/5 border-white/5 opacity-60'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  isUnlocked
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                    : 'bg-white/5 text-gray-500'
                }`}>
                  <Trophy className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white font-mono">{b.title}</h3>
                    {isUnlocked && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{b.description}</p>
                  
                  {!isUnlocked && (
                    <div className="pt-2">
                      <div className="flex justify-between text-[10px] text-gray-400 font-mono mb-1">
                        <span>Progress</span>
                        <span>{b.progressPercent}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 rounded-full" style={{ width: `${b.progressPercent}%` }} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-[#18181B] border border-white/5 rounded-3xl p-6 shadow-xl space-y-4">
        <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
          <Users className="w-4 h-4 text-orange-500" />
          <span>HYROX & Runner Community Distance Ladder</span>
        </h2>

        <div className="rounded-2xl border border-white/5 overflow-hidden font-mono text-xs">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-gray-400 text-[10px] uppercase">
              <tr>
                <th className="p-3">Rank</th>
                <th className="p-3">Athlete</th>
                <th className="p-3">Focus</th>
                <th className="p-3">Weekly Distance</th>
                <th className="p-3">Streak</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-200">
              <tr className="bg-orange-500/10">
                <td className="p-3 font-bold text-amber-400">#1</td>
                <td className="p-3 font-bold text-white flex items-center gap-2">
                  <span>{user.name}</span>
                  <span className="px-1.5 py-0.5 rounded bg-orange-500 text-white text-[9px]">YOU</span>
                </td>
                <td className="p-3 text-orange-400 uppercase font-bold">{user.goal}</td>
                <td className="p-3 font-bold text-white">42.8 km</td>
                <td className="p-3 text-emerald-400 font-bold">{user.streakDays} Days</td>
              </tr>
              <tr className="hover:bg-white/5">
                <td className="p-3 font-bold text-gray-400">#2</td>
                <td className="p-3 font-bold text-white">Marcus Vance</td>
                <td className="p-3 text-gray-400">HYROX Pro</td>
                <td className="p-3 font-bold text-white">38.5 km</td>
                <td className="p-3 text-emerald-400">12 Days</td>
              </tr>
              <tr className="hover:bg-white/5">
                <td className="p-3 font-bold text-gray-400">#3</td>
                <td className="p-3 font-bold text-white">Elena Rostova</td>
                <td className="p-3 text-gray-400">Marathon</td>
                <td className="p-3 font-bold text-white">35.2 km</td>
                <td className="p-3 text-emerald-400">9 Days</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
