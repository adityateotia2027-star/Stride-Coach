import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle,
  X,
  ChevronRight,
  Zap
} from 'lucide-react';
import { UserProfile, TrainingWeek } from '../types';

interface WeeklyReviewCardProps {
  user: UserProfile;
  plan: TrainingWeek[];
  onNavigateToAI: () => void;
  onDismiss: () => void;
  isDismissed: boolean;
}

export const WeeklyReviewCard: React.FC<WeeklyReviewCardProps> = ({
  user,
  plan,
  onNavigateToAI,
  onDismiss,
  isDismissed
}) => {
  const [review, setReview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const currentWeek = plan[0];
  const completedCount = currentWeek?.workouts?.filter(w => w.completed).length || 0;
  const totalCount = currentWeek?.workouts?.length || 0;

  useEffect(() => {
    if (isDismissed || review) return;

    const fetchWeeklyReview = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/gemini/coach', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: `Give me a brief weekly training review for this week. I completed ${completedCount} of ${totalCount} planned workouts. Provide:
1. A one-line summary of the week
2. What went well (1-2 points)
3. What needs attention (1 point)
4. One recovery note for next week

Keep it concise - under 100 words total.`,
            userProfile: user,
            currentWorkout: currentWeek?.workouts?.[currentWeek.workouts.length - 1],
            conversationHistory: []
          })
        });

        const data = await response.json();
        setReview(data.text || data.fallback || "Week looks solid. Keep the momentum going!");
      } catch (error) {
        console.error("Weekly review error:", error);
        setReview("Week completed. Stay consistent and listen to your body for the next block.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeeklyReview();
  }, [user, plan, completedCount, totalCount, isDismissed, review]);

  if (isDismissed) return null;

  return (
    <div className="bg-[#18181B] border border-orange-500/20 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Weekly Review
              </h3>
              <p className="text-[10px] text-gray-400 font-mono">
                Week {currentWeek?.weekNumber || 1} • {completedCount}/{totalCount} Workouts
              </p>
            </div>
          </div>
          
          <button
            onClick={onDismiss}
            className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Review Content */}
        {isLoading ? (
          <div className="space-y-3 py-2">
            <div className="h-3 bg-white/5 rounded-full w-3/4 animate-pulse" />
            <div className="h-3 bg-white/5 rounded-full w-full animate-pulse" />
            <div className="h-3 bg-white/5 rounded-full w-2/3 animate-pulse" />
          </div>
        ) : review ? (
          <div className="space-y-4">
            <div className="text-sm text-gray-200 leading-relaxed whitespace-pre-line bg-white/5 rounded-2xl p-4 border border-white/5">
              {review}
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={onNavigateToAI}
                className="px-4 py-2 rounded-full bg-orange-500/10 hover:bg-orange-500 text-orange-400 hover:text-white text-xs font-bold transition-all flex items-center gap-2 border border-orange-500/30"
              >
                <span>Chat with Coach</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              
              <button
                onClick={onDismiss}
                className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-bold transition-all"
              >
                Dismiss
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
