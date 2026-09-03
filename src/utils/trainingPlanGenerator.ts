import { UserProfile, TrainingWeek, WorkoutItem, WorkoutType, HyroxStation } from '../types';
import { HYROX_STATIONS_INFO } from '../data/initialData';

export function parsePaceToSeconds(paceStr: string): number {
  if (!paceStr) return 330; // default 5:30
  const parts = paceStr.trim().split(':');
  if (parts.length === 2) {
    const mins = parseInt(parts[0], 10) || 5;
    const secs = parseInt(parts[1], 10) || 30;
    return mins * 60 + secs;
  }
  return 330;
}

export function formatSecondsToPace(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export function generateTrainingPlan(profile: UserProfile): TrainingWeek[] {
  const numWeeks = 12; // Standard 12-week program
  const weeks: TrainingWeek[] = [];
  const easyPaceSec = parsePaceToSeconds(profile.currentEasyPace);
  const targetPaceSec = parsePaceToSeconds(profile.targetPace);
  const baseMileage = Math.max(15, profile.currentWeeklyMileage || 25);

  const today = new Date();

  for (let w = 1; w <= numWeeks; w++) {
    // Determine phase
    let phase: 'Base' | 'Build' | 'Peak' | 'Taper' | 'Recovery' = 'Base';
    let mileageMultiplier = 1.0;

    if (w <= 3) {
      phase = 'Base';
      mileageMultiplier = 1.0 + (w - 1) * 0.08;
    } else if (w === 4) {
      phase = 'Recovery';
      mileageMultiplier = 0.85; // Recovery week
    } else if (w <= 8) {
      phase = 'Build';
      mileageMultiplier = 1.1 + (w - 5) * 0.1;
    } else if (w <= 10) {
      phase = 'Peak';
      mileageMultiplier = 1.35;
    } else if (w === 11) {
      phase = 'Taper';
      mileageMultiplier = 1.0;
    } else {
      phase = 'Taper';
      mileageMultiplier = 0.65; // Race week taper
    }

    const targetWeekMileage = Math.round(baseMileage * mileageMultiplier);
    
    // Focus message
    let focusMessage = '';
    if (phase === 'Base') focusMessage = 'Building aerobic foundation & connective tissue durability.';
    else if (phase === 'Recovery') focusMessage = 'Adaptation & supercompensation week to absorb training loads.';
    else if (phase === 'Build') focusMessage = 'Lactate threshold progression & race-specific pace work.';
    else if (phase === 'Peak') focusMessage = 'Peak simulation volume & high-intensity station integration.';
    else focusMessage = 'Restoring glycogen stores, sharp legs, and mental race preparation.';

    // Calculate dates for this week
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() + (w - 1) * 7);

    // Generate workouts for 7 days
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const shortDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const workouts: WorkoutItem[] = [];

    // Allocate distribution
    const longRunKm = Math.min(Math.round(targetWeekMileage * 0.35), 35);
    const qualityRunKm = Math.round(targetWeekMileage * 0.22);
    const remainingForEasy = Math.max(0, targetWeekMileage - longRunKm - qualityRunKm);
    const easyRunsCount = Math.max(1, profile.runsPerWeek - 2);
    const perEasyRunKm = Math.round(remainingForEasy / easyRunsCount) || 5;

    for (let d = 0; d < 7; d++) {
      const dayName = daysOfWeek[d];
      const shortDay = shortDays[d];
      const workoutDate = new Date(weekStart);
      workoutDate.setDate(weekStart.getDate() + d);
      const dateStr = workoutDate.toISOString().split('T')[0];
      const isToday = w === 1 && d === 0;

      let type: WorkoutType = 'rest';
      let title = 'Rest & Recovery';
      let targetDistanceKm = 0;
      let targetDurationMin = 0;
      let targetPace = '—';
      let description = 'Focus on active recovery, mobility, sleep, and proper hydration.';
      let hyroxStations: HyroxStation[] | undefined = undefined;

      const isPreferred = profile.preferredDays.includes(shortDay);

      if (shortDay === 'Sun' || (d === 6 && isPreferred)) {
        // Sunday Long Run
        type = 'long';
        title = profile.goal === 'hyrox' ? `Long Aerobic Run + HYROX Finisher` : `Progressive Long Run`;
        targetDistanceKm = longRunKm;
        const longPaceSec = easyPaceSec + 15;
        targetPace = formatSecondsToPace(longPaceSec);
        targetDurationMin = Math.round((longRunKm * longPaceSec) / 60);
        description = `Steady aerobic long run building endurance. Keep heart rate strictly in Zone 2 for the first 80%, then finish last ${Math.round(longRunKm * 0.2)}km at target race pace (${profile.targetPace}).`;
        
        if (profile.goal === 'hyrox') {
          hyroxStations = [
            HYROX_STATIONS_INFO[0], // SkiErg
            HYROX_STATIONS_INFO[7], // Wall Balls
          ];
        }
      } else if (shortDay === 'Thu' || (d === 3 && isPreferred)) {
        // Quality Tempo / Interval Day
        if (profile.goal === 'hyrox') {
          type = 'hyrox';
          title = `HYROX Simulation: Sled Push & Roxzone Intervals`;
          targetDistanceKm = Math.max(4, qualityRunKm);
          targetPace = profile.targetPace;
          targetDurationMin = 45;
          description = `Perform 1km run at target race pace, immediately transitioning into 4 sets of 12.5m Sled Push (152kg) and 1000m SkiErg. Minimize transition time!`;
          hyroxStations = [
            HYROX_STATIONS_INFO[1], // Sled Push
            HYROX_STATIONS_INFO[3], // Burpee Broad Jumps
            HYROX_STATIONS_INFO[5], // Farmers Carry
          ];
        } else {
          type = w % 2 === 0 ? 'tempo' : 'interval';
          title = type === 'tempo' ? `Lactate Threshold Tempo Run` : `VO2 Max Intervals (4x1000m)`;
          targetDistanceKm = Math.max(5, qualityRunKm);
          const qualityPaceSec = Math.max(200, targetPaceSec - 10);
          targetPace = formatSecondsToPace(qualityPaceSec);
          targetDurationMin = Math.round((targetDistanceKm * qualityPaceSec) / 60) + 15;
          description = type === 'tempo' 
            ? `1.5km warmup, then ${targetDistanceKm - 3}km continuous at threshold pace (${targetPace}), 1.5km cooldown.`
            : `4 x 1000m at VO2 max effort with 90 seconds active recovery jog between reps. Focus on light turnover and relaxed shoulders.`;
        }
      } else if ((shortDay === 'Tue' || shortDay === 'Sat') && profile.runsPerWeek >= 3) {
        // Easy Aerobic Run
        type = 'easy';
        title = `Easy Base Aerobic Run`;
        targetDistanceKm = perEasyRunKm;
        targetPace = formatSecondsToPace(easyPaceSec);
        targetDurationMin = Math.round((perEasyRunKm * easyPaceSec) / 60);
        description = `Relaxed conversational effort. You should easily be able to talk in full sentences. Focus on high stride cadence (170-180 spm).`;
      } else if ((shortDay === 'Wed' || shortDay === 'Fri') && profile.strengthSessionsPerWeek > 0) {
        // Strength Session
        type = 'strength';
        title = profile.goal === 'hyrox' ? `HYROX Heavy Strength & Core Durability` : `Runner Functional Strength & Posterior Chain`;
        targetDistanceKm = 0;
        targetPace = '—';
        targetDurationMin = 45;
        description = profile.goal === 'hyrox'
          ? `3x8 Heavy Deadlifts, 3x10 Dumbbell Walking Lunges, 3x12 Farmer Carries, 3x15 Wall Balls. Finish with 10 min core circuit.`
          : `Single-leg balance exercises, Bulgarian split squats, calf raises, glute bridges, and core stability work to prevent injury.`;
      }

      // Mark first week's first run as completed for demo experience if applicable
      const isCompletedDemo = isToday || (w === 1 && d < 1 && type !== 'rest');

      workouts.push({
        id: `w${w}_d${d}_${type}`,
        title,
        type,
        weekNumber: w,
        dayOfWeek: dayName,
        date: dateStr,
        targetDistanceKm,
        targetDurationMin,
        targetPace,
        description,
        completed: isCompletedDemo,
        actualDistanceKm: isCompletedDemo ? targetDistanceKm : undefined,
        actualDurationMin: isCompletedDemo ? targetDurationMin : undefined,
        actualPace: isCompletedDemo ? targetPace : undefined,
        avgHeartRate: isCompletedDemo ? (type === 'easy' ? 138 : 162) : undefined,
        perceivedExertion: isCompletedDemo ? (type === 'easy' ? 4 : 7) : undefined,
        elevationGainMeters: isCompletedDemo ? (targetDistanceKm * 8) : undefined,
        hyroxStations,
        splits: isCompletedDemo && targetDistanceKm > 0 ? [
          { kmOrMile: 1, pace: formatSecondsToPace(parsePaceToSeconds(targetPace) + 10), elevationMeters: 5, avgHr: 135 },
          { kmOrMile: 2, pace: targetPace, elevationMeters: 8, avgHr: 142 },
          { kmOrMile: 3, pace: formatSecondsToPace(parsePaceToSeconds(targetPace) - 5), elevationMeters: 3, avgHr: 148 },
        ] : undefined
      });
    }

    const completedKm = workouts.reduce((sum, wo) => sum + (wo.completed ? (wo.actualDistanceKm || wo.targetDistanceKm) : 0), 0);

    weeks.push({
      weekNumber: w,
      phase,
      startDate: weekStart.toISOString().split('T')[0],
      targetMileageKm: targetWeekMileage,
      completedMileageKm: completedKm,
      focusMessage,
      workouts
    });
  }

  return weeks;
}

export function calculateVDOT(distanceKm: number, durationMin: number): number {
  if (distanceKm <= 0 || durationMin <= 0) return 40;
  // Approximation of Jack Daniels VDOT formula
  const velocityMetersPerMin = (distanceKm * 1000) / durationMin;
  const percentMax = 0.8 + 0.1894393 * Math.exp(-0.012778 * durationMin) + 0.2989558 * Math.exp(-0.1932605 * durationMin);
  const vo2Cost = -4.60 + 0.182258 * velocityMetersPerMin + 0.000104 * Math.pow(velocityMetersPerMin, 2);
  const vdot = vo2Cost / percentMax;
  return Math.round(vdot * 10) / 10;
}
