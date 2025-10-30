import { useState } from 'react';
import { Bot, Sparkles, MessageSquare, Heart, Zap, Brain, ChevronRight, ChevronLeft, User, Smile, Briefcase, GraduationCap, Palette, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BuildAgentBackground from '../components/BuildAgentBackground';
import AIAssistant from '../components/AIAssistant';
import Confetti from '../components/Confetti';

interface AgentType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  example: string;
}

interface Personality {
  id: string;
  name: string;
  description: string;
  emoji: string;
  color: string;
  example: string;
}

interface VoiceStyle {
  id: string;
  name: string;
  emoji: string;
  example: string;
}

export default function BuildAgentPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [agentName, setAgentName] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedPersonality, setSelectedPersonality] = useState<string>('');
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showStepConfetti, setShowStepConfetti] = useState(false);

  const namePlaceholders = [
    'BuddyBot',
    'Helper',
    'Genius',
    'Spark',
    'Atlas',
    'Nova',
    'Echo',
    'Sage'
  ];

  const agentTypes: AgentType[] = [
    {
      id: 'customer-support',
      name: 'Customer Support',
      description: 'Help customers 24/7',
      icon: <MessageSquare className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      example: 'Hi! How can I help you today? I\'m here to answer questions and solve problems!'
    },
    {
      id: 'personal-assistant',
      name: 'Personal Assistant',
      description: 'Organize your life',
      icon: <User className="w-8 h-8" />,
      color: 'from-violet-500 to-pink-500',
      example: 'Good morning! I\'ve organized your schedule and have some reminders for you.'
    },
    {
      id: 'teacher',
      name: 'Teacher',
      description: 'Explain and educate',
      icon: <GraduationCap className="w-8 h-8" />,
      color: 'from-emerald-500 to-teal-500',
      example: 'Let me break that down for you step by step. First, let\'s understand the basics...'
    },
    {
      id: 'creative',
      name: 'Creative Helper',
      description: 'Generate ideas',
      icon: <Palette className="w-8 h-8" />,
      color: 'from-pink-500 to-rose-500',
      example: 'I love brainstorming! Here are 5 creative ideas for your project...'
    }
  ];

  const personalities: Personality[] = [
    {
      id: 'friendly',
      name: 'Friendly & Casual',
      description: 'Warm and approachable',
      emoji: '😊',
      color: 'from-cyan-500 to-blue-500',
      example: 'Hey there! I\'d love to help you out with that. Let me see what I can do!'
    },
    {
      id: 'professional',
      name: 'Professional & Concise',
      description: 'Clear and efficient',
      emoji: '💼',
      color: 'from-slate-600 to-slate-800',
      example: 'I can assist you with that. Here\'s the information you need.'
    },
    {
      id: 'energetic',
      name: 'Energetic & Enthusiastic',
      description: 'Exciting and motivating',
      emoji: '🚀',
      color: 'from-orange-500 to-amber-500',
      example: 'Awesome question! I\'m so excited to help you with this! Let\'s dive in!'
    },
    {
      id: 'calm',
      name: 'Calm & Thoughtful',
      description: 'Peaceful and wise',
      emoji: '🧘',
      color: 'from-emerald-500 to-teal-600',
      example: 'Take a moment. Let\'s think through this together, step by step.'
    }
  ];

  const voiceStyles: VoiceStyle[] = [
    { id: 'casual', name: 'Casual & Fun', emoji: '😄', example: 'Uses casual language and emojis' },
    { id: 'formal', name: 'Formal & Polite', emoji: '🎩', example: 'Professional communication style' },
    { id: 'humorous', name: 'Witty & Playful', emoji: '😂', example: 'Adds humor and personality' },
    { id: 'direct', name: 'Direct & Clear', emoji: '🎯', example: 'Gets straight to the point' }
  ];

  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setShowStepConfetti(true);
      setTimeout(() => {
        setShowStepConfetti(false);
        setCurrentStep(currentStep + 1);
      }, 1000);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setCurrentStep(totalSteps);
    }, 500);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return agentName.trim().length > 0;
      case 2:
        return selectedType !== '';
      case 3:
        return selectedPersonality !== '';
      case 4:
        return selectedVoice !== '';
      default:
        return true;
    }
  };

  const getSelectedType = () => agentTypes.find(t => t.id === selectedType);
  const getSelectedPersonality = () => personalities.find(p => p.id === selectedPersonality);
  const getSelectedVoice = () => voiceStyles.find(v => v.id === selectedVoice);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BuildAgentBackground />
      <Confetti active={showConfetti} />
      <Confetti active={showStepConfetti} />

      <div className="relative z-10">
        <div className="container mx-auto px-6 py-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>

          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-6">
                {Array.from({ length: totalSteps }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx + 1 === currentStep
                        ? 'w-12 bg-gradient-to-r from-cyan-500 to-blue-500'
                        : idx + 1 < currentStep
                        ? 'w-8 bg-emerald-500'
                        : 'w-8 bg-slate-700'
                    }`}
                  ></div>
                ))}
              </div>
              <p className="text-slate-400 text-sm">Step {currentStep} of {totalSteps}</p>
            </div>

            {currentStep === 1 && (
              <div className="animate-fadeIn">
                <div className="text-center mb-12">
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <Bot className="w-12 h-12 text-cyan-400 animate-float" />
                    <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    What's your agent's name?
                  </h2>
                  <p className="text-xl text-slate-300">Give your AI a personality from the start!</p>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 max-w-2xl mx-auto">
                  <input
                    type="text"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    placeholder={namePlaceholders[Math.floor(Math.random() * namePlaceholders.length)]}
                    className="w-full bg-slate-900/50 border-2 border-slate-600 rounded-xl px-6 py-4 text-white text-2xl text-center placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    autoFocus
                  />
                  <p className="text-slate-400 text-sm text-center mt-4">
                    Don't worry, you can change this later!
                  </p>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="animate-fadeIn">
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    What should {agentName || 'your agent'} help with?
                  </h2>
                  <p className="text-xl text-slate-300">Pick the main purpose</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {agentTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`group relative bg-slate-800/50 backdrop-blur-sm border-2 rounded-2xl p-8 text-left transition-all hover:scale-105 ${
                        selectedType === type.id
                          ? 'border-cyan-500 shadow-xl shadow-cyan-500/20'
                          : 'border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`}></div>

                      <div className="relative">
                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform`}>
                          {type.icon}
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2">{type.name}</h3>
                        <p className="text-slate-400 mb-4">{type.description}</p>

                        {selectedType === type.id && (
                          <div className="mt-4 p-4 bg-slate-900/50 rounded-lg border border-slate-600 animate-fadeIn">
                            <p className="text-cyan-400 text-sm mb-2 font-medium">Example response:</p>
                            <p className="text-slate-300 text-sm italic">"{type.example}"</p>
                          </div>
                        )}
                      </div>

                      {selectedType === type.id && (
                        <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="animate-fadeIn">
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Choose a personality
                  </h2>
                  <p className="text-xl text-slate-300">How should {agentName || 'your agent'} communicate?</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {personalities.map((personality) => (
                    <button
                      key={personality.id}
                      onClick={() => setSelectedPersonality(personality.id)}
                      className={`group relative bg-slate-800/50 backdrop-blur-sm border-2 rounded-2xl p-8 text-left transition-all hover:scale-105 ${
                        selectedPersonality === personality.id
                          ? 'border-cyan-500 shadow-xl shadow-cyan-500/20'
                          : 'border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${personality.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`}></div>

                      <div className="relative">
                        <div className="text-5xl mb-4">{personality.emoji}</div>

                        <h3 className="text-2xl font-bold text-white mb-2">{personality.name}</h3>
                        <p className="text-slate-400 mb-4">{personality.description}</p>

                        {selectedPersonality === personality.id && (
                          <div className="mt-4 p-4 bg-slate-900/50 rounded-lg border border-slate-600 animate-fadeIn">
                            <p className="text-cyan-400 text-sm mb-2 font-medium">Example tone:</p>
                            <p className="text-slate-300 text-sm italic">"{personality.example}"</p>
                          </div>
                        )}
                      </div>

                      {selectedPersonality === personality.id && (
                        <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="animate-fadeIn">
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Pick a voice style
                  </h2>
                  <p className="text-xl text-slate-300">Almost done! Just one more choice</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                  {voiceStyles.map((voice) => (
                    <button
                      key={voice.id}
                      onClick={() => setSelectedVoice(voice.id)}
                      className={`group relative bg-slate-800/50 backdrop-blur-sm border-2 rounded-2xl p-8 text-center transition-all hover:scale-105 ${
                        selectedVoice === voice.id
                          ? 'border-cyan-500 shadow-xl shadow-cyan-500/20'
                          : 'border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className="text-5xl mb-4">{voice.emoji}</div>
                      <h3 className="text-2xl font-bold text-white mb-2">{voice.name}</h3>
                      <p className="text-slate-400">{voice.example}</p>

                      {selectedVoice === voice.id && (
                        <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="animate-fadeIn text-center">
                <div className="mb-12">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center animate-bounce">
                    <Rocket className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
                    🎉 {agentName} is ready!
                  </h2>
                  <p className="text-2xl text-slate-300 mb-12">Your AI agent is all set to go</p>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 max-w-2xl mx-auto mb-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                      <span className="text-slate-400">Name</span>
                      <span className="text-white font-semibold">{agentName}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                      <span className="text-slate-400">Type</span>
                      <span className="text-white font-semibold">{getSelectedType()?.name}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                      <span className="text-slate-400">Personality</span>
                      <span className="text-white font-semibold">{getSelectedPersonality()?.name}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                      <span className="text-slate-400">Voice</span>
                      <span className="text-white font-semibold">{getSelectedVoice()?.name}</span>
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/30">
                    <p className="text-cyan-400 font-medium mb-3">Preview Message:</p>
                    <div className="bg-slate-900/50 rounded-lg p-4">
                      <p className="text-white italic">{getSelectedPersonality()?.example}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                  <button
                    onClick={() => navigate('/#contact')}
                    className="flex-1 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    Deploy {agentName}
                  </button>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 px-8 py-4 bg-slate-700/50 text-slate-300 font-semibold rounded-lg hover:bg-slate-700 transition-all border border-slate-600"
                  >
                    Make Another
                  </button>
                </div>
              </div>
            )}

            {currentStep < 5 && (
              <div className="flex items-center justify-center gap-4 mt-12">
                {currentStep > 1 && (
                  <button
                    onClick={handleBack}
                    className="px-8 py-3 bg-slate-700/50 text-slate-300 font-medium rounded-lg hover:bg-slate-700 transition-all border border-slate-600 flex items-center gap-2"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    Back
                  </button>
                )}

                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`px-12 py-3 font-semibold rounded-lg transition-all flex items-center gap-2 ${
                    canProceed()
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                      : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {currentStep === 4 ? 'Finish' : 'Continue'}
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <AIAssistant
        currentStep={currentStep}
        agentType={selectedType}
      />

      <style>{`
        @keyframes fadeIn {
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
            transform: translateY(-10px);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
