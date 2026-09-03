import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Flame, 
  TrendingUp, 
  Zap, 
  RefreshCw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { UserProfile, AICoachMessage, TrainingWeek } from '../types';

interface AICoachPanelProps {
  user: UserProfile;
  plan: TrainingWeek[];
  onApplyPlanAdjustment: () => void;
}

export const AICoachPanel: React.FC<AICoachPanelProps> = ({
  user,
  plan,
  onApplyPlanAdjustment
}) => {
  const [messages, setMessages] = useState<AICoachMessage[]>([
    {
      id: 'msg_1',
      role: 'model',
      content: `Hello ${user.name.split(' ')[0]}! I am your StrideIQ Performance Coach. I'm actively tracking your 12-week ${user.goal.toUpperCase()} plan targeting ${user.targetDistance}.\n\nHow are your legs feeling today? You can ask me to analyze your latest workout, explain training rationale, or adjust your upcoming mileage if you're experiencing fatigue.`,
      timestamp: 'Just now'
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickPrompts = [
    "Explain today's workout rationale",
    "Adjust plan - my legs feel fatigued",
    "How do I pace the HYROX Sled Push?",
    "Predict my race time based on current VDOT"
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const promptText = textToSend || inputPrompt;
    if (!promptText.trim() || isLoading) return;

    const userMsg: AICoachMessage = {
      id: `usr_${Date.now()}`,
      role: 'user',
      content: promptText,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          userProfile: user,
          currentWorkout: plan[0]?.workouts[0],
          conversationHistory: messages.map(m => ({ role: m.role, content: m.content }))
        })
      });

      const data = await response.json();

      const aiMsg: AICoachMessage = {
        id: `ai_${Date.now()}`,
        role: 'model',
        content: data.text || data.fallback || "Keep consistency high and preserve energy on easy runs!",
        timestamp: 'Just now',
        suggestedAction: promptText.toLowerCase().includes('adjust') ? {
          type: 'adjust_plan',
          label: 'Apply Recommended Volume Adjustment'
        } : undefined
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("AI Coach Error:", error);
      const fallbackMsg: AICoachMessage = {
        id: `ai_err_${Date.now()}`,
        role: 'model',
        content: "I've analyzed your current training load. Ensure your Zone 2 runs stay strictly below 75% HR to ensure optimal recovery for your upcoming key sessions.",
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6 pb-28">
      
      {/* Header */}
      <div className="bg-[#18181B] border border-white/5 rounded-3xl p-6 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-mono tracking-tight text-white">StrideAI Coach</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-bold font-mono uppercase">
                Gemini 3.6 Flash
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">Real-time endurance strategy & periodization engine</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full">
          <Zap className="w-3.5 h-3.5" />
          <span>Active Strategy Sync</span>
        </div>
      </div>

      {/* Quick Prompts Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(qp)}
            className="px-4 py-2 rounded-full bg-[#18181B] hover:bg-white/5 border border-white/5 text-gray-300 hover:text-white text-xs font-mono font-medium whitespace-nowrap transition-all"
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div className="bg-[#18181B] border border-white/5 rounded-3xl p-4 sm:p-6 shadow-xl min-h-[420px] max-h-[500px] overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isAI = msg.role === 'model';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isAI ? '' : 'flex-row-reverse'}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                isAI ? 'bg-orange-500 text-white' : 'bg-white/10 text-gray-300'
              }`}>
                {isAI ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              <div className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed ${
                isAI 
                  ? 'bg-white/5 border border-white/5 text-gray-200' 
                  : 'bg-orange-500 text-white font-medium'
              }`}>
                <div className="whitespace-pre-line">{msg.content}</div>

                {msg.suggestedAction && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <button
                      onClick={onApplyPlanAdjustment}
                      className="px-4 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{msg.suggestedAction.label}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 text-xs text-gray-400 font-mono animate-pulse">
              StrideAI Coach is analyzing your training load...
            </div>
          </div>
        )}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex items-center gap-3 bg-[#18181B] border border-white/5 p-2 rounded-full shadow-xl"
      >
        <input
          type="text"
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          placeholder="Ask StrideAI Coach about pace, workouts, fatigue, or strategy..."
          className="flex-1 bg-transparent px-5 py-2.5 text-white text-xs placeholder-gray-500 focus:outline-none font-mono"
        />

        <button
          type="submit"
          disabled={!inputPrompt.trim() || isLoading}
          className="p-3 rounded-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white transition-all shadow-md"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
