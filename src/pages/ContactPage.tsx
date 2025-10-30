import { useState } from 'react';
import { Mail, MessageSquare, Calendar, Twitter, Linkedin, Github, HelpCircle, Phone, Clock, CheckCircle, Send, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from '../components/AnimatedBackground';

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: {
        url: string;
        prefill?: {
          name?: string;
          email?: string;
        };
        utm?: {
          utmSource?: string;
          utmMedium?: string;
        };
      }) => void;
    };
  }
}

export default function ContactPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/your-username/chatbot-consultation',
        prefill: {
          name: formData.name,
          email: formData.email
        },
        utm: {
          utmSource: 'contact-page',
          utmMedium: 'website'
        }
      });
    } else {
      window.open('https://calendly.com/your-username/chatbot-consultation', '_blank');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: 'general', message: '' });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactMethods = [
    {
      id: 'email',
      icon: <Mail className="w-8 h-8" />,
      title: 'Send us an email',
      description: 'For general inquiries and detailed questions',
      action: 'support@aiagent.com',
      actionType: 'mailto',
      responseTime: 'Within 24 hours',
      color: 'from-blue-500 to-cyan-500',
      animationClass: 'hover-elevate'
    },
    {
      id: 'chat',
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Chat with us now',
      description: 'Quick questions? Get instant answers',
      action: 'Start Chat',
      actionType: 'button',
      responseTime: 'Usually responds in minutes',
      color: 'from-emerald-500 to-teal-500',
      animationClass: 'hover-pulse'
    },
    {
      id: 'call',
      icon: <Calendar className="w-8 h-8" />,
      title: 'Schedule a call',
      description: "Let's discuss your chatbot needs in detail",
      action: 'Book a Meeting',
      actionType: 'calendly',
      responseTime: '30-minute consultation',
      badge: 'Free consultation',
      color: 'from-violet-500 to-pink-500',
      animationClass: 'hover-scale'
    },
    {
      id: 'social',
      icon: <Twitter className="w-8 h-8" />,
      title: 'Connect on social',
      description: 'Follow us for updates and tips',
      action: 'Follow Us',
      actionType: 'social',
      color: 'from-pink-500 to-rose-500',
      animationClass: 'hover-bounce'
    },
    {
      id: 'help',
      icon: <HelpCircle className="w-8 h-8" />,
      title: 'Browse help articles',
      description: 'Find answers to common questions',
      action: 'Visit Help Center',
      actionType: 'link',
      color: 'from-amber-500 to-orange-500',
      animationClass: 'hover-flip'
    }
  ];

  const handleAction = (method: typeof contactMethods[0]) => {
    switch (method.actionType) {
      case 'mailto':
        window.location.href = `mailto:${method.action}`;
        break;
      case 'button':
        alert('Chat feature coming soon!');
        break;
      case 'calendly':
        openCalendly();
        break;
      case 'link':
        navigate('/help');
        break;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-900">
      <AnimatedBackground />

      <div className="relative z-10">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fadeIn">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Phone className="w-12 h-12 text-cyan-400 animate-float" />
                <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Let's Talk
              </h1>

              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Choose the best way to reach us - we're here to help bring your chatbot vision to life
              </p>

              <div className="flex items-center justify-center gap-6 mt-8">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-700">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-slate-300 text-sm">We're online now</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-700">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span className="text-slate-300 text-sm">Mon-Fri, 9am-6pm EST</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {contactMethods.map((method, index) => (
                <div
                  key={method.id}
                  className={`contact-card ${method.animationClass} bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-2xl cursor-pointer`}
                  onClick={() => method.id !== 'social' && handleAction(method)}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center mb-4 text-white icon-wrapper`}>
                    {method.icon}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{method.title}</h3>
                  <p className="text-slate-400 mb-4">{method.description}</p>

                  {method.id === 'social' ? (
                    <div className="flex gap-3">
                      <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-slate-300 hover:text-cyan-400 transition-all social-icon"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-slate-300 hover:text-cyan-400 transition-all social-icon"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-slate-300 hover:text-cyan-400 transition-all social-icon"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    </div>
                  ) : method.actionType === 'mailto' ? (
                    <>
                      <a
                        href={`mailto:${method.action}`}
                        className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors block mb-3"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {method.action}
                      </a>
                      <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{method.responseTime}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      {method.badge && (
                        <div className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-semibold mb-3">
                          {method.badge}
                        </div>
                      )}
                      <button
                        className={`w-full py-2 px-4 bg-gradient-to-r ${method.color} text-white font-semibold rounded-lg hover:shadow-lg transition-all`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAction(method);
                        }}
                      >
                        {method.action}
                      </button>
                      {method.responseTime && (
                        <div className="flex items-center gap-2 text-slate-500 text-sm mt-3">
                          <Clock className="w-4 h-4" />
                          <span>{method.responseTime}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 md:p-12 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-3">Or Send Us a Message</h2>
                <p className="text-slate-400">Fill out the form below and we'll get back to you soon</p>
              </div>

              {submitSuccess ? (
                <div className="text-center py-12 animate-fadeIn">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500 flex items-center justify-center animate-bounce">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-slate-300">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-slate-300 font-medium mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-slate-300 font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-slate-300 font-medium mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="technical">Technical Support</option>
                      <option value="sales">Sales</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-slate-300 font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                      placeholder="Tell us about your project or question..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                      isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            <div className="mt-16 text-center">
              <p className="text-slate-400 mb-4">Need immediate assistance?</p>
              <button
                onClick={openCalendly}
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-slate-300 font-medium rounded-lg hover:border-cyan-500 hover:text-white transition-all"
              >
                <Calendar className="w-5 h-5" />
                Book a Free Consultation
              </button>
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

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .contact-card {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }

        .hover-elevate:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(6, 182, 212, 0.3);
        }

        .hover-pulse:hover .icon-wrapper {
          animation: pulse 1s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        .hover-scale:hover {
          transform: scale(1.05);
        }

        .hover-scale:hover .icon-wrapper {
          transform: rotate(5deg) scale(1.1);
        }

        .hover-bounce:hover .social-icon {
          animation: bounce 0.5s ease;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .hover-flip:hover .icon-wrapper {
          animation: flip 0.6s ease;
        }

        @keyframes flip {
          0% {
            transform: rotateY(0);
          }
          50% {
            transform: rotateY(180deg);
          }
          100% {
            transform: rotateY(360deg);
          }
        }
      `}</style>
    </div>
  );
}
