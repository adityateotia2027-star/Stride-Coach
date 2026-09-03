export type GoalType = 'fitness' | 'race' | 'hyrox';
export type TargetDistance = '5K' | '10K' | 'Half Marathon' | 'Marathon' | '50K Ultra' | 'HYROX Open' | 'HYROX Pro';
export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Elite';
export type WorkoutType = 'easy' | 'tempo' | 'interval' | 'long' | 'hyrox' | 'strength' | 'rest' | 'taper';

export type ActiveView = 
  | 'landing'
  | 'dashboard'
  | 'plan'
  | 'share_studio'
  | 'analytics'
  | 'race_planner'
  | 'ai_coach'
  | 'badges'
  | 'profile';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  goal: GoalType;
  experienceLevel: ExperienceLevel;
  targetDistance: TargetDistance;
  runsPerWeek: number;
  strengthSessionsPerWeek: number;
  currentWeeklyMileage: number; // in km or miles based on unit
  longestRun: number;
  currentEasyPace: string; // e.g. "5:30" /km or /mi
  targetPace: string; // e.g. "4:45"
  preferredDays: string[]; // e.g. ["Mon", "Wed", "Fri", "Sun"]
  isTrainingForRace: boolean;
  raceName?: string;
  raceLocation?: string;
  raceDate?: string; // YYYY-MM-DD
  targetFinishTime?: string; // e.g. "1:45:00" or "1:05:00" for HYROX
  unitPreference: 'km' | 'mi';
  streakDays: number;
  totalDistanceKm: number;
  totalWorkoutsCompleted: number;
  vdot: number;
  shoes: ShoeItem[];
  connectedApps: ConnectedApp[];
}

export interface ShoeItem {
  id: string;
  name: string;
  brand: string;
  distanceLoggedKm: number;
  maxDistanceKm: number;
  isDefault: boolean;
}

export interface ConnectedApp {
  id: 'strava' | 'garmin' | 'apple_health' | 'coros';
  name: string;
  connected: boolean;
  lastSyncedAt?: string;
  iconName: string;
}

export interface HyroxStation {
  name: string;
  distanceOrReps: string;
  targetTimeMin: number;
  tips: string;
}

export interface WorkoutItem {
  id: string;
  title: string;
  type: WorkoutType;
  weekNumber: number;
  dayOfWeek: string; // e.g. "Monday"
  date: string; // YYYY-MM-DD
  targetDistanceKm: number;
  targetDurationMin: number;
  targetPace: string;
  description: string;
  completed: boolean;
  actualDistanceKm?: number;
  actualDurationMin?: number;
  actualPace?: string;
  avgHeartRate?: number;
  perceivedExertion?: number; // 1 to 10
  notes?: string;
  elevationGainMeters?: number;
  hyroxStations?: HyroxStation[];
  splits?: WorkoutSplit[];
  weather?: string;
}

export interface WorkoutSplit {
  kmOrMile: number;
  pace: string;
  elevationMeters: number;
  avgHr: number;
}

export interface TrainingWeek {
  weekNumber: number;
  phase: 'Base' | 'Build' | 'Peak' | 'Taper' | 'Recovery';
  startDate: string;
  targetMileageKm: number;
  completedMileageKm: number;
  focusMessage: string;
  workouts: WorkoutItem[];
}

export interface BadgeItem {
  id: string;
  title: string;
  description: string;
  category: 'mileage' | 'streak' | 'race' | 'hyrox' | 'social';
  icon: string;
  unlockedAt?: string;
  progressPercent: number; // 0 to 100
}

export interface SocialTemplate {
  id: string;
  name: string;
  category: 'dark_linear' | 'apple_neon' | 'nike_clean' | 'hyrox_fire' | 'sunset';
  backgroundColor: string;
  accentColor: string;
  textColor: string;
  cardBg: string;
  fontStyle: 'sans' | 'mono' | 'display' | 'serif';
  showMap: boolean;
  showPace: boolean;
  showHr: boolean;
  showElevation: boolean;
  showQuote: boolean;
  quoteText: string;
  showBadge: boolean;
}

export interface AICoachMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  suggestedAction?: {
    type: 'adjust_plan' | 'reduce_mileage' | 'add_rest';
    label: string;
  };
}
