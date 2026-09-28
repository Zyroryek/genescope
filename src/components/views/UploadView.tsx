import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileCheck,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  FileSpreadsheet,
  Layers,
  Sparkles,
  BarChart,
  RefreshCw
} from 'lucide-react';
import { GeneticRecord, DatasetMetadata } from '../../types/dataset';
import { generateSyntheticDataset } from '../../data/mockDataset';

interface UploadViewProps {
  onDatasetLoaded: (records: GeneticRecord[], metadata: DatasetMetadata) => void;
  onNavigateToCleaning: () => void;
}

export const UploadView: React.FC<UploadViewProps> = ({
  onDatasetLoaded,
  onNavigateToCleaning
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<
    'idle' | 'parsing' | 'validated' | 'error'
  >('idle');
  const [validationReport, setValidationReport] = useState<{
    fileName: string;
    rowCount: number;
    colCount: number;
    schemaTypes: Record<string, string>;
    missingCount: number;
    duplicateCount: number;
    previewRows: any[];
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 5-Stage Visual Progress Indicator
  const stages = [
    { label: 'UPLOAD', active: true, done: uploadStatus === 'validated' },
    { label: 'VALIDATE', active: uploadStatus === 'parsing' || uploadStatus === 'validated', done: uploadStatus === 'validated' },
    { label: 'CLEAN', active: false, done: false },
    { label: 'ANALYZE', active: false, done: false },
    { label: 'VISUALIZE', active: false, done: false }
  ];

  const processFile = (file: File) => {
    setSelectedFile(file);
    setUploadStatus('parsing');

    // Simulate real parsing and schema validation
    setTimeout(() => {
      // Generate synthetic record batch based on parsed file size
      const count = file.name.includes('mini') ? 500 : 2500;
      const parsedRecords = generateSyntheticDataset(count, 8888);

      const report = {
        fileName: file.name,
        rowCount: count,
        colCount: 12,
        schemaTypes: {
          Patient_ID: 'String (UUID-compliant)',
          Age: 'Integer (Range 1-92)',
          Gender: 'Category [Male, Female, Other]',
          Disorder: 'Category (24 clinical entities)',
          Inheritance_Type: 'Category (5 genetic modes)',
          Family_History: 'Boolean (Binary flag)',
          Diagnosis_Status: 'Category [Confirmed, Suspected, Inconclusive]',
          Severity_Score: 'Float (Range 1.0 - 10.0)',
          Symptom_Count: 'Integer (1 - 15)',
          Biomarker_Value: 'Float (ng/mL)',
          Treatment_Duration: 'Integer (Months)',
          Region: 'Category (6 global zones)'
        },
        missingCount: 38,
        duplicateCount: 14,
        previewRows: parsedRecords.slice(0, 5)
      };

      setValidationReport(report);
      setUploadStatus('validated');

      const metadata: DatasetMetadata = {
        id: `custom-ds-${Date.now()}`,
        name: file.name,
        recordsCount: count,
        columnsCount: 12,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB` || '1.10 MB',
        lastUpdated: 'Just now',
        status: 'Raw',
        description: `User-uploaded cohort dataset: ${file.name}`,
        cohortType: 'Custom Uploaded Cohort'
      };

      onDatasetLoaded(parsedRecords, metadata);
    }, 700);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Dataset Ingestion Pipeline
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Upload genomic datasets for automatic schema detection, completeness verification, and cleaning.
        </p>
      </div>

      {/* Visual Progress Indicator */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {stages.map((stage, idx) => (
            <React.Fragment key={stage.label}>
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-colors ${
                    stage.done
                      ? 'bg-teal-600 text-white shadow-xs'
                      : stage.active
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {stage.done ? '✓' : idx + 1}
                </div>
                <span
                  className={`text-[11px] font-mono tracking-wider font-semibold ${
                    stage.done || stage.active ? 'text-slate-900' : 'text-slate-400'
                  }`}
                >
                  {stage.label}
                </span>
              </div>
              {idx < stages.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    stage.done ? 'bg-teal-500' : 'bg-slate-200'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Drag & Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all bg-white cursor-pointer ${
          dragActive
            ? 'border-blue-600 bg-blue-50/50'
            : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50/60'
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.json,.xlsx"
          onChange={handleChange}
          className="hidden"
        />

        <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center mb-4 shadow-xs">
          <UploadCloud className="w-7 h-7" />
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-900">
          Upload your dataset
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Drag &amp; drop your data file here, or{' '}
          <span className="text-blue-600 font-semibold underline">Browse Files</span>
        </p>

        <div className="mt-4 flex items-center justify-center gap-2 text-[11px] font-mono text-slate-500">
          <span className="px-2 py-0.5 bg-slate-100 rounded">CSV</span>
          <span className="px-2 py-0.5 bg-slate-100 rounded">JSON</span>
          <span className="px-2 py-0.5 bg-slate-100 rounded">XLSX</span>
        </div>

        {uploadStatus === 'parsing' && (
          <div className="mt-6 flex items-center justify-center gap-2 text-xs font-medium text-blue-700">
            <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
            <span>Parsing file schema and detecting missingness...</span>
          </div>
        )}
      </div>

      {/* Validation and Preview Report */}
      {validationReport && uploadStatus === 'validated' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-teal-600" />
              <h3 className="text-sm font-bold text-slate-900">
                1. File Validation &amp; Schema Detected
              </h3>
            </div>
            <span className="text-xs font-mono text-teal-700 bg-teal-50 px-2 py-0.5 rounded font-semibold">
              VALIDATION PASSED
            </span>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Total Records</span>
              <span className="text-lg font-bold font-mono text-slate-900 tabular-nums">
                {validationReport.rowCount.toLocaleString()}
              </span>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="text-[11px] text-slate-500 block">Detected Columns</span>
              <span className="text-lg font-bold font-mono text-slate-900 tabular-nums">
                {validationReport.colCount}
              </span>
            </div>
            <div className="bg-amber-50/70 p-3 rounded-lg border border-amber-200/80">
              <span className="text-[11px] text-amber-800 block">Missing Values</span>
              <span className="text-lg font-bold font-mono text-amber-900 tabular-nums">
                {validationReport.missingCount}
              </span>
            </div>
            <div className="bg-amber-50/70 p-3 rounded-lg border border-amber-200/80">
              <span className="text-[11px] text-amber-800 block">Duplicate Rows</span>
              <span className="text-lg font-bold font-mono text-amber-900 tabular-nums">
                {validationReport.duplicateCount}
              </span>
            </div>
          </div>

          {/* Detected Schema Table */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              2. Schema Types &amp; Constraints
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {Object.entries(validationReport.schemaTypes).map(([col, type]) => (
                <div
                  key={col}
                  className="p-2 bg-slate-50 rounded border border-slate-200 flex items-center justify-between text-xs"
                >
                  <span className="font-semibold text-slate-800">{col}</span>
                  <span className="text-[11px] font-mono text-slate-500">{type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Preview Table */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              5. Ingested Data Preview (First 5 Rows)
            </h4>
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-3 py-2">ID</th>
                    <th className="px-3 py-2">Age</th>
                    <th className="px-3 py-2">Gender</th>
                    <th className="px-3 py-2">Disorder</th>
                    <th className="px-3 py-2">Inheritance</th>
                    <th className="px-3 py-2">Severity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {validationReport.previewRows.map((r) => (
                    <tr key={r.id}>
                      <td className="px-3 py-1.5 font-bold text-blue-700">{r.id}</td>
                      <td className="px-3 py-1.5">{r.age}</td>
                      <td className="px-3 py-1.5">{r.gender}</td>
                      <td className="px-3 py-1.5 font-sans font-medium text-slate-900">{r.disorder}</td>
                      <td className="px-3 py-1.5 font-sans">{r.inheritance}</td>
                      <td className="px-3 py-1.5 font-bold">{r.severityScore}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Step 6 Action: Continue to Cleaning */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Ready to execute missing-value imputation and deduplication.
            </span>
            <button
              onClick={onNavigateToCleaning}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Continue to Data Cleaning</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
