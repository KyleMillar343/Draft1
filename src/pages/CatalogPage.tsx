import { useState } from 'react';
import { Search, Zap, MessageSquare, ShoppingCart, BarChart, Clock, Users, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CatalogPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredAgent, setHoveredAgent] = useState<number | null>(null);

  const categories = [
    { id: 'all', name: 'All Agents', icon: Zap },
    { id: 'customer', name: 'Customer Service', icon: MessageSquare },
    { id: 'sales', name: 'Sales & Marketing', icon: ShoppingCart },
    { id: 'analytics', name: 'Analytics', icon: BarChart },
    { id: 'productivity', name: 'Productivity', icon: Clock },
    { id: 'operations', name: 'Operations', icon: Users }
  ];

  const agents = [
    {
      id: 1,
      name: 'Support Hero',
      category: 'customer',
      description: 'Handles customer inquiries 24/7.',
      capabilities: ['Instant responses', 'Multi-language support', 'Ticket routing'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      name: 'Sales Accelerator',
      category: 'sales',
      description: 'Qualifies leads and books meetings.',
      capabilities: ['Lead scoring', 'Calendar integration', 'Follow-up automation'],
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 3,
      name: 'Data Insight',
      category: 'analytics',
      description: 'Analyzes trends and generates reports.',
      capabilities: ['Real-time dashboards', 'Predictive analytics', 'Custom reports'],
      color: 'from-emerald-500 to-teal-500'
    },
    {
      id: 4,
      name: 'Email Assistant',
      category: 'productivity',
      description: 'Drafts, schedules, and prioritizes emails.',
      capabilities: ['Smart drafting', 'Priority sorting', 'Auto-scheduling'],
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 5,
      name: 'Content Creator',
      category: 'sales',
      description: 'Generates marketing copy and social posts.',
      capabilities: ['SEO optimization', 'Brand voice matching', 'Multi-platform'],
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 6,
      name: 'Meeting Coordinator',
      category: 'productivity',
      description: 'Schedules meetings and sends reminders.',
      capabilities: ['Calendar sync', 'Timezone detection', 'Automated reminders'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 7,
      name: 'Code Reviewer',
      category: 'operations',
      description: 'Reviews code and suggests improvements.',
      capabilities: ['Bug detection', 'Best practices', 'Security scanning'],
      color: 'from-slate-500 to-gray-600'
    },
    {
      id: 8,
      name: 'Invoice Manager',
      category: 'operations',
      description: 'Processes invoices and tracks payments.',
      capabilities: ['Auto-extraction', 'Payment tracking', 'Expense categorization'],
      color: 'from-amber-500 to-yellow-500'
    },
    {
      id: 9,
      name: 'Feedback Analyzer',
      category: 'analytics',
      description: 'Synthesizes customer feedback into insights.',
      capabilities: ['Sentiment analysis', 'Trend detection', 'Action recommendations'],
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: 10,
      name: 'Onboarding Guide',
      category: 'customer',
      description: 'Walks new users through setup.',
      capabilities: ['Interactive tutorials', 'Progress tracking', 'Personalized paths'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 11,
      name: 'Document Processor',
      category: 'operations',
      description: 'Extracts and organizes document data.',
      capabilities: ['OCR scanning', 'Auto-filing', 'Data extraction'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 12,
      name: 'Social Monitor',
      category: 'sales',
      description: 'Tracks brand mentions and engagement.',
      capabilities: ['Real-time monitoring', 'Sentiment tracking', 'Auto-responses'],
      color: 'from-pink-500 to-rose-500'
    }
  ];

  const filteredAgents = agents.filter(agent => {
    const matchesCategory = selectedCategory === 'all' || agent.category === selectedCategory;
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDeployClick = () => {
    navigate('/#contact');
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-cyan-600/20 blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-12 h-12 text-cyan-400" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              AI Agent Catalog
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-2xl">
            Pre-built AI agents ready to transform your business.
          </p>
          <p className="text-lg text-slate-400 mt-2">
            Deploy in minutes. Customize in seconds. Scale infinitely.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search agents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{cat.name}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredAgents.map(agent => (
            <div
              key={agent.id}
              onMouseEnter={() => setHoveredAgent(agent.id)}
              onMouseLeave={() => setHoveredAgent(null)}
              className="group relative bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${agent.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>

              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center shadow-lg`}>
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div className="px-3 py-1 rounded-full text-xs font-medium bg-slate-700/50 text-slate-300 border border-slate-600">
                    {categories.find(c => c.id === agent.category)?.name}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all">
                  {agent.name}
                </h3>

                <p className="text-slate-400 text-sm mb-4">
                  {agent.description}
                </p>

                <div className="space-y-2 mb-4">
                  {agent.capabilities.map((cap, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span className="text-slate-300">{cap}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleDeployClick}
                  className={`w-full py-2.5 rounded-lg font-medium transition-all ${
                    hoveredAgent === agent.id
                      ? `bg-gradient-to-r ${agent.color} text-white shadow-lg`
                      : 'bg-slate-700/50 text-slate-300 border border-slate-600'
                  }`}
                >
                  Deploy Agent
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredAgents.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-400 text-lg">No agents found matching your criteria.</p>
            <p className="text-slate-500 mt-2">Try adjusting your search or filters.</p>
          </div>
        )}

        <div className="bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-cyan-600/20 rounded-2xl p-12 text-center border border-slate-700/50">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Agent?</h2>
          <p className="text-slate-300 text-lg mb-6">Build a unique AI agent tailored to your exact business needs.</p>
          <button
            onClick={handleDeployClick}
            className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-xl hover:shadow-cyan-500/30 transition-all hover:-translate-y-0.5"
          >
            Request Custom Development
          </button>
        </div>
      </div>
    </div>
  );
}
