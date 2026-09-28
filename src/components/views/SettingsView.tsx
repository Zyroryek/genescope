import React, { useState } from 'react';
import {
  User,
  Sliders,
  Bell,
  Database,
  Lock,
  Check,
  Save,
  Moon,
  Sun
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'appearance' | 'notifications' | 'data' | 'security'>('profile');
  const [name, setName] = useState('Alex Mercer');
  const [email, setEmail] = useState('alex.mercer@university.edu');
  const [role, setRole] = useState('Lead Student Analyst');
  const [confidenceInterval, setConfidenceInterval] = useState('95%');
  const [decimalPrecision, setDecimalPrecision] = useState('2');
  const [defaultSort, setDefaultSort] = useState('severityScore');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Settings &amp; Preferences
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Configure analytical parameters, display formatting, notifications, and session credentials.
        </p>
      </div>

      {/* Main Settings Container */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col md:flex-row">
        {/* Navigation Sidebar */}
        <div className="w-full md:w-56 bg-slate-50 border-r border-slate-200 p-3 space-y-1">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg text-left transition-colors cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('appearance')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg text-left transition-colors cursor-pointer ${
              activeTab === 'appearance'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Appearance</span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg text-left transition-colors cursor-pointer ${
              activeTab === 'notifications'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Notification Settings</span>
          </button>

          <button
            onClick={() => setActiveTab('data')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg text-left transition-colors cursor-pointer ${
              activeTab === 'data'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Data Preferences</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-lg text-left transition-colors cursor-pointer ${
              activeTab === 'security'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Security</span>
          </button>
        </div>

        {/* Tab Content Panel */}
        <div className="flex-1 p-6 space-y-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
                Analyst Profile Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Academic Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Role / Affiliation</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-800"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
                Dashboard Theme &amp; Styling
              </h3>
              <p className="text-xs text-slate-500">
                GeneScope is optimized for light high-contrast scientific analytics.
              </p>
              <div className="grid grid-cols-2 gap-4 max-w-sm">
                <div className="p-3 rounded-lg border-2 border-blue-600 bg-white shadow-xs text-center cursor-pointer">
                  <Sun className="w-5 h-5 text-amber-500 mx-auto mb-1.5" />
                  <span className="text-xs font-bold text-slate-900 block">Scientific Light</span>
                  <span className="text-[10px] text-teal-600 font-semibold block mt-0.5">Active Theme</span>
                </div>
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-100 text-center opacity-60 cursor-not-allowed">
                  <Moon className="w-5 h-5 text-slate-400 mx-auto mb-1.5" />
                  <span className="text-xs font-medium text-slate-500 block">Dark Mode</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Planned Feature</span>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
                System Alerts &amp; Pipeline Triggers
              </h3>
              <div className="space-y-3 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-blue-600 rounded" />
                  <span>Notify on completed dataset deduplication &amp; cleaning</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-blue-600 rounded" />
                  <span>Alert when correlation p-value is statistically significant (&lt; 0.01)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-blue-600 rounded" />
                  <span>Log background worker runtime benchmarks</span>
                </label>
              </div>
            </div>
          )}

          {/* Data Preferences Tab */}
          {activeTab === 'data' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
                Analytical Calculation Defaults
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Statistical Significance Confidence Level
                  </label>
                  <select
                    value={confidenceInterval}
                    onChange={(e) => setConfidenceInterval(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-slate-800"
                  >
                    <option value="90%">90% (α = 0.10)</option>
                    <option value="95%">95% (α = 0.05) - Default</option>
                    <option value="99%">99% (α = 0.01)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Decimal Metric Precision
                  </label>
                  <select
                    value={decimalPrecision}
                    onChange={(e) => setDecimalPrecision(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-slate-800"
                  >
                    <option value="1">1 Decimal Place (0.1)</option>
                    <option value="2">2 Decimal Places (0.01) - Default</option>
                    <option value="3">3 Decimal Places (0.001)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
                Session &amp; Security Controls
              </h3>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900">Current Session Token:</span>
                  <span className="font-mono text-blue-700 font-bold">GENESCOPE-DEMO-2026</span>
                </div>
                <p className="text-slate-500">
                  This academic session is running in evaluation mode. No individual patient Protected Health Information (PHI) is transmitted or stored.
                </p>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Preferences Saved</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Preferences</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
