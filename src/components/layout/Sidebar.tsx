import React, { useState } from 'react';
import {
  LayoutDashboard,
  Database,
  Sparkles,
  BarChart3,
  GitCompare,
  FileText,
  LineChart,
  Home,
  Compass,
  ChevronDown,
  ChevronRight,
  Code2,
  Workflow,
  Network,
  ShieldCheck,
  Settings as SettingsIcon,
  HelpCircle
} from 'lucide-react';
import { GeneScopeLogo } from './GeneScopeLogo';

export type NavItemKey =
  | 'landing'
  | 'dashboard'
  | 'dataset'
  | 'upload'
  | 'cleaning'
  | 'eda'
  | 'studio'
  | 'correlation'
  | 'comparison'
  | 'reports'
  | 'architecture'
  | 'pipeline'
  | 'userflow'
  | 'admin'
  | 'settings';

interface SidebarProps {
  currentView: NavItemKey;
  onNavigate: (view: NavItemKey) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  isOpenMobile = false,
  onCloseMobile
}) => {
  const [showTechnical, setShowTechnical] = useState(
    ['architecture', 'pipeline', 'userflow', 'admin'].includes(currentView)
  );

  const mainNavItems = [
    { key: 'dashboard' as NavItemKey, label: 'Dashboard', icon: LayoutDashboard, desc: 'Key charts & stats' },
    { key: 'dataset' as NavItemKey, label: 'Data Table', icon: Database, desc: 'Browse records' },
    { key: 'cleaning' as NavItemKey, label: 'Data Quality', icon: Sparkles, desc: 'Clean & check data' },
    { key: 'eda' as NavItemKey, label: 'Explore & Stats', icon: BarChart3, desc: 'Averages & spread' },
    { key: 'studio' as NavItemKey, label: 'Chart Builder', icon: LineChart, desc: 'Make custom charts' },
    { key: 'correlation' as NavItemKey, label: 'Correlation', icon: Compass, desc: 'Variable links' },
    { key: 'comparison' as NavItemKey, label: 'Compare Disorders', icon: GitCompare, desc: 'Side-by-side view' },
    { key: 'reports' as NavItemKey, label: 'Reports', icon: FileText, desc: 'Summary report' }
  ];

  const technicalNavItems = [
    { key: 'architecture' as NavItemKey, label: 'Architecture Diagram', icon: Network },
    { key: 'pipeline' as NavItemKey, label: 'Data Pipeline Steps', icon: Code2 },
    { key: 'userflow' as NavItemKey, label: 'User Flowchart', icon: Workflow },
    { key: 'admin' as NavItemKey, label: 'Admin Console', icon: ShieldCheck }
  ];

  const handleSelect = (key: NavItemKey) => {
    onNavigate(key);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-40 w-60 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 ease-in-out ${
        isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <button
          onClick={() => handleSelect('landing')}
          className="text-left focus:outline-none hover:opacity-90 transition-opacity"
          title="Go to Introduction Overview"
        >
          <GeneScopeLogo size="sm" />
        </button>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
        <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-1.5">
          Main Analytics
        </div>

        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.key;

          return (
            <button
              key={item.key}
              onClick={() => handleSelect(item.key)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg transition-colors text-left cursor-pointer ${
                isActive
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${
                  isActive ? 'text-blue-600' : 'text-slate-400'
                }`}
              />
              <span className="truncate">{item.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 ml-auto shrink-0" />
              )}
            </button>
          );
        })}

        {/* Collapsible Technical & Architecture Section */}
        <div className="pt-3 mt-2 border-t border-slate-100">
          <button
            onClick={() => setShowTechnical(!showTechnical)}
            className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider hover:text-slate-600 cursor-pointer"
          >
            <span>Project Architecture</span>
            {showTechnical ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5" />
            )}
          </button>

          {showTechnical && (
            <div className="mt-1 space-y-0.5">
              {technicalNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.key;

                return (
                  <button
                    key={item.key}
                    onClick={() => handleSelect(item.key)}
                    className={`w-full flex items-center gap-2.5 px-3 py-1.5 text-xs rounded-lg transition-colors text-left cursor-pointer ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-semibold'
                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick link to Overview & Settings */}
        <div className="pt-2 border-t border-slate-100 space-y-0.5">
          <button
            onClick={() => handleSelect('landing')}
            className={`w-full flex items-center gap-2.5 px-3 py-1.5 text-xs rounded-lg transition-colors text-left cursor-pointer ${
              currentView === 'landing'
                ? 'bg-blue-50 text-blue-700 font-semibold'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Home className="w-3.5 h-3.5 text-slate-400" />
            <span>Welcome Page</span>
          </button>
          <button
            onClick={() => handleSelect('settings')}
            className={`w-full flex items-center gap-2.5 px-3 py-1.5 text-xs rounded-lg transition-colors text-left cursor-pointer ${
              currentView === 'settings'
                ? 'bg-blue-50 text-blue-700 font-semibold'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <SettingsIcon className="w-3.5 h-3.5 text-slate-400" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Simplified Bottom Card */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-2 px-1">
          <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-[10px]">
            AM
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-slate-800 truncate">Alex Mercer</p>
            <p className="text-[10px] text-slate-400 truncate">Student Analyst</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
