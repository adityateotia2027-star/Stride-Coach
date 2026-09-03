import { UserProfile, BadgeItem, SocialTemplate, ConnectedApp } from '../types';

export const DEMO_PROFILES: UserProfile[] = [
  {
    id: 'user_hyrox_pro',
    name: 'Alex Rivera',
    email: 'alex.rivera@strideiq.fit',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    goal: 'hyrox',
    experienceLevel: 'Advanced',
    targetDistance: 'HYROX Open',
    runsPerWeek: 4,
    strengthSessionsPerWeek: 3,
    currentWeeklyMileage: 38,
    longestRun: 16,
    currentEasyPace: '5:15',
    targetPace: '4:30',
    preferredDays: ['Mon', 'Tue', 'Thu', 'Fri', 'Sat'],
    isTrainingForRace: true,
    raceName: 'HYROX World Championships - Chicago',
    raceLocation: 'McCormick Place, Chicago',
    raceDate: new Date(Date.now() + 38 * 86400000).toISOString().split('T')[0], // 38 days from today
    targetFinishTime: '1:08:00',
    unitPreference: 'km',
    streakDays: 14,
    totalDistanceKm: 342,
    totalWorkoutsCompleted: 48,
    vdot: 51.5,
    shoes: [
      { id: 'shoe_1', name: 'Nike Alphafly 3', brand: 'Nike', distanceLoggedKm: 124, maxDistanceKm: 500, isDefault: true },
      { id: 'shoe_2', name: 'Puma Deviate Nitro 2', brand: 'Puma', distanceLoggedKm: 280, maxDistanceKm: 600, isDefault: false },
    ],
    connectedApps: [
      { id: 'strava', name: 'Strava', connected: true, lastSyncedAt: '12 mins ago', iconName: 'Activity' },
      { id: 'garmin', name: 'Garmin Connect', connected: true, lastSyncedAt: '1 hour ago', iconName: 'Watch' },
      { id: 'apple_health', name: 'Apple Health', connected: false, iconName: 'HeartPulse' },
      { id: 'coros', name: 'Coros', connected: false, iconName: 'Compass' },
    ]
  },
  {
    id: 'user_marathoner',
    name: 'Jordan Vance',
    email: 'jordan.vance@strideiq.fit',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    goal: 'race',
    experienceLevel: 'Intermediate',
    targetDistance: 'Half Marathon',
    runsPerWeek: 4,
    strengthSessionsPerWeek: 2,
    currentWeeklyMileage: 28,
    longestRun: 14,
    currentEasyPace: '5:45',
    targetPace: '5:00',
    preferredDays: ['Tue', 'Thu', 'Sat', 'Sun'],
    isTrainingForRace: true,
    raceName: 'Chicago Half Marathon',
    raceLocation: 'Chicago, IL',
    raceDate: new Date(Date.now() + 52 * 86400000).toISOString().split('T')[0],
    targetFinishTime: '1:45:00',
    unitPreference: 'km',
    streakDays: 8,
    totalDistanceKm: 210,
    totalWorkoutsCompleted: 32,
    vdot: 44.2,
    shoes: [
      { id: 'shoe_3', name: 'Saucony Endorphin Speed 4', brand: 'Saucony', distanceLoggedKm: 185, maxDistanceKm: 500, isDefault: true }
    ],
    connectedApps: [
      { id: 'strava', name: 'Strava', connected: true, lastSyncedAt: '2 hours ago', iconName: 'Activity' },
      { id: 'garmin', name: 'Garmin Connect', connected: false, iconName: 'Watch' },
      { id: 'apple_health', name: 'Apple Health', connected: true, lastSyncedAt: 'Yesterday', iconName: 'HeartPulse' },
      { id: 'coros', name: 'Coros', connected: false, iconName: 'Compass' },
    ]
  }
];

export const BADGES_CATALOG: BadgeItem[] = [
  {
    id: 'badge_first_10k',
    title: 'Double Digits',
    description: 'Completed your first 10K distance run in a single session.',
    category: 'mileage',
    icon: 'Milestone',
    unlockedAt: '2026-07-15',
    progressPercent: 100
  },
  {
    id: 'badge_hyrox_beast',
    title: 'Sled Pusher',
    description: 'Crushed a 152kg Sled Push interval under target pace.',
    category: 'hyrox',
    icon: 'Flame',
    unlockedAt: '2026-07-28',
    progressPercent: 100
  },
  {
    id: 'badge_streak_14',
    title: 'Fortnight Machine',
    description: 'Maintained a 14-day consecutive active training streak.',
    category: 'streak',
    icon: 'Zap',
    unlockedAt: '2026-08-01',
    progressPercent: 100
  },
  {
    id: 'badge_social_master',
    title: 'Social Creator',
    description: 'Exported 5 story cards to Instagram or Strava.',
    category: 'social',
    icon: 'Share2',
    unlockedAt: '2026-08-03',
    progressPercent: 100
  },
  {
    id: 'badge_century_club',
    title: 'Century Runner',
    description: 'Logged over 100 kilometers total volume in a single month.',
    category: 'mileage',
    icon: 'Trophy',
    progressPercent: 82
  },
  {
    id: 'badge_wallball_destroyer',
    title: '100 Wallballs',
    description: 'Completed 100 target wall balls in a unbroken HYROX simulation.',
    category: 'hyrox',
    icon: 'Dumbbell',
    progressPercent: 60
  }
];

export const INITIAL_SOCIAL_TEMPLATES: SocialTemplate[] = [
  {
    id: 'temp_dark_linear',
    name: 'Linear Dark',
    category: 'dark_linear',
    backgroundColor: '#121316',
    accentColor: '#FF5500',
    textColor: '#FFFFFF',
    cardBg: '#1A1C20',
    fontStyle: 'mono',
    showMap: true,
    showPace: true,
    showHr: true,
    showElevation: true,
    showQuote: true,
    quoteText: 'Pushed past the wall at KM 8. Sled push felt fast!',
    showBadge: true
  },
  {
    id: 'temp_apple_neon',
    name: 'Apple Fitness Neon',
    category: 'apple_neon',
    backgroundColor: '#000000',
    accentColor: '#00FF66',
    textColor: '#FFFFFF',
    cardBg: '#111111',
    fontStyle: 'sans',
    showMap: true,
    showPace: true,
    showHr: true,
    showElevation: false,
    showQuote: true,
    quoteText: '3 Rings Closed. Tempo run in Zone 4.',
    showBadge: true
  },
  {
    id: 'temp_nike_clean',
    name: 'NRC White Clean',
    category: 'nike_clean',
    backgroundColor: '#FAFAFA',
    accentColor: '#FF5500',
    textColor: '#111827',
    cardBg: '#FFFFFF',
    fontStyle: 'display',
    showMap: true,
    showPace: true,
    showHr: false,
    showElevation: true,
    showQuote: true,
    quoteText: 'Fast legs, focused mind. 12KM long run done.',
    showBadge: false
  },
  {
    id: 'temp_hyrox_fire',
    name: 'HYROX Flame',
    category: 'hyrox_fire',
    backgroundColor: '#180B02',
    accentColor: '#FF6B00',
    textColor: '#FFF3EB',
    cardBg: '#2A1406',
    fontStyle: 'mono',
    showMap: false,
    showPace: true,
    showHr: true,
    showElevation: true,
    showQuote: true,
    quoteText: 'Sled push 152kg + 1km SkiErg simulator completed.',
    showBadge: true
  }
];

export const HYROX_STATIONS_INFO = [
  { name: 'SkiErg', distanceOrReps: '1,000m', targetTimeMin: 4.2, tips: 'Keep a steady 500m split around 2:00. Engage lat muscle pull down.' },
  { name: 'Sled Push', distanceOrReps: '4 x 12.5m (152kg)', targetTimeMin: 2.5, tips: 'Stay low, drive through heels, short explosive strides.' },
  { name: 'Sled Pull', distanceOrReps: '4 x 12.5m (103kg)', targetTimeMin: 3.5, tips: 'Lean backward with core tight, stack rope hand over hand.' },
  { name: 'Burpee Broad Jumps', distanceOrReps: '80m', targetTimeMin: 4.0, tips: 'Pace the jumps evenly. Step forward out of burpee to save quads.' },
  { name: 'Rowing', distanceOrReps: '1,000m', targetTimeMin: 3.8, tips: 'Powerful leg drive (60%), hip hinge (20%), arms pull (20%).' },
  { name: 'Farmers Carry', distanceOrReps: '200m (2x24kg)', targetTimeMin: 2.0, tips: 'Pinch shoulder blades back, fast short steps without swinging.' },
  { name: 'Sandbag Lunges', distanceOrReps: '100m (20kg)', targetTimeMin: 4.5, tips: 'Keep chest upright, knee light touch to floor, steady cadence.' },
  { name: 'Wall Balls', distanceOrReps: '100 Reps (6kg)', targetTimeMin: 5.0, tips: 'Break into sets of 20-15-15-15-15-10-10. Squat deep, catch on the down.' },
];
