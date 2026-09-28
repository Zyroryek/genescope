import React, { useState } from 'react';
import {
  Database,
  Dna,
  ShieldCheck,
  Layers,
  ArrowRight
} from 'lucide-react';
import { GeneticRecord, FilterState, DatasetMetadata } from '../../types/dataset';
import {
  getDisorderDistribution,
  getAgeDistribution,
  getInheritanceDistribution,
  getFamilyHistoryVsDiagnosis,
  getGenderDistribution,
  calculateCorrelationMatrix
} from '../../services/dataEngine';
import { FilterPanel } from './FilterPanel';
import { HorizontalBarChart } from '../charts/HorizontalBarChart';
import { HistogramChart } from '../charts/HistogramChart';
import { DonutChart } from '../charts/DonutChart';
import { StackedBarChart } from '../charts/StackedBarChart';
import { GenderBarChart } from '../charts/GenderBarChart';
import { HeatmapChart } from '../charts/HeatmapChart';

interface DashboardViewProps {
  records: GeneticRecord[];
  allRecords: GeneticRecord[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onResetFilters: () => void;
  datasetMetadata: DatasetMetadata;
  onNavigateToView: (view: any) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  records,
  allRecords,
  filters,
  onFilterChange,
  onResetFilters,
  datasetMetadata,
  onNavigateToView
}) => {
  // Chart tab state: 'overview' | 'genetics' | 'correlation' | 'all'
  const [activeTab, setActiveTab] = useState<'overview' | 'genetics' | 'correlation' | 'all'>('overview');

  // Compute chart datasets from currently filtered records
  const disorderData = getDisorderDistribution(records, 8);
  const ageData = getAgeDistribution(records);
  const inheritanceData = getInheritanceDistribution(records);
  const famHistoryData = getFamilyHistoryVsDiagnosis(records);
  const genderData = getGenderDistribution(records);
  const correlationData = calculateCorrelationMatrix(records);

  const kpis = [
    {
      label: 'Total Records',
      value: records.length.toLocaleString(),
      subtext: 'Observed patient cases',
      icon: Database
    },
    {
      label: 'Conditions',
      value: '24',
      subtext: 'Catalogued genetic disorders',
      icon: Dna
    },
    {
      label: 'Data Quality',
      value: '96.4%',
      subtext: 'Dataset completeness',
      icon: ShieldCheck
    },
    {
      label: 'Clinical Variables',
      value: '12',
      subtext: 'Features per observation',
      icon: Layers
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-7 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/70">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Genetic Disorder Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-normal">
            Explore patterns, demographic distributions, and clinical correlations in{' '}
            <span className="font-medium text-slate-700">{datasetMetadata.name}</span>.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigateToView('comparison')}
            className="px-3.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium border border-slate-200/80 rounded-xl shadow-2xs hover:border-slate-300 transition-all cursor-pointer"
          >
            Compare Disorders
          </button>
          <button
            onClick={() => onNavigateToView('studio')}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Chart Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* KPI Cards: Clean, Generous Whitespace, Softer Borders */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="bg-white border border-slate-200/70 rounded-2xl p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:border-slate-300/80 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>{kpi.label}</span>
                <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-semibold font-mono tabular-nums text-slate-900 tracking-tight">
                  {kpi.value}
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-400 font-normal">
                  <span>{kpi.subtext}</span>
                  <span aria-hidden="true">·</span>
                  <span>Demo data</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter Bar with presets */}
      <FilterPanel
        filters={filters}
        onFilterChange={onFilterChange}
        onResetFilters={onResetFilters}
        filteredCount={records.length}
        totalCount={allRecords.length}
      />

      {/* Chart Section Tabs (Calm Segmented Control) */}
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/70 pb-3">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/70 rounded-xl">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-1.5 text-xs rounded-lg transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 font-medium'
              }`}
            >
              1. Overview &amp; Age
            </button>
            <button
              onClick={() => setActiveTab('genetics')}
              className={`px-3.5 py-1.5 text-xs rounded-lg transition-all cursor-pointer ${
                activeTab === 'genetics'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 font-medium'
              }`}
            >
              2. Inheritance &amp; Family
            </button>
            <button
              onClick={() => setActiveTab('correlation')}
              className={`px-3.5 py-1.5 text-xs rounded-lg transition-all cursor-pointer ${
                activeTab === 'correlation'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 font-medium'
              }`}
            >
              3. Correlation Matrix
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`hidden sm:inline px-3.5 py-1.5 text-xs rounded-lg transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 font-medium'
              }`}
            >
              View All 6
            </button>
          </div>

          <span className="text-xs text-slate-400 font-normal">
            {activeTab === 'overview' && 'Disorder prevalence and patient age spread'}
            {activeTab === 'genetics' && 'Genomic inheritance patterns and hereditary rates'}
            {activeTab === 'correlation' && 'Multivariate links across continuous clinical metrics'}
            {activeTab === 'all' && 'All 6 interactive chart views'}
          </span>
        </div>

        {/* Tab 1: Overview & Prevalence (Clean, Spacious 2-Column Grid) */}
        {(activeTab === 'overview' || activeTab === 'all') && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart 1: Disorder Distribution */}
            <div className="bg-white border border-slate-200/70 rounded-2xl p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
              <div className="pb-3 border-b border-slate-100/80 mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-900 tracking-tight">
                    Disorder Distribution
                  </h3>
                  <span className="text-xs font-mono text-slate-400">Top 8 Cohorts</span>
                </div>
                <p className="text-xs text-slate-500 font-normal mt-0.5">
                  Ranks genetic disorders by total recorded patient case counts.
                </p>
              </div>
              <div className="pt-1 flex-1">
                <HorizontalBarChart data={disorderData} height={280} />
              </div>
            </div>

            {/* Chart 2: Age Distribution */}
            <div className="bg-white border border-slate-200/70 rounded-2xl p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
              <div className="pb-3 border-b border-slate-100/80 mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-900 tracking-tight">
                    Age Distribution
                  </h3>
                  <span className="text-xs font-mono text-slate-400">10-Year Bins</span>
                </div>
                <p className="text-xs text-slate-500 font-normal mt-0.5">
                  Frequency of patient cases grouped by age brackets.
                </p>
              </div>
              <div className="pt-1 flex-1">
                <HistogramChart data={ageData} height={240} />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Inheritance & Demographics */}
        {(activeTab === 'genetics' || activeTab === 'all') && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart 3: Inheritance Pattern */}
            <div className="bg-white border border-slate-200/70 rounded-2xl p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
              <div className="pb-3 border-b border-slate-100/80 mb-4">
                <h3 className="text-sm font-semibold text-slate-900 tracking-tight">
                  Inheritance Pattern
                </h3>
                <p className="text-xs text-slate-500 font-normal mt-0.5">
                  Proportion across dominant, recessive, and X-linked modes.
                </p>
              </div>
              <div className="pt-1 flex-1">
                <DonutChart data={inheritanceData} />
              </div>
            </div>

            {/* Chart 4: Family History vs Diagnosis */}
            <div className="bg-white border border-slate-200/70 rounded-2xl p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
              <div className="pb-3 border-b border-slate-100/80 mb-4">
                <h3 className="text-sm font-semibold text-slate-900 tracking-tight">
                  Family History vs Diagnosis
                </h3>
                <p className="text-xs text-slate-500 font-normal mt-0.5">
                  Diagnosis confirmation rates grouped by hereditary presence.
                </p>
              </div>
              <div className="pt-1 flex-1">
                <StackedBarChart data={famHistoryData} height={200} />
              </div>
            </div>

            {/* Chart 5: Gender Distribution */}
            <div className="bg-white border border-slate-200/70 rounded-2xl p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
              <div className="pb-3 border-b border-slate-100/80 mb-4">
                <h3 className="text-sm font-semibold text-slate-900 tracking-tight">
                  Gender Distribution
                </h3>
                <p className="text-xs text-slate-500 font-normal mt-0.5">
                  Demographic split across male, female, and other.
                </p>
              </div>
              <div className="pt-1 flex-1">
                <GenderBarChart data={genderData} height={200} />
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Correlation Matrix */}
        {(activeTab === 'correlation' || activeTab === 'all') && (
          <div className="bg-white border border-slate-200/70 rounded-2xl p-6 sm:p-7 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100/80 gap-2">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 tracking-tight">
                  Correlation Matrix
                </h3>
                <p className="text-xs text-slate-500 font-normal mt-0.5">
                  Measures linear association between continuous parameters (Pearson r from -1.0 to +1.0).
                </p>
              </div>
              <button
                onClick={() => onNavigateToView('correlation')}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium hover:underline cursor-pointer"
              >
                Open Full Correlation Explorer →
              </button>
            </div>
            <div className="pt-1">
              <HeatmapChart data={correlationData} compact={false} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
