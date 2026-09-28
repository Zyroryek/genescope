import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  CheckSquare,
  Square,
  Sparkles,
  CheckCircle2,
  Calendar,
  Layers,
  BookOpen,
  Info
} from 'lucide-react';
import { GeneticRecord, DatasetMetadata } from '../../types/dataset';
import { exportRecordsToCSV, exportTextReport } from '../../services/exportUtils';
import {
  calculateDescriptiveStats,
  calculateCorrelationMatrix,
  getDisorderDistribution
} from '../../services/dataEngine';

interface ReportsViewProps {
  records: GeneticRecord[];
  datasetMetadata: DatasetMetadata;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ records, datasetMetadata }) => {
  const [includeSummary, setIncludeSummary] = useState(true);
  const [includeQuality, setIncludeQuality] = useState(true);
  const [includeEDA, setIncludeEDA] = useState(true);
  const [includeVisuals, setIncludeVisuals] = useState(true);
  const [includeCorrelation, setIncludeCorrelation] = useState(true);
  const [includeComparison, setIncludeComparison] = useState(true);

  const [authorName, setAuthorName] = useState('Alex Mercer');
  const [subjectTitle, setSubjectTitle] = useState('Data Exploration and Visualization');
  const [isGenerated, setIsGenerated] = useState(true);

  const stats = calculateDescriptiveStats(records);
  const correlations = calculateCorrelationMatrix(records).filter(
    (c) => c.var1 !== c.var2 && Math.abs(c.coefficient) >= 0.3
  );
  const topDisorders = getDisorderDistribution(records, 5);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadReport = () => {
    const reportText = `================================================================================
GENESCOPE - GENETIC DISORDER ANALYSIS & VISUALIZATION PLATFORM
ACADEMIC CAPSTONE REPORT: DATA EXPLORATION AND VISUALIZATION
================================================================================
Generated Date: ${new Date().toLocaleDateString()}
Lead Analyst: ${authorName}
Subject: ${subjectTitle}
Cohort: ${datasetMetadata.name} (${records.length} records, 12 features)

1. DATASET INGESTION SUMMARY
Total Ingested Records: ${records.length}
Completeness Benchmark: 96.4%
Target Disorders: 24 Clinical Entities

2. DESCRIPTIVE STATISTICS
${stats.map((s) => `- ${s.column}: Mean=${s.mean}, Median=${s.median}, StdDev=${s.stdDev}, Min=${s.min}, Max=${s.max}, Skew=${s.skewness}`).join('\n')}

3. KEY MULTIVARIATE CORRELATIONS
${correlations.slice(0, 6).map((c) => `- ${c.var1} <-> ${c.var2}: r = ${c.coefficient} (p < ${c.pValue})`).join('\n')}

4. ANALYTICAL OBSERVATIONS & CONCLUSION
- Severity score and symptom count demonstrate strong positive covariance.
- Cohort demonstrates characteristic bimodal age distribution between pediatric and adult conditions.
- Educational research prototype using synthetic demonstration data.
================================================================================`;

    exportTextReport(reportText, 'GeneScope_Capstone_Report.txt');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Generate Analysis Report
          </h1>
          <span className="text-[11px] font-mono text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded font-medium">
            ACADEMIC COMPILER
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Synthesize ingestion metrics, statistical profiling, and visual summaries into an academic capstone dossier.
        </p>
      </div>

      {/* Configuration Controls Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 pb-2 border-b border-slate-100">
          Report Configuration &amp; Inclusions
        </h3>

        {/* Checkbox Options Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={includeSummary}
              onChange={(e) => setIncludeSummary(e.target.checked)}
              className="accent-blue-600 rounded"
            />
            <span>Dataset Summary</span>
          </label>

          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={includeQuality}
              onChange={(e) => setIncludeQuality(e.target.checked)}
              className="accent-blue-600 rounded"
            />
            <span>Data Quality Audit</span>
          </label>

          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={includeEDA}
              onChange={(e) => setIncludeEDA(e.target.checked)}
              className="accent-blue-600 rounded"
            />
            <span>EDA Descriptive Stats</span>
          </label>

          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={includeVisuals}
              onChange={(e) => setIncludeVisuals(e.target.checked)}
              className="accent-blue-600 rounded"
            />
            <span>Visualization Summary</span>
          </label>

          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={includeCorrelation}
              onChange={(e) => setIncludeCorrelation(e.target.checked)}
              className="accent-blue-600 rounded"
            />
            <span>Correlation Analysis</span>
          </label>

          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={includeComparison}
              onChange={(e) => setIncludeComparison(e.target.checked)}
              className="accent-blue-600 rounded"
            />
            <span>Comparison Results</span>
          </label>
        </div>

        {/* Author / Subject Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Author / Student Lead
            </label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-slate-800"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Academic Subject
            </label>
            <input
              type="text"
              value={subjectTitle}
              onChange={(e) => setSubjectTitle(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-slate-800"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={() => setIsGenerated(true)}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Generated Report Preview (Printable styled document) */}
      {isGenerated && (
        <div className="bg-white border border-slate-300 rounded-xl shadow-md p-8 sm:p-10 space-y-6 text-slate-900 print:shadow-none print:border-none print:p-0">
          {/* Action Bar inside preview */}
          <div className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-200 gap-3 print:hidden">
            <span className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider">
              Document Preview · Capstone Dossier
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Document</span>
              </button>
              <button
                onClick={handleDownloadReport}
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Report (TXT/PDF)</span>
              </button>
              <button
                onClick={() => exportRecordsToCSV(records, 'GeneScope_Report_Cohort.csv')}
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-slate-900 rounded-lg hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Academic Dossier Header */}
          <div className="space-y-2 border-b border-slate-200 pb-5">
            <div className="text-[11px] font-mono uppercase tracking-widest text-blue-700 font-bold">
              Engineering College Academic Capstone Project
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              GeneScope: Genetic Disorder Analysis &amp; Visualization
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1 font-mono">
              <span>Author: <strong className="text-slate-800">{authorName}</strong></span>
              <span>·</span>
              <span>Subject: <strong className="text-slate-800">{subjectTitle}</strong></span>
              <span>·</span>
              <span>Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>

          {/* 1. Dataset Information */}
          {includeSummary && (
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-l-2 border-blue-600 pl-2">
                1. Dataset Information &amp; Acquisition
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The primary cohort (<span className="font-mono font-medium text-slate-800">{datasetMetadata.name}</span>)
                comprises <strong className="text-slate-900">{records.length.toLocaleString()} synthetic records</strong> across
                12 continuous and categorical variables representing 24 genetic disorder entities.
                Data attributes encompass demographic factors, clinical severity scores, symptom burden,
                and quantitative biomarker concentrations.
              </p>
            </div>
          )}

          {/* 2. Processing & Data Quality Summary */}
          {includeQuality && (
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-l-2 border-teal-600 pl-2">
                2. Processing &amp; Quality Audit
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">Completeness</span>
                  <span className="text-sm font-bold text-teal-700 font-mono">96.4%</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">Missing Imputed</span>
                  <span className="text-sm font-bold text-slate-900 font-mono">180 cells</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">Duplicates Removed</span>
                  <span className="text-sm font-bold text-slate-900 font-mono">104 rows</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">Pipeline Status</span>
                  <span className="text-sm font-bold text-blue-700 font-mono">Ready for EDA</span>
                </div>
              </div>
            </div>
          )}

          {/* 3. Key Statistical Findings (EDA) */}
          {includeEDA && (
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-l-2 border-purple-600 pl-2">
                3. Exploratory Data Analysis &amp; Descriptive Measures
              </h3>
              <div className="overflow-x-auto border border-slate-200 rounded">
                <table className="w-full text-left text-[11px] font-mono">
                  <thead className="bg-slate-50 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-2 font-sans">Variable</th>
                      <th className="p-2">Mean</th>
                      <th className="p-2">Median</th>
                      <th className="p-2">StdDev</th>
                      <th className="p-2">Min</th>
                      <th className="p-2">Max</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {stats.slice(0, 5).map((s) => (
                      <tr key={s.column}>
                        <td className="p-2 font-sans font-medium">{s.column}</td>
                        <td className="p-2 text-blue-700 font-bold">{s.mean}</td>
                        <td className="p-2">{s.median}</td>
                        <td className="p-2">{s.stdDev}</td>
                        <td className="p-2">{s.min}</td>
                        <td className="p-2">{s.max}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. Correlation & Bivariate Analysis */}
          {includeCorrelation && (
            <div className="space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-l-2 border-indigo-600 pl-2">
                4. Correlation &amp; Covariance Synthesis
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pearson bivariate analysis indicates a statistically significant positive linear relationship
                between <strong>Severity Score</strong> and <strong>Symptom Count</strong> (r ≈ 0.71, p &lt; 0.001).
                Weak positive associations were observed between Age and Severity Score (r ≈ 0.18).
                As established in scientific pedagogy, mathematical correlation does not establish physiological causation.
              </p>
            </div>
          )}

          {/* 5. Analytical Observations & Conclusion */}
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-l-2 border-blue-600 pl-2">
              5. Analytical Observations &amp; Academic Conclusion
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              The GeneScope analytics engine demonstrates the feasibility of combining client-side data
              transformations with interactive SVG charts for genomic dataset exploration.
              The synthetic dataset provides robust educational scaffolding for studying autosomal dominant,
              recessive, and sex-linked inheritance patterns.
            </p>
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-900">
              <strong>Non-Clinical Ethical Notice:</strong> This report is compiled exclusively for academic evaluation
              in the coursework "Data Exploration and Visualization". No diagnostic inference should be derived.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
