import React from 'react';
import { 
  Flame, 
  Flag, 
  Calendar, 
  CheckCircle2, 
  Share2, 
  Sparkles, 
  TrendingUp, 
  Activity, 
  Clock, 
  Zap, 
  Play, 
  Dumbbell, 
  Award,
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { UserProfile, TrainingWeek, WorkoutItem, ActiveView } from '../types';

interface DashboardProps {
  user: UserProfile;
  plan: TrainingWeek[];
  onNavigate: (view: ActiveView) => void;
  onOpenWorkoutModal: (workout: WorkoutItem) => void;
  onOpenShareStudio: (workout?: WorkoutItem) => void;
  onToggleWorkoutComplete: (workoutId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  plan,
  onNavigate,
  onOpenWorkoutModal,
  onOpenShareStudio,
  onToggleWorkoutComplete
}) => {
  // Get current week and today's workout
  const currentWeek = plan[0] || plan[0];
  const todayWorkout = currentWeek?.workouts?.find(w => !w.completed) || currentWeek?.workouts?.[0];

  // Calculate race countdown days
  const raceDaysLeft = user.raceDate ? Math.max(0, Math.ceil((new Date(user.raceDate).getTime() - Date.now()) / (1000 * 3600 * 24))) : 38;

  // Calculate weekly progress
  const targetMileage = currentWeek?.targetMileageKm || 40;
  const completedMileage = currentWeek?.workouts?.reduce((sum, w) => sum + (w.completed ? (w.actualDistanceKm || w.targetDistanceKm) : 0), 0) || 12.4;
  const mileagePercent = Math.min(100, Math.round((completedMileage / targetMileage) * 100));

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto pb-28">
      
      {/* Top Banner Greeting */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#18181B] border border-white/5 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-4 z-10">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-orange-500 shadow-md"
            referrerPolicy="no-referrer"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white font-mono tracking-tight">
                Welcome back, {user.name.split(' ')[0]}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-bold uppercase font-mono">
                {user.goal.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Phase 1 • {currentWeek?.phase || 'Base Aerobic'} Week 1 of 12
            </p>
          </div>
        </div>

        {/* Race Countdown Card */}
        {user.isTrainingForRace && (
          <div 
            onClick={() => onNavigate('race_planner')}
            className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/5 p-3.5 px-5 rounded-2xl cursor-pointer transition-all hover:border-orange-500/30 group z-10"
          >
            <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-500">
              <Flag className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Race Countdown</div>
              <div className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">
                {user.raceName || 'HYROX Chicago'}
              </div>
            </div>
            <div className="pl-3 border-l border-white/10 text-right">
              <div className="text-xl font-black font-mono text-orange-500">{raceDaysLeft}</div>
              <div className="text-[9px] uppercase tracking-wider text-gray-400">Days Left</div>
            </div>
          </div>
        )}
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Today's Featured Workout (Col Span 8) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Today's Workout Hero Card */}
          <div className="bg-[#18181B] border border-white/5 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-bold font-mono uppercase tracking-wider">
                  TODAY'S WORKOUT
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  {todayWorkout?.dayOfWeek || 'Monday'}
                </span>
              </div>

              {todayWorkout?.completed && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Completed</span>
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 font-mono tracking-tight">
              {todayWorkout?.title || 'Lactate Threshold & Sled Intervals'}
            </h2>

            <p className="text-sm text-gray-300 leading-relaxed mb-6 max-w-xl">
              {todayWorkout?.description || 'Build fatigue tolerance and efficiency across transitions.'}
            </p>

            {/* Metrics Chips */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-[10px] text-gray-400 uppercase font-mono">Target Distance</div>
                <div className="text-lg font-bold font-mono text-orange-400">
                  {todayWorkout?.targetDistanceKm ? `${todayWorkout.targetDistanceKm} ${user.unitPreference}` : 'Station Only'}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-[10px] text-gray-400 uppercase font-mono">Est. Duration</div>
                <div className="text-lg font-bold font-mono text-white">
                  {todayWorkout?.targetDurationMin || 45} mins
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-[10px] text-gray-400 uppercase font-mono">Target Pace</div>
                <div className="text-lg font-bold font-mono text-amber-400">
                  {todayWorkout?.targetPace || '4:30'} /{user.unitPreference}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/5">
              <button
                onClick={() => todayWorkout && onToggleWorkoutComplete(todayWorkout.id)}
                className={`px-6 py-3 rounded-full font-bold text-xs shadow-lg transition-all flex items-center gap-2 ${
                  todayWorkout?.completed
                    ? 'bg-white/10 text-gray-300 hover:bg-white/15'
                    : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/20'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{todayWorkout?.completed ? 'Completed' : 'Mark Workout Complete'}</span>
              </button>

              <button
                onClick={() => onOpenShareStudio(todayWorkout)}
                className="px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-orange-400 font-bold text-xs transition-all flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Studio</span>
              </button>

              <button
                onClick={() => todayWorkout && onOpenWorkoutModal(todayWorkout)}
                className="px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-gray-300 font-bold text-xs transition-all"
              >
                View Details
              </button>
            </div>
          </div>

          {/* 7-Day Weekly Strip */}
          <div className="bg-[#18181B] border border-white/5 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange-500" />
                <span>This Week's Cadence</span>
              </h3>
              <button 
                onClick={() => onNavigate('plan')}
                className="text-xs text-orange-400 hover:underline font-mono flex items-center gap-1"
              >
                <span>Full Plan</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {currentWeek?.workouts?.map((wo, idx) => {
                const isSelectedToday = todayWorkout?.id === wo.id;
                return (
                  <div
                    key={wo.id}
                    onClick={() => onOpenWorkoutModal(wo)}
                    className={`p-3 rounded-2xl border text-center cursor-pointer transition-all ${
                      isSelectedToday
                        ? 'bg-orange-500/15 border-orange-500 text-white'
                        : wo.completed
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : 'bg-white/5 border-white/5 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    <div className="text-[10px] font-mono font-bold uppercase">{wo.dayOfWeek.slice(0, 3)}</div>
                    <div className="my-2 flex justify-center">
                      {wo.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : wo.type === 'rest' ? (
                        <span className="text-[10px] font-mono text-gray-500">REST</span>
                      ) : (
                        <Flame className={`w-5 h-5 ${isSelectedToday ? 'text-orange-500' : 'text-gray-500'}`} />
                      )}
                    </div>
                    <div className="text-[10px] font-mono font-bold truncate">
                      {wo.targetDistanceKm ? `${wo.targetDistanceKm}k` : wo.type.toUpperCase()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Progress Rings & AI Assistant (Col Span 4) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Progress Rings Card */}
          <div className="bg-[#18181B] border border-white/5 rounded-3xl p-6 shadow-xl space-y-6">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-orange-500" />
              <span>Weekly Progress Rings</span>
            </h3>

            {/* Circular Progress Bar Representation */}
            <div className="flex flex-col items-center justify-center py-2 relative">
              <div className="w-36 h-36 rounded-full border-8 border-orange-500/20 border-t-orange-500 flex flex-col items-center justify-center text-center shadow-lg shadow-orange-500/10">
                <span className="text-3xl font-black font-mono text-white">{mileagePercent}%</span>
                <span className="text-[10px] text-gray-400 uppercase font-mono">Weekly Target</span>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-white/5 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Completed Volume</span>
                <span className="font-bold text-white">{completedMileage} / {targetMileage} {user.unitPreference}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Strength Sessions</span>
                <span className="font-bold text-amber-400">2 / {user.strengthSessionsPerWeek} Done</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Aerobic Readiness</span>
                <span className="font-bold text-emerald-400">92% Optimal</span>
              </div>
            </div>
          </div>

          {/* StrideAI Coach Prompt Teaser Card */}
          <div 
            onClick={() => onNavigate('ai_coach')}
            className="bg-[#18181B] border border-orange-500/30 rounded-3xl p-6 shadow-xl cursor-pointer hover:border-orange-500 transition-all group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">StrideAI Coach</h4>
                <p className="text-[10px] text-gray-400">Powered by Gemini 3.6 Flash</p>
              </div>
            </div>

            <p className="text-xs text-gray-300 italic bg-white/5 p-3 rounded-2xl border border-white/5 mb-4">
              "Your easy run pace was slightly fast yesterday. Keep today's session controlled so you hit threshold power."
            </p>

            <button className="w-full py-2.5 rounded-full bg-orange-500/10 hover:bg-orange-500 text-orange-400 hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-2 border border-orange-500/30">
              <span>Chat With StrideAI</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onNavigate('share_studio')}
              className="p-4 rounded-3xl bg-[#18181B] hover:bg-white/5 border border-white/5 text-left transition-all group"
            >
              <Share2 className="w-5 h-5 text-orange-500 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-white">Share Studio</div>
              <div className="text-[10px] text-gray-400">Instagram Cards</div>
            </button>

            <button
              onClick={() => onNavigate('analytics')}
              className="p-4 rounded-3xl bg-[#18181B] hover:bg-white/5 border border-white/5 text-left transition-all group"
            >
              <TrendingUp className="w-5 h-5 text-amber-500 mb-2 group-hover:scale-110 transition-transform" />
              <div className="text-xs font-bold text-white">VDOT Analytics</div>
              <div className="text-[10px] text-gray-400">Pace Predictor</div>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
