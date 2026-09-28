import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Lightbulb,
  Info,
  Layers,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { GeneticRecord } from '../../types/dataset';
import {
  calculateDescriptiveStats,
  calculateBoxPlotData,
  generateAutoInsights,
  getAgeDistribution,
  getDisorderDistribution,
  getInheritanceDistribution
} from '../../services/dataEngine';
import { BoxPlotChart } from '../charts/BoxPlotChart';
import { HistogramChart } from '../charts/HistogramChart';
import { HorizontalBarChart } from '../charts/HorizontalBarChart';
import { DonutChart } from '../charts/DonutChart';

interface EDAViewProps {
  records: GeneticRecord[];
}

export const EDAView: React.FC<EDAViewProps> = ({ records }) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'distributions' | 'outliers'>('stats');
  const [selectedBoxMetric, setSelectedBoxMetric] = useState<keyof GeneticRecord>('severityScore');
  const [selectedBoxGroup, setSelectedBoxGroup] = useState<keyof GeneticRecord>('inheritance');

  const descriptiveStats = calculateDescriptiveStats(records);
  const boxPlotData = calculateBoxPlotData(records, selectedBoxMetric, selectedBoxGroup);
  const insights = generateAutoInsights(records);
  const ageDist = getAgeDistribution(records);
  const topDisorders = getDisorderDistribution(records, 6);
  const inheritanceDist = getInheritanceDistribution(records);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Exploratory Data Analysis (EDA)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Understand the averages, spread, and outliers across the cohort.
          </p>
        </div>
      </div>

      {/* Simplified Insights Cards */}
      <div className="bg-blue-50/60 border border-blue-200/70 rounded-xl p-4 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
          <Lightbulb className="w-4 h-4 text-blue-600" />
          <span>Quick Key Insights from Current Cohort</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {insights.slice(0, 3).map((ins) => (
            <div
              key={ins.id}
              className="bg-white p-3 rounded-lg border border-slate-200/80 shadow-2xs space-y-1"
            >
              <h4 className="text-xs font-semibold text-slate-900">{ins.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{ins.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Clean Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'stats'
              ? 'bg-blue-50 text-blue-700'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          1. Descriptive Statistics (Averages &amp; Spread)
        </button>
        <button
          onClick={() => setActiveTab('distributions')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'distributions'
              ? 'bg-blue-50 text-blue-700'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          2. Cohort Distributions
        </button>
        <button
          onClick={() => setActiveTab('outliers')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'outliers'
              ? 'bg-blue-50 text-blue-700'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          3. Outlier Analysis (Box Plots)
        </button>
      </div>

      {/* Tab 1: Descriptive Statistics */}
      {activeTab === 'stats' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Continuous Variables Summary
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Mean (average), Median (midpoint), Std Dev (spread), and Min/Max bounds.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-500">
              N = {records.length.toLocaleString()} rows
            </span>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-3.5 py-2.5 font-bold">Feature</th>
                  <th className="px-3.5 py-2.5">Mean (Average)</th>
                  <th className="px-3.5 py-2.5">Median</th>
                  <th className="px-3.5 py-2.5">Std Dev</th>
                  <th className="px-3.5 py-2.5">Min</th>
                  <th className="px-3.5 py-2.5">Max</th>
                  <th className="px-3.5 py-2.5">IQR (Q1 - Q3)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono tabular-nums">
                {descriptiveStats.map((stat) => (
                  <tr key={stat.column} className="hover:bg-slate-50 transition-colors">
                    <td className="px-3.5 py-2.5 font-sans font-medium text-slate-900">
                      {stat.column}
                    </td>
                    <td className="px-3.5 py-2.5 font-bold text-blue-700">{stat.mean}</td>
                    <td className="px-3.5 py-2.5 text-slate-800">{stat.median}</td>
                    <td className="px-3.5 py-2.5 text-slate-600">{stat.stdDev}</td>
                    <td className="px-3.5 py-2.5 text-slate-500">{stat.min}</td>
                    <td className="px-3.5 py-2.5 text-slate-500">{stat.max}</td>
                    <td className="px-3.5 py-2.5 text-teal-700">
                      {stat.q1} – {stat.q3}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Cohort Distributions */}
      {activeTab === 'distributions' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
            <h4 className="text-xs font-bold text-slate-800 mb-1">
              Age Breakdown
            </h4>
            <p className="text-[11px] text-slate-500 mb-2">Patients grouped into 10-year brackets</p>
            <HistogramChart data={ageDist} height={200} />
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
            <h4 className="text-xs font-bold text-slate-800 mb-1">
              Most Frequent Disorders
            </h4>
            <p className="text-[11px] text-slate-500 mb-2">Top clinical conditions in cohort</p>
            <HorizontalBarChart data={topDisorders} height={200} />
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
            <h4 className="text-xs font-bold text-slate-800 mb-1">
              Inheritance Patterns
            </h4>
            <p className="text-[11px] text-slate-500 mb-2">Genetic transmission categories</p>
            <DonutChart data={inheritanceDist} />
          </div>
        </div>
      )}

      {/* Tab 3: Outlier Analysis with Box Plots */}
      {activeTab === 'outliers' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Outlier &amp; Spread Analysis (Box Plots)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Shows the middle 50% box (Q1 to Q3), the median bar, and outlier points outside normal spread.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500">Feature:</span>
              <select
                value={selectedBoxMetric}
                onChange={(e) => setSelectedBoxMetric(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none"
              >
                <option value="severityScore">Severity Score</option>
                <option value="symptomCount">Symptom Count</option>
                <option value="biomarkerValue">Biomarker Value</option>
                <option value="age">Age</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <BoxPlotChart
              data={boxPlotData}
              variableLabel={String(selectedBoxMetric)}
              height={260}
            />
          </div>
        </div>
      )}
    </div>
  );
};
