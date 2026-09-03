import React, { useState, useEffect } from 'react';
import { UserProfile, TrainingWeek, WorkoutItem, ActiveView } from './types';
import { DEMO_PROFILES } from './data/initialData';
import { generateTrainingPlan } from './utils/trainingPlanGenerator';

// Components
import { Navigation } from './components/Navigation';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { TrainingPlanView } from './components/TrainingPlanView';
import { WorkoutDetailModal } from './components/WorkoutDetailModal';
import { SocialShareStudio } from './components/SocialShareStudio';
import { ProgressAnalytics } from './components/ProgressAnalytics';
import { RacePlanner } from './components/RacePlanner';
import { AICoachPanel } from './components/AICoachPanel';
import { GamificationBadges } from './components/GamificationBadges';
import { ProfileSettings } from './components/ProfileSettings';
import { AuthModal } from './components/AuthModal';
import { OnboardingFlow } from './components/OnboardingFlow';
import { IntegrationsModal } from './components/IntegrationsModal';

export function App() {
  // Navigation State
  const [currentView, setCurrentView] = useState<ActiveView>('dashboard');

  // User & Plan State
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('strideiq_user');
    return saved ? JSON.parse(saved) : DEMO_PROFILES[0];
  });

  const [plan, setPlan] = useState<TrainingWeek[]>(() => {
    const saved = localStorage.getItem('strideiq_plan');
    if (saved) return JSON.parse(saved);
    return generateTrainingPlan(user);
  });

  // Modal States
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutItem | null>(null);
  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isIntegrationsOpen, setIsIntegrationsOpen] = useState(false);

  // Persist user and plan
  useEffect(() => {
    localStorage.setItem('strideiq_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('strideiq_plan', JSON.stringify(plan));
  }, [plan]);

  // Handlers
  const handleSelectUser = (selectedUser: UserProfile) => {
    setUser(selectedUser);
    const newPlan = generateTrainingPlan(selectedUser);
    setPlan(newPlan);
  };

  const handleOnboardingComplete = (newProfile: UserProfile) => {
    setUser(newProfile);
    const newPlan = generateTrainingPlan(newProfile);
    setPlan(newPlan);
    setIsOnboardingOpen(false);
    setCurrentView('dashboard');
  };

  const handleToggleWorkoutComplete = (workoutId: string) => {
    setPlan(prevPlan => {
      return prevPlan.map(week => ({
        ...week,
        workouts: week.workouts.map(wo => {
          if (wo.id === workoutId) {
            return {
              ...wo,
              completed: !wo.completed,
              actualDistanceKm: !wo.completed ? (wo.targetDistanceKm || 8) : undefined,
              actualPace: !wo.completed ? wo.targetPace : undefined
            };
          }
          return wo;
        })
      }));
    });
  };

  const handleSaveLoggedWorkout = (updatedWorkout: WorkoutItem) => {
    setPlan(prevPlan => {
      return prevPlan.map(week => ({
        ...week,
        workouts: week.workouts.map(wo => {
          if (wo.id === updatedWorkout.id) {
            return updatedWorkout;
          }
          return wo;
        })
      }));
    });
  };

  const handleOpenWorkoutModal = (workout: WorkoutItem) => {
    setSelectedWorkout(workout);
    setIsWorkoutModalOpen(true);
  };

  const handleOpenShareStudioWithWorkout = (workout?: WorkoutItem | null) => {
    if (workout) {
      setSelectedWorkout(workout);
    }
    setIsWorkoutModalOpen(false);
    setCurrentView('share_studio');
  };

  const handleSwitchUser = () => {
    const nextIndex = user.id === DEMO_PROFILES[0].id ? 1 : 0;
    handleSelectUser(DEMO_PROFILES[nextIndex]);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white font-sans selection:bg-orange-500 selection:text-white">
      
      {/* Top Header & Mobile Navigation */}
      <Navigation
        currentView={currentView}
        onNavigate={setCurrentView}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
        onSwitchUser={handleSwitchUser}
      />

      {/* Main View Router */}
      <main>
        {currentView === 'landing' && (
          <LandingPage
            onStartOnboarding={() => setIsOnboardingOpen(true)}
            onExploreDemo={() => setCurrentView('dashboard')}
          />
        )}

        {currentView === 'dashboard' && (
          <Dashboard
            user={user}
            plan={plan}
            onNavigate={setCurrentView}
            onOpenWorkoutModal={handleOpenWorkoutModal}
            onOpenShareStudio={handleOpenShareStudioWithWorkout}
            onToggleWorkoutComplete={handleToggleWorkoutComplete}
          />
        )}

        {currentView === 'plan' && (
          <TrainingPlanView
            plan={plan}
            user={user}
            onOpenWorkoutModal={handleOpenWorkoutModal}
            onToggleWorkoutComplete={handleToggleWorkoutComplete}
            onRegeneratePlan={() => setIsOnboardingOpen(true)}
          />
        )}

        {currentView === 'share_studio' && (
          <SocialShareStudio
            user={user}
            activeWorkout={selectedWorkout}
          />
        )}

        {currentView === 'analytics' && (
          <ProgressAnalytics
            user={user}
          />
        )}

        {currentView === 'race_planner' && (
          <RacePlanner
            user={user}
          />
        )}

        {currentView === 'ai_coach' && (
          <AICoachPanel
            user={user}
            plan={plan}
            onApplyPlanAdjustment={() => {
              const newPlan = generateTrainingPlan(user);
              setPlan(newPlan);
              setCurrentView('plan');
            }}
          />
        )}

        {currentView === 'badges' && (
          <GamificationBadges
            user={user}
          />
        )}

        {currentView === 'profile' && (
          <ProfileSettings
            user={user}
            plan={plan}
            onUpdateUser={setUser}
            onOpenIntegrations={() => setIsIntegrationsOpen(true)}
            onResetPlan={() => setIsOnboardingOpen(true)}
            onLogout={() => setIsAuthOpen(true)}
          />
        )}
      </main>

      {/* Modals */}
      {isWorkoutModalOpen && (
        <WorkoutDetailModal
          workout={selectedWorkout}
          user={user}
          onClose={() => setIsWorkoutModalOpen(false)}
          onToggleComplete={handleToggleWorkoutComplete}
          onOpenShareStudio={handleOpenShareStudioWithWorkout}
          onSaveLoggedWorkout={handleSaveLoggedWorkout}
        />
      )}

      {isAuthOpen && (
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onSelectUser={handleSelectUser}
          onStartOnboarding={() => {
            setIsAuthOpen(false);
            setIsOnboardingOpen(true);
          }}
        />
      )}

      {isOnboardingOpen && (
        <OnboardingFlow
          onComplete={handleOnboardingComplete}
          onCancel={() => setIsOnboardingOpen(false)}
        />
      )}

      {isIntegrationsOpen && (
        <IntegrationsModal
          isOpen={isIntegrationsOpen}
          onClose={() => setIsIntegrationsOpen(false)}
          user={user}
          onUpdateUser={setUser}
        />
      )}

    </div>
  );
}

export default App;
