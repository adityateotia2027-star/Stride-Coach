import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import confetti from 'canvas-confetti';
import { 
  Share2, 
  Download, 
  Flame, 
  Palette, 
  Type, 
  Map, 
  Heart, 
  Activity, 
  Quote, 
  Award, 
  Image as ImageIcon,
  Check,
  RotateCcw,
  Sparkles,
  Move
} from 'lucide-react';
import { UserProfile, WorkoutItem, SocialTemplate } from '../types';
import { INITIAL_SOCIAL_TEMPLATES } from '../data/initialData';

interface SocialShareStudioProps {
  user: UserProfile;
  activeWorkout?: WorkoutItem | null;
}

export const SocialShareStudio: React.FC<SocialShareStudioProps> = ({
  user,
  activeWorkout
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  // Default workout metrics if none passed
  const workoutDistance = activeWorkout?.actualDistanceKm || activeWorkout?.targetDistanceKm || 12.4;
  const workoutPace = activeWorkout?.actualPace || activeWorkout?.targetPace || '4:42';
  const workoutTime = activeWorkout?.actualDurationMin || activeWorkout?.targetDurationMin || 58;
  const workoutHr = activeWorkout?.avgHeartRate || 164;
  const workoutTitle = activeWorkout?.title || 'HYROX Station Simulation & Tempo Run';

  // Active customization state
  const [activeTemplate, setActiveTemplate] = useState<SocialTemplate>(INITIAL_SOCIAL_TEMPLATES[0]);
  const [quoteText, setQuoteText] = useState(activeTemplate.quoteText);
  const [customBgImage, setCustomBgImage] = useState<string | null>(null);
  const [showMapWidget, setShowMapWidget] = useState(true);
  const [showPaceWidget, setShowPaceWidget] = useState(true);
  const [showHrWidget, setShowHrWidget] = useState(true);
  const [showElevationWidget, setShowElevationWidget] = useState(true);
  const [showBadgeWidget, setShowBadgeWidget] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  // Widget positioning offsets for drag simulation
  const [mapOffset, setMapOffset] = useState({ x: 0, y: 0 });
  const [statsOffset, setStatsOffset] = useState({ x: 0, y: 0 });

  // Custom Image Upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCustomBgImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Export to High-Res PNG
  const handleDownloadStory = async () => {
    if (!canvasRef.current) return;
    setIsDownloading(true);

    try {
      const canvas = await html2canvas(canvasRef.current, {
        scale: 2, // High resolution output
        useCORS: true,
        backgroundColor: null,
      });

      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `StrideIQ_Story_${Date.now()}.png`;
      link.click();

      // Trigger celebration confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FF5500', '#FFB700', '#FFFFFF']
      });

    } catch (error) {
      console.error("Story Export Error:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto pb-28 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#18181B] border border-white/5 rounded-3xl p-6 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold font-mono uppercase mb-2">
            <Share2 className="w-3.5 h-3.5" />
            <span>INSTAGRAM & STRAVA SHARE STUDIO</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
            Design Your Story Card
          </h1>
        </div>

        <button
          onClick={handleDownloadStory}
          disabled={isDownloading}
          className="px-6 py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs shadow-xl shadow-orange-500/25 transition-all flex items-center gap-2"
        >
          {isDownloading ? (
            <Sparkles className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          <span>{isDownloading ? 'Exporting Image...' : 'Export Story (PNG)'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Canvas Preview (Col Span 5) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          
          <div className="text-xs text-gray-400 font-mono mb-2 flex items-center gap-1">
            <Move className="w-3.5 h-3.5 text-orange-500" />
            <span>9:16 Vertical Story Frame (1080x1920)</span>
          </div>

          {/* Canvas Wrapper */}
          <div 
            ref={canvasRef}
            className="w-[320px] h-[568px] rounded-[36px] p-6 border-4 border-[#18181B] shadow-2xl relative flex flex-col justify-between overflow-hidden text-white select-none transition-all"
            style={{
              backgroundColor: customBgImage ? 'transparent' : activeTemplate.backgroundColor,
              backgroundImage: customBgImage ? `url(${customBgImage})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              color: activeTemplate.textColor
            }}
          >
            {/* Background Overlay Tint if custom bg */}
            {customBgImage && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] pointer-events-none" />
            )}

            {/* Header Brand & Badge */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-orange-500 flex items-center justify-center text-white font-black text-xs shadow-md">
                  IQ
                </div>
                <div>
                  <div className="text-xs font-bold font-mono tracking-tight leading-none">StrideIQ</div>
                  <div className="text-[9px] opacity-70 font-mono">{user.name}</div>
                </div>
              </div>

              {showBadgeWidget && (
                <div className="px-2.5 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-[10px] font-bold font-mono flex items-center gap-1">
                  <Flame className="w-3 h-3 fill-orange-500" />
                  <span>HYROX PRO</span>
                </div>
              )}
            </div>

            {/* Simulated Interactive Route Map Widget */}
            {showMapWidget && (
              <div className="my-auto z-10 p-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 relative overflow-hidden">
                <div className="text-[9px] uppercase font-mono tracking-widest text-gray-400 mb-1">
                  GPS Route Path
                </div>

                {/* SVG Route Line */}
                <svg className="w-full h-24 stroke-orange-500 fill-none stroke-[3]" viewBox="0 0 200 80">
                  <path d="M 10 70 Q 50 10, 90 50 T 170 30 T 190 60" />
                  <circle cx="10" cy="70" r="4" fill="#00FF66" />
                  <circle cx="190" cy="60" r="4" fill="#FF5500" />
                </svg>
              </div>
            )}

            {/* Central Metric Poster Overlay */}
            <div className="my-auto text-center z-10 space-y-2">
              <div className="text-[10px] font-mono tracking-widest uppercase opacity-70 font-bold">
                {workoutTitle}
              </div>

              <div className="text-6xl font-black font-mono tracking-tight text-orange-500 drop-shadow-md">
                {workoutDistance} <span className="text-2xl font-normal text-current">{user.unitPreference}</span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-2 pt-2 max-w-[240px] mx-auto font-mono">
                {showPaceWidget && (
                  <div className="p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
                    <div className="text-[9px] opacity-60 uppercase">Avg Pace</div>
                    <div className="text-sm font-bold text-amber-400">{workoutPace} /{user.unitPreference}</div>
                  </div>
                )}

                {showHrWidget && (
                  <div className="p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
                    <div className="text-[9px] opacity-60 uppercase">Avg HR</div>
                    <div className="text-sm font-bold text-rose-400">{workoutHr} bpm</div>
                  </div>
                )}
              </div>

              {/* Editable Quote Sticker */}
              {quoteText && (
                <div className="p-2.5 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 text-xs italic opacity-90 mx-2 mt-2">
                  "{quoteText}"
                </div>
              )}
            </div>

            {/* Footer Tag */}
            <div className="text-center text-[10px] font-mono tracking-widest opacity-60 z-10">
              CHICAGO • STRIDEIQ.FIT
            </div>

          </div>
        </div>

        {/* Right Column: Customization Controls (Col Span 7) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Template Switcher */}
          <div className="bg-[#18181B] border border-white/5 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Palette className="w-4 h-4 text-orange-500" />
              <span>1. Choose Theme Preset</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {INITIAL_SOCIAL_TEMPLATES.map((tmpl) => {
                const selected = activeTemplate.id === tmpl.id;
                return (
                  <button
                    key={tmpl.id}
                    onClick={() => {
                      setActiveTemplate(tmpl);
                      setQuoteText(tmpl.quoteText);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 ${
                      selected
                        ? 'bg-orange-500/10 border-orange-500 text-white shadow-lg'
                        : 'bg-white/5 border-white/5 text-gray-400 hover:text-white'
                    }`}
                  >
                    <div className="w-full h-8 rounded-xl border border-white/10 flex items-center justify-center font-bold text-[10px]"
                         style={{ backgroundColor: tmpl.backgroundColor, color: tmpl.textColor }}>
                      {tmpl.name}
                    </div>
                    <div className="text-xs font-bold text-white truncate">{tmpl.name}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Toggle Widgets Controls */}
          <div className="bg-[#18181B] border border-white/5 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-orange-500" />
              <span>2. Toggle Story Overlay Widgets</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: 'GPS Route Map', active: showMapWidget, toggle: () => setShowMapWidget(!showMapWidget), icon: Map },
                { label: 'Pace Badge', active: showPaceWidget, toggle: () => setShowPaceWidget(!showPaceWidget), icon: Activity },
                { label: 'Heart Rate', active: showHrWidget, toggle: () => setShowHrWidget(!showHrWidget), icon: Heart },
                { label: 'HYROX Badge', active: showBadgeWidget, toggle: () => setShowBadgeWidget(!showBadgeWidget), icon: Award },
              ].map((w, idx) => {
                const Icon = w.icon;
                return (
                  <button
                    key={idx}
                    onClick={w.toggle}
                    className={`p-3 rounded-2xl border text-xs font-semibold flex items-center justify-between transition-all ${
                      w.active
                        ? 'bg-orange-500/15 border-orange-500 text-white'
                        : 'bg-white/5 border-white/5 text-gray-500'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-orange-400" />
                      <span>{w.label}</span>
                    </div>
                    {w.active && <Check className="w-4 h-4 text-orange-500" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quote & Custom Background Photo Upload */}
          <div className="bg-[#18181B] border border-white/5 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Type className="w-4 h-4 text-orange-500" />
              <span>3. Athlete Quote & Background Photo</span>
            </h3>

            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-mono">Custom Workout Note / Quote</label>
              <input
                type="text"
                value={quoteText}
                onChange={(e) => setQuoteText(e.target.value)}
                placeholder="Crushed the 152kg Sled Push..."
                className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/5 text-white text-xs focus:outline-none focus:border-orange-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-mono">Upload Custom Run Photo Background</label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="bg-upload-input"
                />
                <label
                  htmlFor="bg-upload-input"
                  className="px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-semibold text-gray-300 hover:text-white cursor-pointer transition-all flex items-center gap-2"
                >
                  <ImageIcon className="w-4 h-4 text-orange-400" />
                  <span>Choose Photo...</span>
                </label>

                {customBgImage && (
                  <button
                    onClick={() => setCustomBgImage(null)}
                    className="text-xs text-rose-400 hover:underline font-mono"
                  >
                    Remove Photo
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
