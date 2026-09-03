import React, { useState } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  Flame, 
  Sparkles, 
  Filter, 
  ChevronDown, 
  Clock, 
  MapPin, 
  Zap, 
  Dumbbell,
  Search,
  Plus
} from 'lucide-react';
import { TrainingWeek, WorkoutItem, UserProfile } from '../types';

interface TrainingPlanViewProps {
  plan: TrainingWeek[];
  user: UserProfile;
  onOpenWorkoutModal: (workout: WorkoutItem) => void;
  onToggleWorkoutComplete: (workoutId: string) => void;
  onRegeneratePlan: () => void;
}

export const TrainingPlanView: React.FC<TrainingPlanViewProps> = ({
  plan,
  user,
  onOpenWorkoutModal,
  onToggleWorkoutComplete,
  onRegeneratePlan
}) => {
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedWeek, setExpandedWeek] = useState<number>(1);

  const filteredPlan = plan.filter(week => {
    if (selectedPhaseFilter !== 'all' && week.phase.toLowerCase() !== selectedPhaseFilter.toLowerCase()) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 pb-28">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#18181B] border border-white/5 rounded-3xl p-6 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold font-mono uppercase">
              12-WEEK PERIODIZED PROGRAM
            </span>
            <span className="text-xs text-gray-400 font-mono">
              Target: {user.targetDistance} ({user.targetFinishTime || user.targetPace})
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
            Interactive Training Calendar
          </h1>
        </div>

        <button
          onClick={onRegeneratePlan}
          className="px-5 py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-lg shadow-orange-500/20 transition-all flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Adjust Plan With StrideAI</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#18181B] border border-white/5 p-4 rounded-3xl">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <span className="text-xs text-gray-400 font-mono flex items-center gap-1 mr-2">
            <Filter className="w-3.5 h-3.5" />
            <span>Phase:</span>
          </span>
          {['all', 'base', 'build', 'peak', 'taper', 'recovery'].map((phase) => (
            <button
              key={phase}
              onClick={() => setSelectedPhaseFilter(phase)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize font-mono transition-all ${
                selectedPhaseFilter === phase
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {phase}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search workout..."
            className="w-full pl-9 pr-4 py-2 rounded-2xl bg-white/5 border border-white/5 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-orange-500 font-mono"
          />
        </div>
      </div>

      {/* Weeks Timeline */}
      <div className="space-y-6">
        {filteredPlan.map((week) => {
          const isExpanded = expandedWeek === week.weekNumber;
          const completedInWeek = week.workouts.filter(w => w.completed).length;

          return (
            <div 
              key={week.weekNumber}
              className="bg-[#18181B] border border-white/5 rounded-3xl overflow-hidden shadow-xl"
            >
              {/* Week Header Bar */}
              <div 
                onClick={() => setExpandedWeek(isExpanded ? 0 : week.weekNumber)}
                className="p-5 bg-white/5 hover:bg-white/10 border-b border-white/5 flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-500 font-extrabold font-mono text-sm flex items-center justify-center">
                    W{week.weekNumber}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-white font-mono">Week {week.weekNumber}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase ${
                        week.phase === 'Base' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                        week.phase === 'Build' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        week.phase === 'Peak' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' :
                        'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                      }`}>
                        {week.phase} Phase
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{week.focusMessage}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="hidden md:block text-right font-mono text-xs">
                    <div className="text-gray-400">Target Volume</div>
                    <div className="font-bold text-white">{week.targetMileageKm} {user.unitPreference}</div>
                  </div>

                  <div className="px-3 py-1.5 rounded-xl bg-black/30 text-xs font-mono font-semibold text-gray-300">
                    {completedInWeek} / {week.workouts.length} Done
                  </div>

                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </div>

              {/* Workouts Grid */}
              {isExpanded && (
                <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 animate-fadeIn">
                  {week.workouts.map((wo) => (
                    <div
                      key={wo.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                        wo.completed
                          ? 'bg-emerald-500/5 border-emerald-500/30'
                          : wo.type === 'rest'
                          ? 'bg-white/5 border-white/5 opacity-60'
                          : 'bg-white/5 border-white/5 hover:border-orange-500/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-[10px] font-mono text-gray-400 uppercase font-bold">
                            {wo.dayOfWeek} • {wo.type.toUpperCase()}
                          </div>
                          <div className="text-sm font-bold text-white mt-0.5 line-clamp-1">
                            {wo.title}
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleWorkoutComplete(wo.id);
                          }}
                          className={`p-1.5 rounded-xl transition-all ${
                            wo.completed 
                              ? 'bg-emerald-500 text-white' 
                              : 'bg-white/5 hover:bg-orange-500/20 text-gray-400 hover:text-orange-400'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                        {wo.description}
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] font-mono">
                        <span className="text-orange-400 font-bold">
                          {wo.targetDistanceKm ? `${wo.targetDistanceKm} ${user.unitPreference}` : 'Station Work'}
                        </span>
                        <span className="text-gray-400">
                          {wo.targetPace !== '—' ? `${wo.targetPace} /${user.unitPreference}` : `${wo.targetDurationMin}m`}
                        </span>
                        <button
                          onClick={() => onOpenWorkoutModal(wo)}
                          className="text-gray-400 hover:text-white underline font-medium"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};
