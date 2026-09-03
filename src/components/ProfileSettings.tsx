import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Download, 
  RefreshCw, 
  Plus, 
  Footprints, 
  Globe, 
  LogOut, 
  Shield, 
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { UserProfile, ShoeItem, TrainingWeek } from '../types';

interface ProfileSettingsProps {
  user: UserProfile;
  plan: TrainingWeek[];
  onUpdateUser: (updatedUser: UserProfile) => void;
  onOpenIntegrations: () => void;
  onResetPlan: () => void;
  onLogout: () => void;
}

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  user,
  plan,
  onUpdateUser,
  onOpenIntegrations,
  onResetPlan,
  onLogout
}) => {
  const [newShoeName, setNewShoeName] = useState('');
  const [newShoeBrand, setNewShoeBrand] = useState('Nike');
  const [showAddShoe, setShowAddShoe] = useState(false);

  const handleAddShoe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newShoeName.trim()) return;

    const newShoe: ShoeItem = {
      id: `shoe_${Date.now()}`,
      name: newShoeName,
      brand: newShoeBrand,
      distanceLoggedKm: 0,
      maxDistanceKm: 600,
      isDefault: user.shoes.length === 0
    };

    onUpdateUser({
      ...user,
      shoes: [...user.shoes, newShoe]
    });

    setNewShoeName('');
    setShowAddShoe(false);
  };

  const handleDownloadCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,Week,Day,Type,Title,TargetDistanceKm,TargetPace,Description\n";
    plan.forEach(w => {
      w.workouts.forEach(wo => {
        csvContent += `${w.weekNumber},${wo.dayOfWeek},${wo.type},"${wo.title}",${wo.targetDistanceKm},"${wo.targetPace}","${wo.description}"\n`;
      });
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `StrideIQ_Plan_${user.name.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8 pb-28">
      
      {/* Header Profile Card */}
      <div className="bg-[#18181B] border border-white/5 rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 rounded-3xl object-cover border-2 border-orange-500 shadow-xl"
            referrerPolicy="no-referrer"
          />
          <div>
            <h1 className="text-2xl font-extrabold text-white font-mono tracking-tight">{user.name}</h1>
            <p className="text-xs text-gray-400 font-mono">{user.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-bold font-mono uppercase">
                {user.goal.toUpperCase()} ({user.targetDistance})
              </span>
              <span className="text-xs text-gray-400 font-mono">• VDOT {user.vdot}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onOpenIntegrations}
          className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-orange-400 font-bold text-xs font-mono transition-all flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Manage Integrations</span>
        </button>
      </div>

      {/* Shoes & Gear Tracker */}
      <div className="bg-[#18181B] border border-white/5 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
            <Footprints className="w-4 h-4 text-orange-500" />
            <span>Shoe Mileage & Wear Tracker</span>
          </h2>

          <button
            onClick={() => setShowAddShoe(!showAddShoe)}
            className="px-3.5 py-1.5 rounded-full bg-orange-500/10 hover:bg-orange-500 text-orange-400 hover:text-white font-bold text-xs font-mono transition-all flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Shoe</span>
          </button>
        </div>

        {showAddShoe && (
          <form onSubmit={handleAddShoe} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={newShoeName}
              onChange={(e) => setNewShoeName(e.target.value)}
              placeholder="e.g. Nike Alphafly 3"
              className="flex-1 p-2.5 rounded-xl bg-[#0A0A0B] border border-white/10 text-white text-xs font-mono"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-full bg-orange-500 text-white font-bold text-xs font-mono shadow-md"
            >
              Save Shoe
            </button>
          </form>
        )}

        <div className="space-y-3 font-mono text-xs">
          {user.shoes.map((shoe) => {
            const wearPercent = Math.min(100, Math.round((shoe.distanceLoggedKm / shoe.maxDistanceKm) * 100));
            return (
              <div key={shoe.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <div className="flex justify-between font-bold text-white">
                  <span>{shoe.name} ({shoe.brand})</span>
                  <span className="text-orange-400">{shoe.distanceLoggedKm} / {shoe.maxDistanceKm} {user.unitPreference}</span>
                </div>
                <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${wearPercent > 80 ? 'bg-rose-500' : 'bg-orange-500'}`} 
                    style={{ width: `${wearPercent}%` }} 
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Export & Actions */}
      <div className="bg-[#18181B] border border-white/5 rounded-3xl p-6 shadow-xl space-y-4">
        <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
          <Download className="w-4 h-4 text-orange-500" />
          <span>Export & Calendar Sync</span>
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleDownloadCSV}
            className="px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-white font-bold text-xs font-mono transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4 text-orange-500" />
            <span>Export 12-Week Plan (CSV)</span>
          </button>

          <button
            onClick={onResetPlan}
            className="px-5 py-3 rounded-full bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 font-bold text-xs font-mono transition-all"
          >
            Reset & Re-generate Plan
          </button>
        </div>
      </div>

    </div>
  );
};
