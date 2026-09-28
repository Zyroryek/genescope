import React, { useState } from 'react';
import {
  GitBranch,
  ArrowRight,
  Database,
  FileCheck,
  Sparkles,
  RefreshCw,
  BarChart,
  Activity,
  LineChart,
  FileText,
  Play,
  CheckCircle2,
  Code2
} from 'lucide-react';

interface PipelineStage {
  id: string;
  stepNumber: number;
  name: string;
  category: string;
  summary: string;
  inputFormat: string;
  outputFormat: string;
  transformLogic: string;
  pandasCode: string;
}

export const PipelineView: React.FC = () => {
  const stages: PipelineStage[] = [
    {
      id: 'source',
      stepNumber: 1,
      name: 'DATA SOURCE',
      category: 'Ingestion Input',
      summary: 'Raw clinical cohorts, synthetic genomic registries, and biomarker laboratory data.',
      inputFormat: 'Local Files / Cloud Object Stores (.csv, .json, .xlsx)',
      outputFormat: 'Binary File Streams',
      transformLogic: 'Buffered file reading with chunked memory streaming for zero client freeze.',
      pandasCode: 'df = pd.read_csv("genetic_disorder_data.csv")'
    },
    {
      id: 'ingestion',
      stepNumber: 2,
      name: 'INGESTION',
      category: 'Data Reader',
      summary: 'Buffer parsing, character encoding normalization, and record structure detection.',
      inputFormat: 'Raw byte buffers (UTF-8)',
      outputFormat: 'Tabular JSON Record Collection',
      transformLogic: 'Auto-detect delimiters (comma, semicolon, tab) and validate header consistency.',
      pandasCode: 'df = pd.read_csv(stream, encoding="utf-8", sep=",")'
    },
    {
      id: 'validation',
      stepNumber: 3,
      name: 'VALIDATION',
      category: 'Integrity Check',
      summary: 'Schema conformance check, missing column detection, and range boundaries verification.',
      inputFormat: 'Parsed Tabular Records',
      outputFormat: 'Validated Records + Schema Audit Report',
      transformLogic: 'Assert presence of 12 required fields and verify age (0-100) and severity (1-10) limits.',
      pandasCode: 'assert set(REQUIRED_COLS).issubset(df.columns)\ndf["Age"] = df["Age"].clip(0, 100)'
    },
    {
      id: 'cleaning',
      stepNumber: 4,
      name: 'CLEANING',
      category: 'Data Hygiene',
      summary: 'Deduplication, missingness imputation (median / mode), and invalid row pruning.',
      inputFormat: 'Raw Validated Records',
      outputFormat: 'Cleaned Record Matrix (99.8% Completeness)',
      transformLogic: 'Drop exact duplicates; fill NaN biomarkers with group medians; normalize gender strings.',
      pandasCode: 'df.drop_duplicates(subset=["Patient_ID"], inplace=True)\ndf["Biomarker"] = df.groupby("Disorder")["Biomarker"].transform(lambda x: x.fillna(x.median()))'
    },
    {
      id: 'transformation',
      stepNumber: 5,
      name: 'TRANSFORMATION',
      category: 'Feature Engineering',
      summary: 'Categorical encoding, age bracket binning (10-yr bins), and numeric normalization.',
      inputFormat: 'Cleaned Record Matrix',
      outputFormat: 'Enriched Feature DataFrame',
      transformLogic: 'Derive Age_Bracket ("0-17", "18-35", "36-55", "56+"); compute Z-scores.',
      pandasCode: 'df["Age_Bracket"] = pd.cut(df["Age"], bins=[0,18,36,56,120], labels=["0-17","18-35","36-55","56+"])'
    },
    {
      id: 'eda',
      stepNumber: 6,
      name: 'EDA',
      category: 'Exploratory Profiling',
      summary: 'Descriptive metrics (mean, median, std dev), frequency counts, and quartile distributions.',
      inputFormat: 'Enriched Feature Matrix',
      outputFormat: 'Statistical Summary Dictionary & Boxplot Metrics',
      transformLogic: 'Compute five-number summary (Min, Q1, Median, Q3, Max) and Tukey 1.5×IQR fences.',
      pandasCode: 'stats = df.describe(percentiles=[0.25, 0.50, 0.75])\niqr = stats.loc["75%"] - stats.loc["25%"]'
    },
    {
      id: 'statistical',
      stepNumber: 7,
      name: 'STATISTICAL ANALYSIS',
      category: 'Covariance Engine',
      summary: 'Pearson correlation matrix computation, p-value derivation, and subgroup cross-tabulation.',
      inputFormat: 'Continuous Variables Subset',
      outputFormat: 'Symmetric NxN Correlation Matrix (r, p-value)',
      transformLogic: 'Compute Pearson r coefficients for continuous biomarker pairs; estimate significance.',
      pandasCode: 'corr_matrix = df[NUMERICAL_COLS].corr(method="pearson")'
    },
    {
      id: 'visualization',
      stepNumber: 8,
      name: 'VISUALIZATION',
      category: 'Visual Synthesis',
      summary: 'Rendering responsive SVG charts: horizontal distributions, histograms, donuts, and heatmaps.',
      inputFormat: 'Aggregated Metric Vectors',
      outputFormat: 'Vector Graphical Canvas & Interactive DOM Elements',
      transformLogic: 'Map numeric values into scalable SVG viewbox coordinate systems with hover tooltips.',
      pandasCode: '# Frontend renders interactive vector SVG components mapped directly from API JSON'
    },
    {
      id: 'report',
      stepNumber: 9,
      name: 'REPORT',
      category: 'Output Compilation',
      summary: 'Synthesizing pipeline logs, statistical observations, and visual summaries into printable reports.',
      inputFormat: 'Aggregated Analysis Results & Visual States',
      outputFormat: 'Printable HTML / PDF Dossier & Exportable CSV',
      transformLogic: 'Format academic capstone dossier with executive summary and method citations.',
      pandasCode: 'report_data.to_csv("GeneScope_Final_Analysis.csv", index=False)'
    }
  ];

  const [activeStageId, setActiveStageId] = useState<string>('cleaning');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedProgress, setSimulatedProgress] = useState(4);

  const activeStage = stages.find((s) => s.id === activeStageId) || stages[3];

  const handleRunSimulation = () => {
    setIsSimulating(true);
    let current = 1;
    const interval = setInterval(() => {
      setSimulatedProgress(current);
      setActiveStageId(stages[current - 1].id);
      current++;
      if (current > stages.length) {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 600);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Data Processing Pipeline
            </h1>
            <span className="text-[11px] font-mono text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded font-medium">
              9-STAGE FLOW
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            End-to-end data transformation pipeline from raw source ingestion to final academic report compilation.
          </p>
        </div>

        <button
          disabled={isSimulating}
          onClick={handleRunSimulation}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
        >
          {isSimulating ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Simulating Execution (Stage {simulatedProgress}/9)...</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Step Through Pipeline</span>
            </>
          )}
        </button>
      </div>

      {/* Clickable 9-Stage Flow Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-9 gap-2">
        {stages.map((stage) => {
          const isSelected = activeStageId === stage.id;
          const isPassedInSim = isSimulating && simulatedProgress >= stage.stepNumber;

          return (
            <div
              key={stage.id}
              onClick={() => setActiveStageId(stage.id)}
              className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-blue-50 border-blue-600 shadow-xs ring-2 ring-blue-500/20'
                  : isPassedInSim
                  ? 'bg-teal-50/70 border-teal-400'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div>
                <span
                  className={`inline-block w-6 h-6 rounded-full text-xs font-mono font-bold leading-6 mb-1.5 ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : isPassedInSim
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {stage.stepNumber}
                </span>
                <h4 className="text-[11px] font-bold text-slate-900 leading-tight">
                  {stage.name}
                </h4>
              </div>
              <span className="text-[9px] font-mono text-slate-400 mt-2 block truncate">
                {stage.category}
              </span>
            </div>
          );
        })}
      </div>

      {/* Active Stage Detailed Breakdown */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 text-white font-mono font-bold flex items-center justify-center text-sm shadow-xs">
              0{activeStage.stepNumber}
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-blue-700 uppercase tracking-wider">
                Stage {activeStage.stepNumber} of 9 · {activeStage.category}
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                {activeStage.name}
              </h3>
            </div>
          </div>
          <span className="text-xs font-mono text-slate-500 bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
            TypeScript + Pandas Compatible
          </span>
        </div>

        {/* Inputs vs Outputs Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-500">
              Input Schema
            </span>
            <p className="text-xs font-medium text-slate-800">{activeStage.inputFormat}</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-500">
              Transformation Logic
            </span>
            <p className="text-xs text-slate-700">{activeStage.transformLogic}</p>
          </div>

          <div className="bg-teal-50/60 p-4 rounded-lg border border-teal-200 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-teal-800">
              Output Schema
            </span>
            <p className="text-xs font-medium text-teal-950">{activeStage.outputFormat}</p>
          </div>
        </div>

        {/* Pandas Equivalent Code Snippet */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-blue-600" />
              Python / Pandas Backend Equivalent
            </span>
            <span className="text-[10px] font-mono text-slate-400">READY FOR PYTHON BRIDGE</span>
          </div>

          <div className="bg-slate-900 rounded-xl p-4 text-white font-mono text-xs overflow-x-auto shadow-xs">
            <pre className="text-teal-300">
              <code>{activeStage.pandasCode}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
