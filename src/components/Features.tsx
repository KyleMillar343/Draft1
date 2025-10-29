import { Brain, Code, Zap, Shield, Users, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Intelligent Solutions',
    description: 'AI agents powered by cutting-edge machine learning models, trained to understand your business context.',
  },
  {
    icon: Code,
    title: 'Custom Development',
    description: 'Every agent is built from scratch to match your exact requirements and integrate seamlessly with your systems.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized performance with real-time responses, handling thousands of interactions simultaneously.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level encryption and compliance with industry standards to protect your sensitive data.',
  },
  {
    icon: Users,
    title: 'User-Centric Design',
    description: 'Intuitive interfaces that your team and customers will love, with minimal learning curve.',
  },
  {
    icon: TrendingUp,
    title: 'Scalable Architecture',
    description: 'Built to grow with your business, from startup to enterprise-level deployment.',
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Why Choose Us
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            We combine technical excellence with business understanding to deliver AI solutions that drive real results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200 hover:border-cyan-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
