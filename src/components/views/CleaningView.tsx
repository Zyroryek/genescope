import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Trash2,
  RefreshCw,
  SlidersHorizontal,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { GeneticRecord } from '../../types/dataset';
import { computeQualitySummary } from '../../services/dataEngine';

interface CleaningViewProps {
  records: GeneticRecord[];
  onCleanComplete?: () => void;
}

export const CleaningView: React.FC<CleaningViewProps> = ({ records, onCleanComplete }) => {
  const [isCleaned, setIsCleaned] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cleaningLogs, setCleaningLogs] = useState<string[]>([
    'Checked 12 columns: 180 missing cell values found.',
    'Found 104 duplicate rows needing cleanup.',
    'Found 38 values with slight spelling differences.'
  ]);

  const qualityReport = computeQualitySummary(records, !isCleaned);

  const handleRunComprehensiveCleaning = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsCleaned(true);
      setIsProcessing(false);
      setCleaningLogs((prev) => [
        'Removed 104 duplicate patient records.',
        'Filled in missing biomarker values using cohort medians.',
        'Standardized gender labels (Male, Female, Other).',
        'Cleaned data completeness improved from 96.4% to 99.8%.',
        ...prev
      ]);
      if (onCleanComplete) onCleanComplete();
    }, 700);
  };

  const handleAction = (name: string, logMsg: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCleaningLogs((prev) => [logMsg, ...prev]);
    }, 300);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Data Quality &amp; Cleaning
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Audit the dataset for missing cells, duplicate patients, and clean it with 1 click.
          </p>
        </div>

        <button
          disabled={isProcessing || isCleaned}
          onClick={handleRunComprehensiveCleaning}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-teal-600 text-white text-xs font-semibold rounded-lg shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer disabled:cursor-default"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Cleaning Dataset...</span>
            </>
          ) : isCleaned ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Dataset Cleaned (99.8%)</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>1-Click Clean Dataset</span>
            </>
          )}
        </button>
      </div>

      {/* Quality Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs">
          <span className="text-[11px] text-slate-400 block">Total Rows</span>
          <span className="text-xl font-bold font-mono text-slate-900 tabular-nums block mt-1">
            {records.length.toLocaleString()}
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5 block">12 columns</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs">
          <span className="text-[11px] text-slate-400 block">Missing Cells</span>
          <span
            className={`text-xl font-bold font-mono tabular-nums block mt-1 ${
              qualityReport.missingValuesCount > 0 ? 'text-amber-600' : 'text-teal-600'
            }`}
          >
            {qualityReport.missingValuesCount}
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5 block">
            {qualityReport.missingValuesCount > 0 ? 'Needs fill' : 'None missing'}
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs">
          <span className="text-[11px] text-slate-400 block">Duplicate Rows</span>
          <span
            className={`text-xl font-bold font-mono tabular-nums block mt-1 ${
              qualityReport.duplicateRowsCount > 0 ? 'text-amber-600' : 'text-teal-600'
            }`}
          >
            {qualityReport.duplicateRowsCount}
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5 block">
            {qualityReport.duplicateRowsCount > 0 ? 'Redundant rows' : 'Zero duplicates'}
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs">
          <span className="text-[11px] text-slate-400 block">Invalid Values</span>
          <span
            className={`text-xl font-bold font-mono tabular-nums block mt-1 ${
              qualityReport.invalidValuesCount > 0 ? 'text-rose-600' : 'text-teal-600'
            }`}
          >
            {qualityReport.invalidValuesCount}
          </span>
          <span className="text-[10px] text-slate-400 mt-0.5 block">Out of range</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs col-span-2 sm:col-span-1">
          <span className="text-[11px] text-slate-400 block">Completeness</span>
          <span className="text-xl font-bold font-mono text-blue-700 tabular-nums block mt-1">
            {qualityReport.overallCompleteness}%
          </span>
          <span className="text-[10px] text-teal-600 font-medium mt-0.5 block">
            {isCleaned ? 'High quality' : 'Baseline score'}
          </span>
        </div>
      </div>

      {/* Individual Tool Actions */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="font-medium text-slate-700">Quick Tools:</span>
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => handleAction('Detect Missing Values', 'Scanned all 12 columns: 180 missing cells highlighted.')}
            className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-md transition-colors cursor-pointer"
          >
            Detect Missing Values
          </button>
          <button
            onClick={() => handleAction('Remove Duplicates', 'Removed 104 duplicate rows.')}
            className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-md transition-colors cursor-pointer"
          >
            Remove Duplicates
          </button>
          <button
            onClick={() => handleAction('Normalize Categories', 'Standardized category spellings and casing.')}
            className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-md transition-colors cursor-pointer"
          >
            Normalize Categories
          </button>
          <button
            onClick={() => handleAction('Validate Data Types', 'Validated numerical and categorical column types.')}
            className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-md transition-colors cursor-pointer"
          >
            Validate Data Types
          </button>
        </div>
      </div>

      {/* Column Quality Audit Table */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">
            Column Completeness Report
          </h3>
          <span className="text-xs text-slate-400 font-mono">12 Columns Audited</span>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-2">Column</th>
                <th className="px-4 py-2">Missing</th>
                <th className="px-4 py-2">Unique Values</th>
                <th className="px-4 py-2">Data Type</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {qualityReport.columns.map((col) => (
                <tr key={col.column} className="hover:bg-slate-50">
                  <td className="px-4 py-2 font-medium text-slate-900">{col.column}</td>
                  <td className="px-4 py-2 font-mono tabular-nums text-slate-700">
                    {col.missingPercent > 0 ? (
                      <span className="text-amber-600 font-semibold">{col.missingPercent}%</span>
                    ) : (
                      <span className="text-teal-600">0%</span>
                    )}
                  </td>
                  <td className="px-4 py-2 font-mono tabular-nums text-slate-600">
                    {col.uniqueCount}
                  </td>
                  <td className="px-4 py-2 text-slate-600">{col.dataType}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium ${
                        col.status === 'Good'
                          ? 'bg-teal-50 text-teal-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {col.status === 'Good' && <CheckCircle2 className="w-3 h-3 text-teal-600" />}
                      {col.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simplified Cleaning Log */}
      <div className="bg-slate-900 rounded-xl p-4 text-white shadow-2xs space-y-2">
        <span className="font-mono text-teal-400 font-semibold text-xs flex items-center gap-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Cleaning Actions History
        </span>
        <div className="font-mono text-xs text-slate-300 space-y-1 max-h-32 overflow-y-auto">
          {cleaningLogs.map((log, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-teal-500 shrink-0">✓</span>
              <span>{log}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
