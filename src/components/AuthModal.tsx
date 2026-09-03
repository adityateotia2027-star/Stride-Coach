import React, { useState } from 'react';
import { X, UserCheck, ArrowRight, Activity, Zap } from 'lucide-react';
import { UserProfile } from '../types';
import { DEMO_PROFILES } from '../data/initialData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectUser: (user: UserProfile) => void;
  onStartOnboarding: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSelectUser,
  onStartOnboarding
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Mock user creation/login
    const customUser: UserProfile = {
      ...DEMO_PROFILES[0],
      id: `user_${Date.now()}`,
      name: email.split('@')[0] || 'Runner',
      email: email,
    };
    onSelectUser(customUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#18181B] border border-white/5 w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl relative text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Activity className="w-6 h-6 text-white stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white font-mono">
              {isSignUp ? 'Create StrideIQ Account' : 'Welcome Back'}
            </h2>
            <p className="text-xs text-gray-400">Your AI-powered endurance hub</p>
          </div>
        </div>

        {/* Quick Demo Athlete Switches */}
        <div className="mb-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-orange-500" />
            <span>Quick Login with Demo Athletes</span>
          </div>

          <div className="space-y-2">
            {DEMO_PROFILES.map((profile) => (
              <button
                key={profile.id}
                onClick={() => {
                  onSelectUser(profile);
                  onClose();
                }}
                className="w-full p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-between text-left transition-all hover:border-orange-500/30 group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-10 h-10 rounded-xl object-cover border border-white/10"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">
                      {profile.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      {profile.targetDistance} • {profile.vdot} VDOT
                    </div>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-semibold flex items-center gap-1">
                  <span>Select</span>
                  <UserCheck className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="relative flex py-2 items-center mb-6">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="flex-shrink mx-4 text-xs text-gray-500 uppercase font-mono">Or Custom Email</span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="athlete@strideiq.fit"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-orange-500 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-orange-500 transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
          >
            <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-white/5 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-gray-400 hover:text-orange-400 transition-colors"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have a plan yet? Build custom plan"}
          </button>
        </div>

      </div>
    </div>
  );
};
