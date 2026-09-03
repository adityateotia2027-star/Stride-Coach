import React from 'react';
import { 
  LayoutDashboard, 
  CalendarRange, 
  Share2, 
  TrendingUp, 
  Flag, 
  Sparkles, 
  Award, 
  User, 
  Zap,
  Activity,
  ChevronDown
} from 'lucide-react';
import { UserProfile, ActiveView } from '../types';

interface NavigationProps {
  currentView: ActiveView;
  onNavigate: (view: ActiveView) => void;
  user: UserProfile | null;
  onOpenAuth: () => void;
  onOpenOnboarding: () => void;
  onSwitchUser: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentView,
  onNavigate,
  user,
  onOpenAuth,
  onOpenOnboarding,
  onSwitchUser
}) => {
  const navItems = [
    { id: 'dashboard' as ActiveView, label: 'Today', icon: LayoutDashboard },
    { id: 'plan' as ActiveView, label: 'Plan', icon: CalendarRange },
    { id: 'share_studio' as ActiveView, label: 'Share Studio', icon: Share2, highlight: true },
    { id: 'analytics' as ActiveView, label: 'Analytics', icon: TrendingUp },
    { id: 'race_planner' as ActiveView, label: 'Race Day', icon: Flag },
    { id: 'ai_coach' as ActiveView, label: 'AI Coach', icon: Sparkles },
    { id: 'badges' as ActiveView, label: 'Badges', icon: Award },
    { id: 'profile' as ActiveView, label: 'Profile', icon: User },
  ];

  if (currentView === 'landing') {
    return (
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0A0A0B]/90 border-b border-white/5 px-4 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('landing')}>
          <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center font-black text-xl italic text-white shadow-lg shadow-orange-500/20">
            IQ
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-white font-mono">Stride<span className="text-orange-500">IQ</span></span>
            <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-full">HYROX & Run AI</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAuth}
            className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={onOpenOnboarding}
            className="px-5 py-2 rounded-full font-bold bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25 transition-all transform active:scale-95 text-xs"
          >
            Build Plan
          </button>
        </div>
      </header>
    );
  }

  return (
    <>
      {/* Desktop Top Header Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0A0A0B]/95 border-b border-white/5 px-4 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div 
            className="flex items-center gap-2.5 cursor-pointer group"
            onClick={() => onNavigate('dashboard')}
          >
            <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center font-black text-xl italic text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              IQ
            </div>
            <span className="text-xl font-bold tracking-tight text-white font-mono">Stride<span className="text-orange-500">IQ</span></span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#18181B] p-1.5 rounded-2xl border border-white/5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 font-semibold'
                      : item.highlight
                      ? 'text-orange-400 hover:bg-orange-500/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User profile & streak status */}
        <div className="flex items-center gap-3">
          {user && (
            <div className="flex items-center gap-2 bg-[#18181B] border border-white/5 px-3.5 py-1.5 rounded-full text-xs font-medium text-orange-400">
              <Zap className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
              <span>{user.streakDays} Day Streak</span>
            </div>
          )}

          {user ? (
            <div 
              onClick={onSwitchUser}
              className="flex items-center gap-2 bg-[#18181B] hover:bg-white/5 border border-white/5 p-1.5 pr-3 rounded-2xl cursor-pointer transition-colors"
            >
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-7 h-7 rounded-xl object-cover border border-white/10"
                referrerPolicy="no-referrer"
              />
              <span className="text-xs font-semibold text-gray-200 hidden sm:inline">{user.name}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-4 py-2 text-xs font-bold bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-md transition-all"
            >
              Sign In
            </button>
          )}
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#121214]/95 backdrop-blur-xl border-t border-white/5 px-2 py-2 flex items-center justify-around shadow-2xl">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all ${
                isActive ? 'text-orange-500' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-orange-500/10' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium leading-none">{item.label}</span>
            </button>
          );
        })}
        <button
          onClick={() => onNavigate('ai_coach')}
          className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all ${
            currentView === 'ai_coach' ? 'text-orange-500' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <div className={`p-1 rounded-lg ${currentView === 'ai_coach' ? 'bg-orange-500/10' : ''}`}>
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>
          <span className="text-[10px] font-medium leading-none">AI Coach</span>
        </button>
      </nav>
    </>
  );
};
