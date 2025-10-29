import { X } from 'lucide-react';
import { useEffect } from 'react';

interface Agent {
  id: number;
  name: string;
  category: string;
  description: string;
  capabilities: string[];
  color: string;
  detailedDescription: string;
  features: string[];
  icon: React.ReactNode;
}

interface AgentModalProps {
  agent: Agent | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function AgentModal({ agent, isOpen, onClose }: AgentModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen || !agent) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-700">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <div className="flex items-start gap-6 mb-6">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${agent.color} flex items-center justify-center shadow-xl flex-shrink-0`}>
              {agent.icon}
            </div>

            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white mb-2">{agent.name}</h2>
              <p className="text-slate-400 text-lg">{agent.description}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-3">About This Agent</h3>
            <p className="text-slate-300 leading-relaxed">{agent.detailedDescription}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-3">Core Capabilities</h3>
            <div className="space-y-3">
              {agent.capabilities.map((capability, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${agent.color} mt-2 flex-shrink-0`}></div>
                  <p className="text-slate-300">{capability}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-3">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {agent.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-3"
                >
                  <p className="text-slate-300 text-sm">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className={`flex-1 py-3 rounded-lg font-medium bg-gradient-to-r ${agent.color} text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5`}
            >
              Deploy Agent
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-lg font-medium bg-slate-700/50 text-slate-300 border border-slate-600 hover:bg-slate-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
