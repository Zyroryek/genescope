import React, { useState } from 'react';
import {
  ShieldCheck,
  Users,
  Database,
  Cpu,
  Activity,
  CheckCircle2,
  Trash2,
  RefreshCw,
  MoreVertical,
  Layers,
  Archive,
  Download
} from 'lucide-react';
import { DatasetMetadata } from '../../types/dataset';

interface AdminViewProps {
  currentMetadata: DatasetMetadata;
}

export const AdminView: React.FC<AdminViewProps> = ({ currentMetadata }) => {
  const [activeTab, setActiveTab] = useState<'datasets' | 'jobs' | 'users' | 'activity'>('datasets');

  const adminCards = [
    {
      label: 'Active Users',
      value: '24',
      subtext: '4 Lead Biostatisticians online',
      icon: Users,
      color: 'text-blue-700',
      border: 'border-l-blue-600'
    },
    {
      label: 'Managed Datasets',
      value: '3 Active',
      subtext: '8,700 total indexed rows',
      icon: Database,
      color: 'text-teal-700',
      border: 'border-l-teal-600'
    },
    {
      label: 'Processing Jobs',
      value: '12 Completed',
      subtext: 'Zero failed workers in queue',
      icon: Cpu,
      color: 'text-purple-700',
      border: 'border-l-purple-600'
    },
    {
      label: 'System Status',
      value: 'Healthy (99.9%)',
      subtext: 'Express API & Vector Store operational',
      icon: Activity,
      color: 'text-emerald-700',
      border: 'border-l-emerald-600'
    }
  ];

  const [datasetList, setDatasetList] = useState([
    {
      name: 'Genetic_Disorder_Dataset.csv',
      owner: 'Alex Mercer (Lead)',
      records: 5000,
      status: 'Ready for Analysis',
      uploadedDate: '2026-03-24',
      size: '1.24 MB'
    },
    {
      name: 'Pediatric_Rare_Variants_1200.csv',
      owner: 'Dr. Sarah Lin',
      records: 1200,
      status: 'Ready for Analysis',
      uploadedDate: '2026-03-25',
      size: '312 KB'
    },
    {
      name: 'Cardio_Neuromuscular_Panel_2500.csv',
      owner: 'Dept of Genomics',
      records: 2500,
      status: 'Ready for Analysis',
      uploadedDate: '2026-03-26',
      size: '640 KB'
    }
  ]);

  const jobsList = [
    { id: 'JOB-9021', task: 'Missing Biomarker KNN Imputation', runtime: '420ms', status: 'Succeeded' },
    { id: 'JOB-9022', task: 'Pearson Covariance Matrix (6x6)', runtime: '85ms', status: 'Succeeded' },
    { id: 'JOB-9023', task: 'Tukey Outlier Boxplot Fences', runtime: '110ms', status: 'Succeeded' },
    { id: 'JOB-9024', task: 'Deduplication (subset=Patient_ID)', runtime: '340ms', status: 'Succeeded' }
  ];

  const handleArchive = (name: string) => {
    setDatasetList((prev) => prev.filter((d) => d.name !== name));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            System Administration
          </h1>
          <span className="text-[11px] font-mono text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded font-medium">
            ADMIN CONSOLE
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Monitor system throughput, background data cleaning jobs, active cohorts, and student permissions.
        </p>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {adminCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className={`bg-white border border-slate-200 rounded-xl p-4 shadow-xs border-l-4 ${card.border}`}
            >
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>{card.label}</span>
                <Icon className="w-4 h-4 text-slate-400" />
              </div>
              <div className={`text-xl font-bold font-mono tabular-nums mt-2 ${card.color}`}>
                {card.value}
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 truncate">{card.subtext}</p>
            </div>
          );
        })}
      </div>

      {/* Segmented Controls for Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('datasets')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'datasets'
              ? 'bg-blue-50 text-blue-700'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Managed Datasets ({datasetList.length})
        </button>
        <button
          onClick={() => setActiveTab('jobs')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'jobs'
              ? 'bg-blue-50 text-blue-700'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Processing Jobs Queue ({jobsList.length})
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'users'
              ? 'bg-blue-50 text-blue-700'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Active Sessions
        </button>
      </div>

      {/* Tab 1: Dataset Management Table */}
      {activeTab === 'datasets' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Ingested Registry Table
            </h3>
            <span className="text-xs font-mono text-slate-500">
              Active Storage: Local In-Memory / PostgreSQL Wire Compatible
            </span>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-2.5">Dataset</th>
                  <th className="px-4 py-2.5">Owner</th>
                  <th className="px-4 py-2.5">Records</th>
                  <th className="px-4 py-2.5">Status</th>
                  <th className="px-4 py-2.5">Uploaded Date</th>
                  <th className="px-4 py-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {datasetList.map((ds) => (
                  <tr key={ds.name} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-900 font-mono">{ds.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{ds.size}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{ds.owner}</td>
                    <td className="px-4 py-3 font-mono font-medium text-slate-900 tabular-nums">
                      {ds.records.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 text-teal-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                        {ds.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-600">{ds.uploadedDate}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleArchive(ds.name)}
                        className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Archive dataset"
                      >
                        <Archive className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Processing Jobs */}
      {activeTab === 'jobs' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Analytical Background Execution Jobs
            </h3>
            <span className="text-xs font-mono text-teal-700 font-semibold">ALL WORKERS IDLE</span>
          </div>

          <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg">
            {jobsList.map((job) => (
              <div key={job.id} className="p-3 flex items-center justify-between text-xs hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-blue-700 font-bold">{job.id}</span>
                  <span className="font-medium text-slate-800">{job.task}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-slate-500 text-[11px]">{job.runtime}</span>
                  <span className="inline-flex items-center gap-1 text-teal-700 font-semibold text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                    {job.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Users */}
      {activeTab === 'users' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3 text-xs">
          <h3 className="text-sm font-bold text-slate-900">Active Analyst Sessions</h3>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center">
                AM
              </div>
              <div>
                <p className="font-semibold text-slate-900">Alex Mercer (Current Analyst Session)</p>
                <p className="text-[11px] text-slate-500 font-mono">Role: Lead Biostatistician · Capstone Evaluator</p>
              </div>
            </div>
            <span className="text-teal-700 font-semibold font-mono text-[11px]">ACTIVE NOW</span>
          </div>
        </div>
      )}
    </div>
  );
};
