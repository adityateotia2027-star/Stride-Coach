import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  Flame, 
  Trophy, 
  Dumbbell, 
  Clock, 
  MapPin, 
  Activity,
  Zap
} from 'lucide-react';
import { UserProfile, GoalType, TargetDistance, ExperienceLevel } from '../types';
import { generateTrainingPlan } from '../utils/trainingPlanGenerator';

interface OnboardingFlowProps {
  onComplete: (profile: UserProfile) => void;
  onCancel: () => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  onComplete,
  onCancel
}) => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  // Onboarding Form State
  const [name, setName] = useState('Alex Runner');
  const [goal, setGoal] = useState<GoalType>('hyrox');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('Intermediate');
  const [targetDistance, setTargetDistance] = useState<TargetDistance>('HYROX Open');
  const [runsPerWeek, setRunsPerWeek] = useState(4);
  const [strengthSessionsPerWeek, setStrengthSessionsPerWeek] = useState(2);
  const [currentWeeklyMileage, setCurrentWeeklyMileage] = useState(30);
  const [longestRun, setLongestRun] = useState(12);
  const [currentEasyPace, setCurrentEasyPace] = useState('5:30');
  const [targetPace, setTargetPace] = useState('4:45');
  const [preferredDays, setPreferredDays] = useState<string[]>(['Mon', 'Wed', 'Fri', 'Sun']);
  const [isTrainingForRace, setIsTrainingForRace] = useState(true);
  const [raceName, setRaceName] = useState('Chicago HYROX Open');
  const [raceLocation, setRaceLocation] = useState('McCormick Place, Chicago');
  const [raceDate, setRaceDate] = useState(new Date(Date.now() + 45 * 86400000).toISOString().split('T')[0]);
  const [targetFinishTime, setTargetFinishTime] = useState('1:12:00');
  const [unitPreference, setUnitPreference] = useState<'km' | 'mi'>('km');

  // Generating state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationLog, setGenerationLog] = useState('');

  const handleToggleDay = (day: string) => {
    if (preferredDays.includes(day)) {
      setPreferredDays(preferredDays.filter(d => d !== day));
    } else {
      setPreferredDays([...preferredDays, day]);
    }
  };

  const handleStartGeneration = () => {
    setIsGenerating(true);
    setGenerationProgress(15);
    setGenerationLog('Analyzing VDOT fitness & easy pace baseline...');

    setTimeout(() => {
      setGenerationProgress(45);
      setGenerationLog('Structuring 12-week periodized progressive overload...');
    }, 600);

    setTimeout(() => {
      setGenerationProgress(75);
      setGenerationLog('Injecting HYROX station intervals & taper phase...');
    }, 1200);

    setTimeout(() => {
      setGenerationProgress(100);
      setGenerationLog('Plan ready!');

      const newProfile: UserProfile = {
        id: `user_${Date.now()}`,
        name,
        email: `${name.toLowerCase().replace(/\s+/g, '.')}@strideiq.fit`,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        goal,
        experienceLevel,
        targetDistance,
        runsPerWeek,
        strengthSessionsPerWeek,
        currentWeeklyMileage,
        longestRun,
        currentEasyPace,
        targetPace,
        preferredDays,
        isTrainingForRace,
        raceName: isTrainingForRace ? raceName : undefined,
        raceLocation: isTrainingForRace ? raceLocation : undefined,
        raceDate: isTrainingForRace ? raceDate : undefined,
        targetFinishTime: isTrainingForRace ? targetFinishTime : undefined,
        unitPreference,
        streakDays: 1,
        totalDistanceKm: 0,
        totalWorkoutsCompleted: 0,
        vdot: 46.8,
        shoes: [
          { id: 'shoe_default', name: 'Nike Pegasus 40', brand: 'Nike', distanceLoggedKm: 0, maxDistanceKm: 600, isDefault: true }
        ],
        connectedApps: [
          { id: 'strava', name: 'Strava', connected: false, iconName: 'Activity' },
          { id: 'garmin', name: 'Garmin Connect', connected: false, iconName: 'Watch' }
        ]
      };

      onComplete(newProfile);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col justify-between p-4 sm:p-6 lg:p-8 selection:bg-orange-500">
      
      {/* Header */}
      <div className="max-w-2xl mx-auto w-full flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center font-bold font-mono text-white text-sm">
            IQ
          </div>
          <span className="font-bold font-mono text-lg tracking-tight">StrideIQ Onboarding</span>
        </div>

        <button
          onClick={onCancel}
          className="text-xs text-gray-400 hover:text-white transition-colors"
        >
          Exit Setup
        </button>
      </div>

      {/* Progress Bar */}
      {!isGenerating && (
        <div className="max-w-2xl mx-auto w-full mb-8">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2 font-mono">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round((step / totalSteps) * 100)}% Completed</span>
          </div>
          <div className="h-1.5 w-full bg-[#18181B] rounded-full overflow-hidden border border-white/5">
            <div 
              className="h-full bg-orange-500 transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="max-w-2xl mx-auto w-full bg-[#18181B] border border-white/5 rounded-3xl p-6 sm:p-10 shadow-2xl my-auto">
        
        {/* Animated Generator Screen */}
        {isGenerating ? (
          <div className="py-12 text-center space-y-6 animate-fadeIn">
            <div className="w-20 h-20 rounded-3xl bg-orange-500 flex items-center justify-center mx-auto shadow-2xl shadow-orange-500/30 animate-pulse">
              <Sparkles className="w-10 h-10 text-white" />
            </div>

            <div>
              <h2 className="text-2xl font-extrabold text-white mb-2 font-mono">Building Your Periodized Plan</h2>
              <p className="text-sm text-orange-400 font-mono animate-pulse">{generationLog}</p>
            </div>

            <div className="max-w-md mx-auto">
              <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-0.5">
                <div 
                  className="h-full bg-orange-500 rounded-full transition-all duration-500"
                  style={{ width: `${generationProgress}%` }}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Step 1: Athlete Profile & Primary Goal */}
            {step === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h2 className="text-2xl font-extrabold text-white mb-1 font-mono">What is your primary focus?</h2>
                  <p className="text-xs text-gray-400">Select your athletic goal and experience level</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">Athlete Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">Primary Goal</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'hyrox' as GoalType, title: 'HYROX Race', desc: 'Running + Station Intervals', icon: Flame },
                      { id: 'race' as GoalType, title: 'Road Race', desc: '5K to Ultra Marathon', icon: Trophy },
                      { id: 'fitness' as GoalType, title: 'General Fitness', desc: 'Aerobic Base & Health', icon: Activity },
                    ].map((item) => {
                      const Icon = item.icon;
                      const selected = goal === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setGoal(item.id)}
                          className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-3 ${
                            selected
                              ? 'bg-orange-500/10 border-orange-500 text-white shadow-lg shadow-orange-500/10'
                              : 'bg-white/5 border-white/5 text-gray-400 hover:text-gray-200'
                          }`}
                        >
                          <Icon className={`w-6 h-6 ${selected ? 'text-orange-500' : ''}`} />
                          <div>
                            <div className="text-sm font-bold text-white">{item.title}</div>
                            <div className="text-xs text-gray-400">{item.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">Experience Level</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(['Beginner', 'Intermediate', 'Advanced', 'Elite'] as ExperienceLevel[]).map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setExperienceLevel(lvl)}
                        className={`py-2.5 px-3 rounded-full text-xs font-semibold border transition-all ${
                          experienceLevel === lvl
                            ? 'bg-orange-500 text-white border-orange-500'
                            : 'bg-white/5 border-white/5 text-gray-400 hover:text-white'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Target Distance & Target Race */}
            {step === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h2 className="text-2xl font-extrabold text-white mb-1 font-mono">Target Distance & Race</h2>
                  <p className="text-xs text-gray-400">Choose the specific distance you are training towards</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">Target Event Distance</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {(['5K', '10K', 'Half Marathon', 'Marathon', '50K Ultra', 'HYROX Open', 'HYROX Pro'] as TargetDistance[]).map((dist) => (
                      <button
                        key={dist}
                        type="button"
                        onClick={() => setTargetDistance(dist)}
                        className={`p-3 rounded-full text-xs font-bold border transition-all ${
                          targetDistance === dist
                            ? 'bg-orange-500 text-white border-orange-500 shadow-md'
                            : 'bg-white/5 border-white/5 text-gray-300 hover:text-white'
                        }`}
                      >
                        {dist}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">Are you training for a specific race?</span>
                    <input
                      type="checkbox"
                      checked={isTrainingForRace}
                      onChange={(e) => setIsTrainingForRace(e.target.checked)}
                      className="w-5 h-5 accent-orange-500 rounded"
                    />
                  </div>

                  {isTrainingForRace && (
                    <div className="space-y-3 pt-2 border-t border-white/5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-gray-400 mb-1">Race Name</label>
                          <input
                            type="text"
                            value={raceName}
                            onChange={(e) => setRaceName(e.target.value)}
                            placeholder="Chicago Marathon"
                            className="w-full px-3 py-2 rounded-xl bg-[#0A0A0B] border border-white/10 text-white text-xs focus:outline-none focus:border-orange-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-gray-400 mb-1">Race Location</label>
                          <input
                            type="text"
                            value={raceLocation}
                            onChange={(e) => setRaceLocation(e.target.value)}
                            placeholder="Chicago, IL"
                            className="w-full px-3 py-2 rounded-xl bg-[#0A0A0B] border border-white/10 text-white text-xs focus:outline-none focus:border-orange-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-gray-400 mb-1">Race Date</label>
                          <input
                            type="date"
                            value={raceDate}
                            onChange={(e) => setRaceDate(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-[#0A0A0B] border border-white/10 text-white text-xs focus:outline-none focus:border-orange-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-gray-400 mb-1">Target Finish Time</label>
                          <input
                            type="text"
                            value={targetFinishTime}
                            onChange={(e) => setTargetFinishTime(e.target.value)}
                            placeholder="1:45:00 or 1:10:00"
                            className="w-full px-3 py-2 rounded-xl bg-[#0A0A0B] border border-white/10 text-white text-xs focus:outline-none focus:border-orange-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Pacing & Baseline Metrics */}
            {step === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h2 className="text-2xl font-extrabold text-white mb-1 font-mono">Current Pacing & Baseline</h2>
                  <p className="text-xs text-gray-400">Used to compute your baseline VDOT and target training zones</p>
                </div>

                <div className="flex gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => setUnitPreference('km')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                      unitPreference === 'km' ? 'bg-orange-500 text-white' : 'bg-white/5 text-gray-400'
                    }`}
                  >
                    Kilometers (KM)
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnitPreference('mi')}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                      unitPreference === 'mi' ? 'bg-orange-500 text-white' : 'bg-white/5 text-gray-400'
                    }`}
                  >
                    Miles (MI)
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Current Weekly Mileage ({unitPreference})</label>
                    <input
                      type="number"
                      value={currentWeeklyMileage}
                      onChange={(e) => setCurrentWeeklyMileage(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Longest Recent Run ({unitPreference})</label>
                    <input
                      type="number"
                      value={longestRun}
                      onChange={(e) => setLongestRun(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Current Easy Pace (MM:SS)</label>
                    <input
                      type="text"
                      value={currentEasyPace}
                      onChange={(e) => setCurrentEasyPace(e.target.value)}
                      placeholder="5:30"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Target Race Pace (MM:SS)</label>
                    <input
                      type="text"
                      value={targetPace}
                      onChange={(e) => setTargetPace(e.target.value)}
                      placeholder="4:45"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-orange-500 font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Weekly Frequency & Preferences */}
            {step === 4 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h2 className="text-2xl font-extrabold text-white mb-1 font-mono">Weekly Schedule & Days</h2>
                  <p className="text-xs text-gray-400">Configure run frequency, strength days, and rest days</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">Runs Per Week: <span className="text-orange-400 font-bold">{runsPerWeek} Sessions</span></label>
                  <input
                    type="range"
                    min="2"
                    max="6"
                    value={runsPerWeek}
                    onChange={(e) => setRunsPerWeek(Number(e.target.value))}
                    className="w-full accent-orange-500 bg-white/5"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 font-mono mt-1">
                    <span>2 Days</span>
                    <span>4 Days</span>
                    <span>6 Days</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">Strength / HYROX Station Sessions: <span className="text-orange-400 font-bold">{strengthSessionsPerWeek} Sessions</span></label>
                  <input
                    type="range"
                    min="0"
                    max="4"
                    value={strengthSessionsPerWeek}
                    onChange={(e) => setStrengthSessionsPerWeek(Number(e.target.value))}
                    className="w-full accent-orange-500 bg-white/5"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">Preferred Training Days</label>
                  <div className="grid grid-cols-7 gap-1.5">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
                      const selected = preferredDays.includes(day);
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => handleToggleDay(day)}
                          className={`py-3 rounded-xl text-xs font-bold transition-all ${
                            selected
                              ? 'bg-orange-500 text-white shadow-md'
                              : 'bg-white/5 text-gray-500 hover:text-gray-300'
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Final Summary & Confirm */}
            {step === 5 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h2 className="text-2xl font-extrabold text-white mb-1 font-mono">Plan Summary</h2>
                  <p className="text-xs text-gray-400">Review your profile before AI algorithm builds your calendar</p>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-3 text-xs">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">Athlete</span>
                    <span className="font-bold text-white">{name} ({experienceLevel})</span>
                  </div>

                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">Focus Goal</span>
                    <span className="font-bold text-orange-400 uppercase">{goal} ({targetDistance})</span>
                  </div>

                  {isTrainingForRace && (
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-gray-400">Race Target</span>
                      <span className="font-bold text-white">{raceName} ({raceDate})</span>
                    </div>
                  )}

                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">Weekly Cadence</span>
                    <span className="font-bold text-white">{runsPerWeek} Runs + {strengthSessionsPerWeek} Strength</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">Target Pace</span>
                    <span className="font-bold text-orange-400 font-mono">{targetPace} /{unitPreference}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="flex items-center justify-between pt-8 mt-6 border-t border-white/10">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 font-semibold text-xs transition-all flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              {step < totalSteps ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-6 py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-lg shadow-orange-500/20 transition-all flex items-center gap-2"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleStartGeneration}
                  className="px-8 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-xl shadow-orange-500/30 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate My Plan</span>
                </button>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  );
};
