import { Mail, Phone, MapPin } from 'lucide-react';
import AILogo from './AILogo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <AILogo className="w-48 h-32" />
            </div>
            <p className="text-slate-400 leading-relaxed">
              Building intelligent AI agents that transform how businesses operate and engage with customers.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-slate-400">
                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>hello@aiagents.dev</span>
              </div>
              <div className="flex items-start gap-3 text-slate-400">
                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start gap-3 text-slate-400">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Business Hours</h3>
            <div className="space-y-2 text-slate-400">
              <p>Monday - Friday: 9am - 6pm PST</p>
              <p>Saturday: 10am - 4pm PST</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
          <p>&copy; {currentYear} ChatForge AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
