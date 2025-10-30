import { Wand2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from './AnimatedBackground';
import AILogo from './AILogo';

export default function Hero() {
  const navigate = useNavigate();

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative text-white overflow-hidden">
      <AnimatedBackground />

      <div className="container mx-auto px-6 py-24 md:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-8">
            <AILogo className="w-32 h-32 md:w-40 md:h-40" variant="full" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Custom AI Agents
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Built For Your Business
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed">
            We design and develop intelligent AI agents tailored to your unique needs.
            From automation to customer engagement, we transform your vision into reality.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/build-agent')}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
            >
              <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Start Building
            </button>
            <button
              onClick={scrollToContact}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-200 border border-white/20"
            >
              Schedule a Call
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
