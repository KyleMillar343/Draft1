import { useState, useEffect } from 'react';
import { Bot, Sparkles, Palette, Globe, Brain, Zap, MessageSquare, Settings, CheckCircle, ChevronRight, Lightbulb, Code, Database, Languages } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BuildAgentBackground from '../components/BuildAgentBackground';

interface Suggestion {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
  color: string;
}

interface ConfigSection {
  id: string;
  title: string;
  completed: boolean;
}

export default function BuildAgentPage() {
  const navigate = useNavigate();
  const [currentSuggestion, setCurrentSuggestion] = useState(0);
  const [expandedSuggestion, setExpandedSuggestion] = useState<string | null>(null);
  const [configSections, setConfigSections] = useState<ConfigSection[]>([
    { id: 'personality', title: 'Define Personality', completed: false },
    { id: 'capabilities', title: 'Select Capabilities', completed: false },
    { id: 'integration', title: 'Add Integrations', completed: false },
    { id: 'deployment', title: 'Configure Deployment', completed: false }
  ]);

  const suggestions: Suggestion[] = [
    {
      id: 'personality',
      title: 'Add Personality with Custom Tone',
      description: 'Make your agent unique with personality settings',
      icon: <Palette className="w-6 h-6" />,
      details: [
        'Choose from professional, friendly, or technical tones',
        'Customize response style and language patterns',
        'Set emotional intelligence levels',
        'Define brand voice guidelines'
      ],
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: 'knowledge',
      title: 'Integrate Knowledge Bases',
      description: 'Connect documents and data sources',
      icon: <Database className="w-6 h-6" />,
      details: [
        'Upload PDFs, docs, and knowledge articles',
        'Connect to existing databases',
        'Sync with cloud storage',
        'Auto-update from your CMS'
      ],
      color: 'from-blue-500 to-violet-500'
    },
    {
      id: 'language',
      title: 'Enable Multi-Language Support',
      description: 'Reach global audiences seamlessly',
      icon: <Languages className="w-6 h-6" />,
      details: [
        'Support 100+ languages automatically',
        'Detect user language preferences',
        'Maintain context across languages',
        'Localize responses culturally'
      ],
      color: 'from-violet-500 to-pink-500'
    },
    {
      id: 'api',
      title: 'Add Custom API Integrations',
      description: 'Connect to your existing tools',
      icon: <Code className="w-6 h-6" />,
      details: [
        'Integrate with CRM systems',
        'Connect payment processors',
        'Link calendar and scheduling tools',
        'Custom webhook configurations'
      ],
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'memory',
      title: 'Implement Conversation Memory',
      description: 'Build context-aware experiences',
      icon: <Brain className="w-6 h-6" />,
      details: [
        'Remember user preferences',
        'Track conversation history',
        'Personalize responses over time',
        'Context-aware recommendations'
      ],
      color: 'from-emerald-500 to-teal-500'
    },
    {
      id: 'workflow',
      title: 'Create Custom Workflows',
      description: 'Automate complex business processes',
      icon: <Zap className="w-6 h-6" />,
      details: [
        'Visual workflow builder',
        'Conditional logic and branching',
        'Multi-step automations',
        'Schedule and trigger events'
      ],
      color: 'from-orange-500 to-amber-500'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSuggestion((prev) => (prev + 1) % suggestions.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [suggestions.length]);

  const handleSuggestionClick = (id: string) => {
    setExpandedSuggestion(expandedSuggestion === id ? null : id);
  };

  const progress = (configSections.filter(s => s.completed).length / configSections.length) * 100;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BuildAgentBackground />

      <div className="relative z-10">
        <div className="container mx-auto px-6 py-12">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
          >
            <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>

          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fadeIn">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="relative">
                  <Bot className="w-16 h-16 text-cyan-400 animate-float" strokeWidth={1.5} />
                  <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="text-white">Bring Your AI Vision</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 animate-gradient">
                  To Life
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                Design a custom AI agent perfectly tailored to your business needs.
                No coding required.
              </p>

              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-700">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-slate-300 text-sm">Live Configuration</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-700">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="text-slate-300 text-sm">AI-Powered</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300 animate-slideInLeft">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                      <Lightbulb className="w-6 h-6 text-yellow-400" />
                      Smart Suggestions
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={suggestion.id}
                        onClick={() => handleSuggestionClick(suggestion.id)}
                        className={`cursor-pointer group relative overflow-hidden rounded-xl border transition-all duration-300 ${
                          index === currentSuggestion
                            ? 'border-cyan-500 shadow-lg shadow-cyan-500/20 scale-105'
                            : 'border-slate-700 hover:border-slate-600'
                        } ${
                          expandedSuggestion === suggestion.id ? 'md:col-span-2' : ''
                        }`}
                        style={{
                          animation: index === currentSuggestion ? 'pulse 2s ease-in-out infinite' : 'none'
                        }}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${suggestion.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>

                        <div className="relative p-6">
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${suggestion.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                              {suggestion.icon}
                            </div>

                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                                {suggestion.title}
                              </h3>
                              <p className="text-slate-400 text-sm mb-3">
                                {suggestion.description}
                              </p>

                              {expandedSuggestion === suggestion.id && (
                                <div className="space-y-2 animate-fadeIn">
                                  {suggestion.details.map((detail, idx) => (
                                    <div key={idx} className="flex items-start gap-2">
                                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                                      <span className="text-slate-300 text-sm">{detail}</span>
                                    </div>
                                  ))}
                                  <button className={`mt-4 w-full py-2 rounded-lg bg-gradient-to-r ${suggestion.color} text-white font-medium hover:shadow-lg transition-all`}>
                                    Add to Agent
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 animate-slideInLeft" style={{ animationDelay: '0.2s' }}>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Settings className="w-6 h-6 text-cyan-400" />
                    Agent Configuration
                  </h2>

                  <div className="space-y-4">
                    {configSections.map((section) => (
                      <div
                        key={section.id}
                        className="group p-4 bg-slate-700/30 rounded-xl border border-slate-600/50 hover:border-cyan-500/50 transition-all cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                              section.completed
                                ? 'border-emerald-400 bg-emerald-400'
                                : 'border-slate-500 group-hover:border-cyan-400'
                            }`}>
                              {section.completed && <CheckCircle className="w-4 h-4 text-white" />}
                            </div>
                            <span className="text-white font-medium">{section.title}</span>
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 animate-slideInRight sticky top-24">
                  <h3 className="text-xl font-bold text-white mb-4">Build Progress</h3>

                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-400 text-sm">Completion</span>
                      <span className="text-cyan-400 font-semibold">{Math.round(progress)}%</span>
                    </div>
                    <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Features Added</span>
                      <span className="text-white font-medium">0 / 12</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Integrations</span>
                      <span className="text-white font-medium">0 / 8</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Est. Setup Time</span>
                      <span className="text-white font-medium">15 min</span>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 group">
                    <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Start Building
                  </button>

                  <button
                    onClick={() => navigate('/#contact')}
                    className="w-full mt-3 py-3 bg-slate-700/50 text-slate-300 font-semibold rounded-lg hover:bg-slate-700 transition-all border border-slate-600"
                  >
                    Get Expert Help
                  </button>
                </div>

                <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6 animate-slideInRight" style={{ animationDelay: '0.1s' }}>
                  <div className="flex items-start gap-3 mb-4">
                    <Lightbulb className="w-6 h-6 text-yellow-400 flex-shrink-0 animate-pulse" />
                    <div>
                      <h4 className="text-white font-semibold mb-2">Pro Tip</h4>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        Start with personality settings to give your agent a unique voice, then add capabilities based on your specific use case.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out;
        }

        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
