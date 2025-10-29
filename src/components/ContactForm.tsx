import { useState } from 'react';
import { Mail, Phone, MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase, ClientInquiry } from '../lib/supabase';

type ContactMethod = 'email' | 'text' | 'phone';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    project_description: '',
    preferred_contact: 'email' as ContactMethod,
    budget_range: '',
    timeline: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleContactMethodChange = (method: ContactMethod) => {
    setFormData({
      ...formData,
      preferred_contact: method,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const inquiry: ClientInquiry = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        company: formData.company || undefined,
        project_description: formData.project_description,
        preferred_contact: formData.preferred_contact,
        budget_range: formData.budget_range || undefined,
        timeline: formData.timeline || undefined,
      };

      const { error } = await supabase
        .from('client_inquiries')
        .insert([inquiry]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        project_description: '',
        preferred_contact: 'email',
        budget_range: '',
        timeline: '',
      });

      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage('Failed to submit your inquiry. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Let's Build Your AI Agent
            </h2>
            <p className="text-xl text-slate-600">
              Tell us about your project and how you'd like us to reach out to you.
            </p>
          </div>

          {submitStatus === 'success' && (
            <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-800">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <p className="font-medium">
                Thank you! We've received your inquiry and will reach out to you soon via your preferred contact method.
              </p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-800">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="font-medium">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
                  placeholder="john@company.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-semibold text-slate-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
                  placeholder="Acme Inc."
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="project_description" className="block text-sm font-semibold text-slate-700 mb-2">
                Describe Your AI Agent Project *
              </label>
              <textarea
                id="project_description"
                name="project_description"
                required
                value={formData.project_description}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all resize-none"
                placeholder="Tell us about your vision for the AI agent. What problems should it solve? What tasks should it automate? Who will use it?"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Preferred Contact Method *
              </label>
              <div className="grid grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => handleContactMethodChange('email')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.preferred_contact === 'email'
                      ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <Mail className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm font-semibold">Email</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleContactMethodChange('text')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.preferred_contact === 'text'
                      ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <MessageSquare className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm font-semibold">Text</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleContactMethodChange('phone')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.preferred_contact === 'phone'
                      ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <Phone className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm font-semibold">Phone Call</span>
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label htmlFor="budget_range" className="block text-sm font-semibold text-slate-700 mb-2">
                  Budget Range
                </label>
                <select
                  id="budget_range"
                  name="budget_range"
                  value={formData.budget_range}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
                >
                  <option value="">Select a range</option>
                  <option value="Under $10k">Under $10k</option>
                  <option value="$10k - $25k">$10k - $25k</option>
                  <option value="$25k - $50k">$25k - $50k</option>
                  <option value="$50k - $100k">$50k - $100k</option>
                  <option value="Over $100k">Over $100k</option>
                </select>
              </div>

              <div>
                <label htmlFor="timeline" className="block text-sm font-semibold text-slate-700 mb-2">
                  Desired Timeline
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
                >
                  <option value="">Select timeline</option>
                  <option value="ASAP">As soon as possible</option>
                  <option value="1-3 months">1-3 months</option>
                  <option value="3-6 months">3-6 months</option>
                  <option value="6+ months">6+ months</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Your Request'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
