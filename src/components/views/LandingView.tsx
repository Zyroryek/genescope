import React from 'react';
import {
  BarChart3,
  Sparkles,
  Database,
  ArrowRight,
  GitCompare,
  FileText,
  Activity,
  Compass,
  Cpu,
  Shield,
  Layers,
  CheckCircle2,
  Table
} from 'lucide-react';
import { GeneScopeLogo } from '../layout/GeneScopeLogo';
import { DatasetMetadata } from '../../types/dataset';

interface LandingViewProps {
  onOpenDashboard: () => void;
  onExploreDataset: () => void;
  datasetMetadata: DatasetMetadata;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onOpenDashboard,
  onExploreDataset,
  datasetMetadata
}) => {
  const features = [
    {
      title: 'Data Exploration',
      description: 'Filter multidimensional cohorts across age, gender, genetic inheritance patterns, and clinical phenotypes.',
      icon: Compass,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'Interactive Visualizations',
      description: 'Explore horizontal distributions, age histograms, inheritance donuts, stacked clinical correlations, and heatmaps.',
      icon: BarChart3,
      color: 'text-teal-600',
      bg: 'bg-teal-50'
    },
    {
      title: 'Data Quality Analysis',
      description: 'Audit dataset completeness, detect missing values, flag duplicate records, and standardize categorical data types.',
      icon: Sparkles,
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      title: 'Statistical Insights',
      description: 'Compute descriptive statistics, quartiles, Pearson correlation coefficients, and automated observational summaries.',
      icon: Activity,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50'
    },
    {
      title: 'Dataset Comparison',
      description: 'Execute side-by-side differential analysis between any two genetic conditions with synchronized distribution charts.',
      icon: GitCompare,
      color: 'text-cyan-600',
      bg: 'bg-cyan-50'
    },
    {
      title: 'Report Generation',
      description: 'Compile end-to-end academic analytical reports featuring processing summaries, charts, and downloadable summaries.',
      icon: FileText,
      color: 'text-amber-600',
      bg: 'bg-amber-50'
    }
  ];

  return (
    <div className="min-h-full bg-slate-50 text-slate-900 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200 pt-10 pb-16 px-6 sm:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200/60 rounded-full text-xs font-medium text-blue-700">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>Academic Engineering Capstone · Data Exploration & Visualization</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15] text-balance">
              Explore Genetic Disorder Data.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-teal-500">
                Discover Meaningful Patterns.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              GeneScope transforms complex genetic-disorder datasets into interactive analytics,
              rigorous statistical summaries, and visual insights designed for academic exploration.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenDashboard}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Open Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onExploreDataset}
                className="px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold border border-slate-300 rounded-lg shadow-xs hover:border-slate-400 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Database className="w-4 h-4 text-slate-500" />
                <span>Explore Demo Dataset</span>
              </button>
            </div>

            {/* Quick Metadata tags */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500 font-mono">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                5,000 Synthetic Records
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                24 Genetic Conditions
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                12 Phenotypic Variables
              </span>
            </div>
          </div>

          {/* Right Hero Visual: Abstract Analytics Dashboard */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-white border border-slate-200/90 shadow-xl p-5 space-y-4 overflow-hidden">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                  <span className="ml-2 text-xs font-semibold text-slate-700">GeneScope Analytics Engine</span>
                </div>
                <span className="text-[10px] font-mono text-teal-700 bg-teal-50 px-2 py-0.5 rounded font-medium">
                  DEMO ACTIVE
                </span>
              </div>

              {/* Mini KPIs */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[10px] text-slate-500 block">Total Records</span>
                  <span className="text-base font-extrabold font-mono text-slate-900 tabular-nums">5,000</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[10px] text-slate-500 block">Disorders</span>
                  <span className="text-base font-extrabold font-mono text-blue-700 tabular-nums">24</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[10px] text-slate-500 block">Completeness</span>
                  <span className="text-base font-extrabold font-mono text-teal-700 tabular-nums">96.4%</span>
                </div>
              </div>

              {/* Abstract DNA & Chart graphic */}
              <div className="bg-slate-900 rounded-xl p-4 text-white space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Multivariate Association</span>
                  <span className="font-mono text-teal-400">r = 0.71 (p&lt;0.001)</span>
                </div>

                {/* SVG Visual Matrix */}
                <div className="h-28 w-full flex items-center justify-center relative">
                  <svg viewBox="0 0 320 100" className="w-full h-full">
                    {/* DNA Wave 1 */}
                    <path
                      d="M 10 50 Q 80 15 160 50 T 310 50"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="2.5"
                    />
                    {/* DNA Wave 2 */}
                    <path
                      d="M 10 50 Q 80 85 160 50 T 310 50"
                      fill="none"
                      stroke="#0d9488"
                      strokeWidth="2.5"
                    />
                    {/* Connecting Rungs */}
                    {[35, 75, 115, 155, 195, 235, 275].map((x, i) => (
                      <line
                        key={i}
                        x1={x}
                        y1={30 + Math.sin(i) * 15}
                        x2={x}
                        y2={70 - Math.sin(i) * 15}
                        stroke="#94a3b8"
                        strokeWidth="1.5"
                        strokeDasharray="2 2"
                      />
                    ))}
                    {/* Glowing data points */}
                    <circle cx="160" cy="50" r="4" fill="#38bdf8" />
                    <circle cx="235" cy="40" r="3.5" fill="#a855f7" />
                    <circle cx="75" cy="60" r="3.5" fill="#2dd4bf" />
                  </svg>
                </div>

                <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>Severity vs Symptom Load</span>
                  <span className="text-teal-400 font-semibold">Ready for Analysis</span>
                </div>
              </div>

              {/* Progress bar preview */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-600">
                  <span>Pipeline Stage: Transformation &amp; EDA</span>
                  <span className="font-mono font-medium text-slate-900">Stage 6/9</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-2/3 h-full bg-gradient-to-r from-blue-600 to-teal-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Capabilities Grid */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 pt-16">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Capabilities &amp; Modules
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Engineered for Comprehensive Genomic Exploration
          </h2>
          <p className="text-sm text-slate-600">
            A complete data exploration and visualization toolset built to explore complex multivariate distributions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-xs hover:shadow-md transition-all duration-200 hover:border-slate-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-10 h-10 rounded-lg ${feat.bg} flex items-center justify-center mb-4`}>
                    <Icon className={`w-5 h-5 ${feat.color}`} />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 mb-2">{feat.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{feat.description}</p>
                </div>
                <button
                  onClick={onOpenDashboard}
                  className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                >
                  <span>Explore Feature</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* College Project Academic Information Card */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 pt-16">
        <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-blue-950 text-white rounded-2xl p-8 sm:p-10 shadow-lg border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-mono font-semibold text-teal-400 uppercase tracking-widest">
              Engineering College Project
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-white">
              Subject: Data Exploration and Visualization
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Designed as a real data analytics web application prototype implementing full-stack data ingestion,
              client-side data transformations, parametric statistical distributions, correlation matrices,
              and interactive visualization charts.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1">
              <span>Stack: React + TS + Tailwind</span>
              <span>·</span>
              <span>Storage: In-Memory / PostgreSQL Ready</span>
              <span>·</span>
              <span>Engine: Pandas Compatible</span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onOpenDashboard}
              className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm rounded-lg shadow-md transition-colors cursor-pointer"
            >
              Launch Platform
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
