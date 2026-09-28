import React, { useState } from 'react';
import {
  Workflow,
  ArrowDown,
  ArrowRight,
  LogIn,
  LayoutDashboard,
  Database,
  UploadCloud,
  FileCheck,
  Sparkles,
  BarChart3,
  LineChart,
  Filter,
  GitCompare,
  FileText,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { NavItemKey } from '../layout/Sidebar';

interface FlowStep {
  id: string;
  stepNumber: number;
  label: string;
  targetView: NavItemKey;
  icon: React.ElementType;
  description: string;
  deliverable: string;
  category: 'Access' | 'Data Ingestion' | 'Hygiene' | 'Analytics' | 'Synthesis';
}

interface UserFlowViewProps {
  onNavigateToView: (view: NavItemKey) => void;
}

export const UserFlowView: React.FC<UserFlowViewProps> = ({ onNavigateToView }) => {
  const [hoveredStep, setHoveredStep] = useState<string | null>(null);

  const steps: FlowStep[] = [
    {
      id: 'step-login',
      stepNumber: 1,
      label: 'LOGIN',
      targetView: 'dashboard',
      icon: LogIn,
      description: 'Authenticate via university credentials or instant 1-click Demo Analyst profile.',
      deliverable: 'Authenticated analyst session token',
      category: 'Access'
    },
    {
      id: 'step-dashboard',
      stepNumber: 2,
      label: 'DASHBOARD',
      targetView: 'dashboard',
      icon: LayoutDashboard,
      description: 'Review high-level KPIs, 6 real-time charts, and cohort frequency metrics.',
      deliverable: 'High-level phenotypic cohort orientation',
      category: 'Access'
    },
    {
      id: 'step-select',
      stepNumber: 3,
      label: 'SELECT DATASET',
      targetView: 'dataset',
      icon: Database,
      description: 'Switch between primary multi-cohort, pediatric rare variant, or custom uploaded sets.',
      deliverable: 'Active cohort dataframe loaded in memory',
      category: 'Data Ingestion'
    },
    {
      id: 'step-upload',
      stepNumber: 4,
      label: 'UPLOAD DATA',
      targetView: 'upload',
      icon: UploadCloud,
      description: 'Drag & drop external CSV, JSON, or XLSX files into the stream parser.',
      deliverable: 'Raw file ingestion buffer',
      category: 'Data Ingestion'
    },
    {
      id: 'step-validate',
      stepNumber: 5,
      label: 'VALIDATE',
      targetView: 'upload',
      icon: FileCheck,
      description: 'Verify 12 required fields, data types, missing rates, and duplicate counts.',
      deliverable: 'Schema conformance audit log',
      category: 'Hygiene'
    },
    {
      id: 'step-clean',
      stepNumber: 6,
      label: 'CLEAN DATA',
      targetView: 'cleaning',
      icon: Sparkles,
      description: 'Execute missing value imputation (median), deduplication, and string normalization.',
      deliverable: 'Standardized matrix (99.8% completeness)',
      category: 'Hygiene'
    },
    {
      id: 'step-eda',
      stepNumber: 7,
      label: 'RUN EDA',
      targetView: 'eda',
      icon: BarChart3,
      description: 'Inspect descriptive statistics, central tendency, quartiles, and boxplot outliers.',
      deliverable: 'Automated statistical observations & five-number summaries',
      category: 'Analytics'
    },
    {
      id: 'step-viz',
      stepNumber: 8,
      label: 'CREATE VISUALIZATION',
      targetView: 'studio',
      icon: LineChart,
      description: 'Map X/Y axes, pick chart types (Scatter, Boxplot, Heatmap), and adjust filters.',
      deliverable: 'Custom vector SVG visualization exports',
      category: 'Analytics'
    },
    {
      id: 'step-filter',
      stepNumber: 9,
      label: 'APPLY FILTERS',
      targetView: 'dashboard',
      icon: Filter,
      description: 'Slice the active cohort by age bracket, gender, inheritance type, or geography.',
      deliverable: 'Sub-cohort targeted distribution updates',
      category: 'Analytics'
    },
    {
      id: 'step-compare',
      stepNumber: 10,
      label: 'COMPARE',
      targetView: 'comparison',
      icon: GitCompare,
      description: 'Contrast two distinct disorders side-by-side across age, severity, and heredity.',
      deliverable: 'Differential clinical cohort contrast report',
      category: 'Analytics'
    },
    {
      id: 'step-report',
      stepNumber: 11,
      label: 'GENERATE REPORT',
      targetView: 'reports',
      icon: FileText,
      description: 'Compile findings, charts, and observations into an academic capstone dossier.',
      deliverable: 'Downloadable TXT dossier & print-ready summary',
      category: 'Synthesis'
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Application User Flow
          </h1>
          <span className="text-[11px] font-mono text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded font-medium">
            WORKFLOW MAP
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Visual analytical journey mapping each operational phase from user authentication to report generation.
        </p>
      </div>

      {/* Interactive Flowchart Container */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Chronological User Journey (Click any node to navigate)
          </span>
          <span className="text-[11px] font-mono text-blue-600 font-semibold">11 Analytical Milestones</span>
        </div>

        {/* Step Cards Flow */}
        <div className="flex flex-col items-center gap-2">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isHovered = hoveredStep === step.id;

            return (
              <React.Fragment key={step.id}>
                {/* Flow Node Card */}
                <div
                  onMouseEnter={() => setHoveredStep(step.id)}
                  onMouseLeave={() => setHoveredStep(null)}
                  onClick={() => onNavigateToView(step.targetView)}
                  className={`w-full max-w-2xl p-4 rounded-xl border transition-all cursor-pointer group ${
                    isHovered
                      ? 'bg-blue-50/90 border-blue-600 shadow-sm ring-2 ring-blue-500/20 translate-x-1'
                      : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs transition-colors shrink-0 ${
                          isHovered
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-slate-700 border border-slate-200 group-hover:border-slate-300'
                        }`}
                      >
                        {step.stepNumber < 10 ? `0${step.stepNumber}` : step.stepNumber}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                            {step.label}
                          </h4>
                          <span className="text-[10px] font-mono text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                            {step.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {step.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <span className="text-[10px] font-mono text-teal-700 bg-teal-50 px-2 py-0.5 rounded font-medium">
                        {step.deliverable.split(' ')[0]} output
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Vertical Downward Connector */}
                {idx < steps.length - 1 && (
                  <div className="flex items-center justify-center text-slate-300 py-0.5">
                    <ArrowDown className="w-4 h-4 text-blue-500/70" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
