import React, { useState } from 'react';
import {
  GitCompare,
  ArrowRight,
  Dna,
  Users,
  Calendar,
  Activity,
  Check
} from 'lucide-react';
import { GeneticRecord } from '../../types/dataset';
import { GENETIC_DISORDERS } from '../../data/mockDataset';
import {
  getAgeDistribution,
  getGenderDistribution
} from '../../services/dataEngine';
import { HistogramChart } from '../charts/HistogramChart';
import { GenderBarChart } from '../charts/GenderBarChart';

interface ComparisonViewProps {
  records: GeneticRecord[];
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({ records }) => {
  const [disorderA, setDisorderA] = useState<string>('Cystic Fibrosis');
  const [disorderB, setDisorderB] = useState<string>("Huntington's Disease");

  const recordsA = records.filter((r) => r.disorder === disorderA);
  const recordsB = records.filter((r) => r.disorder === disorderB);

  // Statistics for Disorder A
  const avgAgeA = recordsA.length > 0 ? (recordsA.reduce((s, r) => s + r.age, 0) / recordsA.length).toFixed(1) : '0';
  const avgSeverityA = recordsA.length > 0 ? (recordsA.reduce((s, r) => s + r.severityScore, 0) / recordsA.length).toFixed(1) : '0';
  const famHistoryPctA = recordsA.length > 0 ? ((recordsA.filter((r) => r.familyHistory).length / recordsA.length) * 100).toFixed(1) : '0';
  const inheritanceA = recordsA[0]?.inheritance || 'Autosomal Recessive';

  // Statistics for Disorder B
  const avgAgeB = recordsB.length > 0 ? (recordsB.reduce((s, r) => s + r.age, 0) / recordsB.length).toFixed(1) : '0';
  const avgSeverityB = recordsB.length > 0 ? (recordsB.reduce((s, r) => s + r.severityScore, 0) / recordsB.length).toFixed(1) : '0';
  const famHistoryPctB = recordsB.length > 0 ? ((recordsB.filter((r) => r.familyHistory).length / recordsB.length) * 100).toFixed(1) : '0';
  const inheritanceB = recordsB[0]?.inheritance || 'Autosomal Dominant';

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl mx-auto">
      {/* Title */}
      <div className="pb-2 border-b border-slate-200">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Disorder Comparison
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Select any two disorders to compare their age of onset, severity, and inheritance side by side.
        </p>
      </div>

      {/* Selectors Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Disorder A Dropdown */}
        <div className="flex-1 w-full">
          <label className="block text-xs font-semibold text-blue-700 mb-1">
            Condition A
          </label>
          <select
            value={disorderA}
            onChange={(e) => setDisorderA(e.target.value)}
            className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600 cursor-pointer"
          >
            {GENETIC_DISORDERS.map((d) => (
              <option key={d.name} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Center Versus icon */}
        <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs shrink-0">
          vs
        </div>

        {/* Disorder B Dropdown */}
        <div className="flex-1 w-full">
          <label className="block text-xs font-semibold text-purple-700 mb-1">
            Condition B
          </label>
          <select
            value={disorderB}
            onChange={(e) => setDisorderB(e.target.value)}
            className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-purple-600 cursor-pointer"
          >
            {GENETIC_DISORDERS.map((d) => (
              <option key={d.name} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Side-by-Side Summary Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card A */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-semibold text-blue-700">Condition A</span>
            <span className="text-base font-bold text-slate-900">{disorderA}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-[10px] text-slate-400 block">Patients</span>
              <span className="text-base font-bold font-mono text-slate-900 tabular-nums">
                {recordsA.length.toLocaleString()}
              </span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-[10px] text-slate-400 block">Avg Age</span>
              <span className="text-base font-bold font-mono text-blue-700 tabular-nums">
                {avgAgeA} yrs
              </span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-[10px] text-slate-400 block">Avg Severity</span>
              <span className="text-base font-bold font-mono text-slate-900 tabular-nums">
                {avgSeverityA}/10
              </span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-[10px] text-slate-400 block">Family Hist</span>
              <span className="text-base font-bold font-mono text-teal-700 tabular-nums">
                {famHistoryPctA}%
              </span>
            </div>
          </div>

          <div className="text-xs text-slate-600 flex items-center justify-between pt-1">
            <span>Inheritance:</span>
            <span className="font-semibold text-slate-800">{inheritanceA}</span>
          </div>
        </div>

        {/* Card B */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-semibold text-purple-700">Condition B</span>
            <span className="text-base font-bold text-slate-900">{disorderB}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-[10px] text-slate-400 block">Patients</span>
              <span className="text-base font-bold font-mono text-slate-900 tabular-nums">
                {recordsB.length.toLocaleString()}
              </span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-[10px] text-slate-400 block">Avg Age</span>
              <span className="text-base font-bold font-mono text-purple-700 tabular-nums">
                {avgAgeB} yrs
              </span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-[10px] text-slate-400 block">Avg Severity</span>
              <span className="text-base font-bold font-mono text-slate-900 tabular-nums">
                {avgSeverityB}/10
              </span>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <span className="text-[10px] text-slate-400 block">Family Hist</span>
              <span className="text-base font-bold font-mono text-teal-700 tabular-nums">
                {famHistoryPctB}%
              </span>
            </div>
          </div>

          <div className="text-xs text-slate-600 flex items-center justify-between pt-1">
            <span>Inheritance:</span>
            <span className="font-semibold text-slate-800">{inheritanceB}</span>
          </div>
        </div>
      </div>

      {/* Side-by-Side Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-900">
              Age Breakdown: {disorderA}
            </h3>
            <span className="text-xs text-blue-700 font-semibold font-mono">Condition A</span>
          </div>
          <HistogramChart data={getAgeDistribution(recordsA)} height={180} />
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-900">
              Age Breakdown: {disorderB}
            </h3>
            <span className="text-xs text-purple-700 font-semibold font-mono">Condition B</span>
          </div>
          <HistogramChart data={getAgeDistribution(recordsB)} height={180} />
        </div>
      </div>

      {/* Side-by-Side Gender Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-900">
              Gender Split: {disorderA}
            </h3>
            <span className="text-xs text-blue-700 font-semibold font-mono">Condition A</span>
          </div>
          <GenderBarChart data={getGenderDistribution(recordsA)} height={160} />
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-900">
              Gender Split: {disorderB}
            </h3>
            <span className="text-xs text-purple-700 font-semibold font-mono">Condition B</span>
          </div>
          <GenderBarChart data={getGenderDistribution(recordsB)} height={160} />
        </div>
      </div>
    </div>
  );
};
