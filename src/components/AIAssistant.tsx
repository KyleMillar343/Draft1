import { useState, useEffect } from 'react';
import { Sparkles, X, CheckCircle, Clock } from 'lucide-react';

interface Suggestion {
  message: string;
  action: string;
  onAccept: () => void;
}

interface AIAssistantProps {
  currentStep: number;
  agentType?: string;
  onSuggestionAccept?: () => void;
}

export default function AIAssistant({ currentStep, agentType, onSuggestionAccept }: AIAssistantProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentSuggestion, setCurrentSuggestion] = useState<Suggestion | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const suggestions: Record<number, Record<string, Suggestion>> = {
    2: {
      'customer-support': {
        message: "Hey! Since you're building a customer support agent, want to add a friendly greeting message?",
        action: "Add Greeting",
        onAccept: () => {}
      },
      'personal-assistant': {
        message: "Great choice! Personal assistants work best when they remember your preferences. Should we enable that?",
        action: "Enable Memory",
        onAccept: () => {}
      },
      'teacher': {
        message: "Teaching agents love examples! Want to add the ability to create practice questions?",
        action: "Add Practice Mode",
        onAccept: () => {}
      },
      'creative': {
        message: "Idea: Your creative helper could generate images too! Want to enable that?",
        action: "Enable Images",
        onAccept: () => {}
      }
    },
    3: {
      general: {
        message: "That's a great personality choice! People love agents that remember past conversations. Should we turn that on?",
        action: "Enable Memory",
        onAccept: () => {}
      }
    },
    4: {
      general: {
        message: "Your agent is looking awesome! Want to add quick reply buttons to make it even more helpful?",
        action: "Add Quick Replies",
        onAccept: () => {}
      }
    }
  };

  useEffect(() => {
    if (currentStep > 1) {
      const timer = setTimeout(() => {
        setIsVisible(true);

        const stepSuggestions = suggestions[currentStep];
        if (stepSuggestions) {
          const suggestion = agentType && stepSuggestions[agentType]
            ? stepSuggestions[agentType]
            : stepSuggestions.general;

          if (suggestion) {
            setCurrentSuggestion(suggestion);
          }
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [currentStep, agentType]);

  const handleAccept = () => {
    setShowCelebration(true);
    if (currentSuggestion?.onAccept) {
      currentSuggestion.onAccept();
    }
    if (onSuggestionAccept) {
      onSuggestionAccept();
    }

    setTimeout(() => {
      setShowCelebration(false);
      setIsVisible(false);
      setCurrentSuggestion(null);
    }, 2000);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setCurrentSuggestion(null);
  };

  if (!isVisible || !currentSuggestion) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slideInUp">
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform animate-pulse-slow"
        >
          <Sparkles className="w-8 h-8 text-white" />
        </button>
      ) : (
        <div className="bg-slate-800 border-2 border-cyan-500/50 rounded-2xl shadow-2xl max-w-sm animate-slideInUp">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center animate-float">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-white font-semibold">AI Helper</h4>
                <p className="text-cyan-100 text-xs">Here to help!</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(true)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <Clock className="w-5 h-5" />
              </button>
              <button
                onClick={handleDismiss}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6">
            {showCelebration ? (
              <div className="text-center py-8 animate-fadeIn">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500 flex items-center justify-center animate-bounce">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <p className="text-white font-semibold text-lg mb-2">Awesome!</p>
                <p className="text-slate-300 text-sm">Your agent just got better!</p>
              </div>
            ) : (
              <>
                <p className="text-slate-200 leading-relaxed mb-6">
                  {currentSuggestion.message}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={handleAccept}
                    className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    {currentSuggestion.action} ✓
                  </button>
                  <button
                    onClick={handleDismiss}
                    className="px-4 py-3 bg-slate-700 text-slate-300 font-medium rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    Maybe Later
                  </button>
                </div>

                <p className="text-slate-400 text-xs text-center mt-4">
                  I'll be here if you need ideas 😊
                </p>
              </>
            )}
          </div>

          <div className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-400 rounded-full animate-ping"></div>
        </div>
      )}

      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-slideInUp {
          animation: slideInUp 0.5s ease-out;
        }

        .animate-float {
          animation: float 2s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
