import React, { useState } from 'react';
import { 
  Sparkles, 
  Share2, 
  Flame, 
  Trophy, 
  ArrowRight, 
  Activity, 
  Zap, 
  Calendar, 
  Bot,
  CheckCircle2,
  Lock,
  Smartphone
} from 'lucide-react';

interface LandingPageProps {
  onStartOnboarding: () => void;
  onExploreDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartOnboarding,
  onExploreDemo
}) => {
  const [activeStoryTab, setActiveStoryTab] = useState<'linear' | 'nike' | 'hyrox'>('hyrox');

  return (
    <div className="min-h-screen bg-[#121316] text-white selection:bg-orange-500 selection:text-white pb-24">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center overflow-hidden">
        {/* Background Subtle Gradient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-orange-500/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-6 animate-pulse">
          <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
          <span>Built for Runners & HYROX Athletes</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.1] mb-6 font-mono">
          Train <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600">Intelligently</span>. <br />
          Share Beautifully.
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Custom periodized training plans, HYROX station pace optimization, AI coaching, and drag-and-drop Instagram Story cards that make your sweat look iconic.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onStartOnboarding}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-base shadow-xl shadow-orange-500/25 flex items-center justify-center gap-3 transition-all transform active:scale-95"
          >
            <span>Generate Free Training Plan</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onExploreDemo}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#1A1C20] hover:bg-[#24272D] border border-white/10 text-gray-200 font-semibold text-base transition-all flex items-center justify-center gap-2"
          >
            <Activity className="w-5 h-5 text-orange-400" />
            <span>Explore Demo Athlete</span>
          </button>
        </div>

        {/* Feature Highlights Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-2xl bg-[#1A1C20]/80 border border-white/5 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Smart Overload</div>
              <div className="text-xs text-gray-400">12-wk Periodized</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#1A1C20]/80 border border-white/5 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">HYROX Stations</div>
              <div className="text-xs text-gray-400">Sled & Roxzone</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#1A1C20]/80 border border-white/5 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Share Studio</div>
              <div className="text-xs text-gray-400">9:16 Story Export</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#1A1C20]/80 border border-white/5 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">StrideAI Coach</div>
              <div className="text-xs text-gray-400">Real-time Feedback</div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Share Studio Teaser Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="bg-[#1A1C20] rounded-3xl border border-white/10 p-6 sm:p-10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-4">
                <Share2 className="w-3.5 h-3.5" />
                <span>Social Share Studio</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight font-mono">
                Turn Every Workout Into an Instagram Story
              </h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Choose from minimalist dark themes, neon athletic rings, or raw HYROX flame cards. Customize route maps, heart rate graphs, pace badges, and personal notes before exporting directly to your camera roll.
              </p>

              {/* Theme Selector Pills */}
              <div className="flex gap-2 mb-8">
                <button
                  onClick={() => setActiveStoryTab('hyrox')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeStoryTab === 'hyrox'
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-[#24272D] text-gray-400 hover:text-white'
                  }`}
                >
                  HYROX Flame
                </button>
                <button
                  onClick={() => setActiveStoryTab('linear')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeStoryTab === 'linear'
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-[#24272D] text-gray-400 hover:text-white'
                  }`}
                >
                  Linear Dark
                </button>
                <button
                  onClick={() => setActiveStoryTab('nike')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeStoryTab === 'nike'
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-[#24272D] text-gray-400 hover:text-white'
                  }`}
                >
                  NRC White
                </button>
              </div>

              <ul className="space-y-2.5 text-sm text-gray-300 mb-8">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-orange-500" />
                  <span>High-resolution 1080x1920 PNG export</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-orange-500" />
                  <span>Drag-and-drop widget layout positioning</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-orange-500" />
                  <span>Auto-syncs with Strava, Garmin & Apple Health</span>
                </li>
              </ul>

              <button
                onClick={onStartOnboarding}
                className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm shadow-lg shadow-orange-500/20 inline-flex items-center gap-2"
              >
                <span>Build Your Story Card</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right Story Canvas Preview Frame */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-[280px] h-[500px] rounded-[36px] p-4 border-4 border-[#24272D] shadow-2xl relative flex flex-col justify-between overflow-hidden text-white"
                   style={{
                     backgroundColor: activeStoryTab === 'hyrox' ? '#180B02' : activeStoryTab === 'linear' ? '#121316' : '#FAFAFA',
                     color: activeStoryTab === 'nike' ? '#111827' : '#FFFFFF'
                   }}>
                
                {/* Header Sticker */}
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white text-[10px] font-bold">
                      IQ
                    </div>
                    <span className="text-xs font-bold tracking-wider font-mono">StrideIQ</span>
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-full bg-white/10">
                    {activeStoryTab.toUpperCase()}
                  </span>
                </div>

                {/* Center Big Stats */}
                <div className="my-auto text-center z-10 space-y-3">
                  <div className="text-[11px] uppercase tracking-widest font-semibold opacity-70">
                    {activeStoryTab === 'hyrox' ? 'HYROX SIMULATION' : 'TEMPO RUN'}
                  </div>
                  <div className="text-5xl font-black font-mono tracking-tight text-orange-500">
                    12.4 <span className="text-xl font-normal text-current">KM</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 max-w-[200px] mx-auto pt-2">
                    <div className="p-2 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10">
                      <div className="text-[10px] opacity-60">Avg Pace</div>
                      <div className="text-sm font-bold font-mono">4:42 /km</div>
                    </div>
                    <div className="p-2 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10">
                      <div className="text-[10px] opacity-60">Avg HR</div>
                      <div className="text-sm font-bold font-mono">164 bpm</div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-xs italic opacity-90 mx-2">
                    "Pushed through the 152kg sled push. Fast legs!"
                  </div>
                </div>

                {/* Footer Brand */}
                <div className="text-center text-[10px] font-mono tracking-widest opacity-60 z-10">
                  CHICAGO • STRIDEIQ.FIT
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonial / Social Proof */}
      <section className="py-12 px-4 max-w-4xl mx-auto text-center">
        <div className="p-8 rounded-3xl bg-[#1A1C20]/50 border border-white/5 backdrop-blur-md">
          <div className="flex justify-center text-amber-400 gap-1 mb-4">
            {"★".repeat(5)}
          </div>
          <p className="text-lg sm:text-xl text-gray-200 font-medium italic mb-6">
            "StrideIQ is the only app that understands HYROX pacing. It balances running mileage with sled/ski erg station fatigue so I hit race day peak without burning out."
          </p>
          <div className="flex items-center justify-center gap-3">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
              alt="Athlete" 
              className="w-10 h-10 rounded-full object-cover border border-orange-500"
              referrerPolicy="no-referrer"
            />
            <div className="text-left">
              <div className="text-sm font-bold text-white">Marcus Vance</div>
              <div className="text-xs text-orange-400">HYROX Pro & Sub-3 Marathoner</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
