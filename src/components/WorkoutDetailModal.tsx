import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Share2, 
  Flame, 
  Clock, 
  Activity, 
  Dumbbell, 
  TrendingUp, 
  Heart, 
  CloudSun,
  Edit3,
  Save
} from 'lucide-react';
import { WorkoutItem, UserProfile } from '../types';

interface WorkoutDetailModalProps {
  workout: WorkoutItem | null;
  user: UserProfile;
  onClose: () => void;
  onToggleComplete: (workoutId: string) => void;
  onOpenShareStudio: (workout: WorkoutItem) => void;
  onSaveLoggedWorkout: (updatedWorkout: WorkoutItem) => void;
}

export const WorkoutDetailModal: React.FC<WorkoutDetailModalProps> = ({
  workout,
  user,
  onClose,
  onToggleComplete,
  onOpenShareStudio,
  onSaveLoggedWorkout
}) => {
  if (!workout) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [actualDistance, setActualDistance] = useState(workout.actualDistanceKm || workout.targetDistanceKm || 10);
  const [actualDuration, setActualDuration] = useState(workout.actualDurationMin || workout.targetDurationMin || 48);
  const [actualPace, setActualPace] = useState(workout.actualPace || workout.targetPace || '4:48');
  const [avgHr, setAvgHr] = useState(workout.avgHeartRate || 162);
  const [rpe, setRpe] = useState(workout.perceivedExertion || 7);
  const [notes, setNotes] = useState(workout.notes || '');

  const handleSave = () => {
    const updated: WorkoutItem = {
      ...workout,
      completed: true,
      actualDistanceKm: actualDistance,
      actualDurationMin: actualDuration,
      actualPace: actualPace,
      avgHeartRate: avgHr,
      perceivedExertion: rpe,
      notes: notes
    };
    onSaveLoggedWorkout(updated);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="bg-[#18181B] border border-white/5 w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl relative text-white my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center font-bold">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-orange-400 font-mono font-bold uppercase">{workout.type} Workout</span>
              <span className="text-xs text-gray-400 font-mono">• {workout.dayOfWeek}</span>
            </div>
            <h2 className="text-xl font-extrabold text-white font-mono tracking-tight">{workout.title}</h2>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
            <div className="text-[10px] text-gray-400 font-mono uppercase">Target Distance</div>
            <div className="text-base font-bold font-mono text-orange-400">
              {workout.targetDistanceKm ? `${workout.targetDistanceKm} ${user.unitPreference}` : 'Stations'}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
            <div className="text-[10px] text-gray-400 font-mono uppercase">Target Pace</div>
            <div className="text-base font-bold font-mono text-white">
              {workout.targetPace} /{user.unitPreference}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5">
            <div className="text-[10px] text-gray-400 font-mono uppercase">Target Duration</div>
            <div className="text-base font-bold font-mono text-amber-400">
              {workout.targetDurationMin} mins
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 mb-6 text-xs text-gray-300 leading-relaxed">
          {workout.description}
        </div>

        {/* HYROX Stations Breakdown if available */}
        {workout.hyroxStations && workout.hyroxStations.length > 0 && (
          <div className="mb-6 space-y-3">
            <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-1.5">
              <Dumbbell className="w-4 h-4 text-orange-500" />
              <span>HYROX Station Intervals</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {workout.hyroxStations.map((st, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-white/5 text-xs">
                  <div className="flex justify-between font-bold text-white mb-1">
                    <span>{st.name}</span>
                    <span className="text-orange-400">{st.distanceOrReps}</span>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-normal">{st.tips}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Splits Breakdown */}
        {workout.splits && workout.splits.length > 0 && (
          <div className="mb-6 space-y-3">
            <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-orange-500" />
              <span>Kilometer Splits Breakdown</span>
            </h3>

            <div className="rounded-2xl border border-white/5 overflow-hidden font-mono text-xs">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-gray-400 text-[10px] uppercase">
                  <tr>
                    <th className="p-2.5">KM</th>
                    <th className="p-2.5">Pace</th>
                    <th className="p-2.5">Elevation</th>
                    <th className="p-2.5">Avg HR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-200">
                  {workout.splits.map((split, i) => (
                    <tr key={i} className="hover:bg-white/5">
                      <td className="p-2.5 font-bold text-white">{split.kmOrMile}</td>
                      <td className="p-2.5 text-orange-400 font-bold">{split.pace}</td>
                      <td className="p-2.5 text-gray-400">+{split.elevationMeters}m</td>
                      <td className="p-2.5 text-rose-400">{split.avgHr} bpm</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Edit / Log Completed Metrics Form */}
        {isEditing ? (
          <div className="p-4 rounded-2xl bg-white/5 border border-orange-500/30 mb-6 space-y-3 animate-fadeIn">
            <h4 className="text-xs font-bold text-orange-400 font-mono uppercase">Log Actual Workout Metrics</h4>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div>
                <label className="text-[10px] text-gray-400 block mb-1">Distance ({user.unitPreference})</label>
                <input
                  type="number"
                  value={actualDistance}
                  onChange={(e) => setActualDistance(Number(e.target.value))}
                  className="w-full p-2 rounded-xl bg-[#0A0A0B] border border-white/10 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-400 block mb-1">Duration (Min)</label>
                <input
                  type="number"
                  value={actualDuration}
                  onChange={(e) => setActualDuration(Number(e.target.value))}
                  className="w-full p-2 rounded-xl bg-[#0A0A0B] border border-white/10 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-400 block mb-1">Avg HR (bpm)</label>
                <input
                  type="number"
                  value={avgHr}
                  onChange={(e) => setAvgHr(Number(e.target.value))}
                  className="w-full p-2 rounded-xl bg-[#0A0A0B] border border-white/10 text-white font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-400 block mb-1">Effort (RPE 1-10)</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={rpe}
                  onChange={(e) => setRpe(Number(e.target.value))}
                  className="w-full p-2 rounded-xl bg-[#0A0A0B] border border-white/10 text-white font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-gray-400 block mb-1">Athlete Notes</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="How did the session feel? Legs, hydration, shoes..."
                className="w-full p-2 rounded-xl bg-[#0A0A0B] border border-white/10 text-white text-xs"
              />
            </div>

            <button
              onClick={handleSave}
              className="w-full py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save & Log Workout</span>
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setIsEditing(true)}
              className="text-xs text-orange-400 hover:underline flex items-center gap-1 font-mono font-semibold"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Log Actual Stats & HR</span>
            </button>
          </div>
        )}

        {/* Modal Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/10">
          <button
            onClick={() => onOpenShareStudio(workout)}
            className="w-full sm:w-auto flex-1 py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Open in Social Share Studio</span>
          </button>

          <button
            onClick={() => {
              onToggleComplete(workout.id);
              onClose();
            }}
            className={`w-full sm:w-auto py-3.5 px-6 rounded-full border font-bold text-xs transition-all flex items-center justify-center gap-2 ${
              workout.completed
                ? 'bg-white/5 text-gray-300 border-white/10'
                : 'bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-500'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{workout.completed ? 'Mark Uncompleted' : 'Mark Completed'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
