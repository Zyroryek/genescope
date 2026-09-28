import React, { useState } from 'react';
import { X, Lock, Mail, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { GeneScopeLogo } from '../layout/GeneScopeLogo';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onLoginSuccess(email.trim());
      onClose();
    }
  };

  const handleContinueWithDemo = () => {
    onLoginSuccess('analyst.demo@genescope.internal');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 text-center space-y-2">
          <div className="flex justify-center mb-3">
            <GeneScopeLogo size="lg" showText={false} />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Sign in to GeneScope</h2>
          <p className="text-xs text-slate-500">
            Access genetic disorder exploration datasets, EDA summaries, and custom visual charts.
          </p>
        </div>

        {/* Demo Fast-Track Card */}
        <div className="mb-6 p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-900">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Academic Demonstration Access</span>
          </div>
          <p className="text-[11px] text-blue-800 leading-relaxed">
            For academic project grading and peer exploration, no password is required.
          </p>
          <button
            type="button"
            onClick={handleContinueWithDemo}
            className="w-full mt-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Continue with Demo Analyst Profile</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-2 text-slate-400 uppercase tracking-wider font-mono text-[10px]">
              Or Custom Sign In
            </span>
          </div>
        </div>

        {/* Traditional Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@university.edu"
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            Sign In with Credentials
          </button>
        </form>

        <p className="mt-4 text-[10px] text-center text-slate-400">
          Synthetic demo security session · Data Exploration and Visualization
        </p>
      </div>
    </div>
  );
};
