import React, { useState, useMemo } from 'react';
import {
  Upload,
  Download,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
  Filter,
  CheckCircle2,
  FileSpreadsheet,
  ArrowUpDown
} from 'lucide-react';
import { GeneticRecord, DatasetMetadata } from '../../types/dataset';
import { exportRecordsToCSV } from '../../services/exportUtils';

interface DatasetViewProps {
  records: GeneticRecord[];
  datasetMetadata: DatasetMetadata;
  onNavigateToUpload: () => void;
  onClearDataset: () => void;
  onResetDataset: () => void;
}

export const DatasetView: React.FC<DatasetViewProps> = ({
  records,
  datasetMetadata,
  onNavigateToUpload,
  onClearDataset,
  onResetDataset
}) => {
  const [search, setSearch] = useState('');
  const [filterDisorder, setFilterDisorder] = useState('All');
  const [filterGender, setFilterGender] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [sortField, setSortField] = useState<keyof GeneticRecord>('id');
  const [sortAsc, setSortAsc] = useState(true);

  // Available disorder values for filter dropdown
  const uniqueDisorders = useMemo(() => {
    return Array.from(new Set(records.map((r) => r.disorder))).sort();
  }, [records]);

  // Filter and sort records
  const processedRecords = useMemo(() => {
    let result = records.filter((r) => {
      if (filterDisorder !== 'All' && r.disorder !== filterDisorder) return false;
      if (filterGender !== 'All' && r.gender !== filterGender) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          r.id.toLowerCase().includes(q) ||
          r.disorder.toLowerCase().includes(q) ||
          r.region.toLowerCase().includes(q) ||
          r.diagnosisStatus.toLowerCase().includes(q)
        );
      }
      return true;
    });

    result.sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortAsc ? valA - valB : valB - valA;
      }
      return sortAsc
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });

    return result;
  }, [records, search, filterDisorder, filterGender, sortField, sortAsc]);

  const totalPages = Math.ceil(processedRecords.length / pageSize) || 1;
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return processedRecords.slice(start, start + pageSize);
  }, [processedRecords, currentPage, pageSize]);

  const handleSort = (field: keyof GeneticRecord) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header and Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Dataset Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Audit, filter, and inspect ingested clinical and phenotypic genetic records.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onNavigateToUpload}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Dataset</span>
          </button>

          <button
            onClick={() => exportRecordsToCSV(records, datasetMetadata.name)}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-300 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Download Sample Dataset</span>
          </button>

          {records.length > 0 ? (
            <button
              onClick={onClearDataset}
              className="px-3 py-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 text-xs font-semibold border border-rose-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Dataset</span>
            </button>
          ) : (
            <button
              onClick={onResetDataset}
              className="px-3 py-2 text-blue-600 hover:bg-blue-50 text-xs font-semibold border border-blue-200 rounded-lg transition-colors cursor-pointer"
            >
              Reload Sample Data
            </button>
          )}
        </div>
      </div>

      {/* Dataset Information Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
          <FileSpreadsheet className="w-4 h-4 text-blue-600" />
          <span>Active Ingestion Metadata</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="pt-2 sm:pt-0">
            <span className="text-[11px] text-slate-400 block">Dataset Name</span>
            <span className="text-sm font-semibold text-slate-900 font-mono truncate block mt-0.5">
              {datasetMetadata.name}
            </span>
          </div>
          <div className="pt-2 sm:pt-0 sm:pl-4">
            <span className="text-[11px] text-slate-400 block">Records</span>
            <span className="text-sm font-bold font-mono text-slate-900 tabular-nums block mt-0.5">
              {datasetMetadata.recordsCount.toLocaleString()}
            </span>
          </div>
          <div className="pt-2 sm:pt-0 sm:pl-4">
            <span className="text-[11px] text-slate-400 block">Columns</span>
            <span className="text-sm font-bold font-mono text-slate-900 tabular-nums block mt-0.5">
              {datasetMetadata.columnsCount}
            </span>
          </div>
          <div className="pt-2 sm:pt-0 sm:pl-4">
            <span className="text-[11px] text-slate-400 block">File Size</span>
            <span className="text-sm font-semibold text-slate-900 font-mono block mt-0.5">
              {datasetMetadata.fileSize}
            </span>
          </div>
          <div className="pt-2 sm:pt-0 sm:pl-4">
            <span className="text-[11px] text-slate-400 block">Last Updated</span>
            <span className="text-sm font-semibold text-slate-900 block mt-0.5">
              {datasetMetadata.lastUpdated}
            </span>
          </div>
          <div className="pt-2 sm:pt-0 sm:pl-4">
            <span className="text-[11px] text-slate-400 block">Status</span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
              {datasetMetadata.status}
            </span>
          </div>
        </div>
      </div>

      {/* Table Filter Controls */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search table by ID, disorder, region..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={filterDisorder}
                onChange={(e) => {
                  setFilterDisorder(e.target.value);
                  setCurrentPage(1);
                }}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-slate-700 focus:outline-none max-w-[180px] truncate"
              >
                <option value="All">All Disorders</option>
                {uniqueDisorders.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={filterGender}
              onChange={(e) => {
                setFilterGender(e.target.value);
                setCurrentPage(1);
              }}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-slate-700 focus:outline-none"
            >
              <option value="All">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Data Preview Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold select-none">
              <tr>
                <th
                  onClick={() => handleSort('id')}
                  className="px-3 py-2.5 cursor-pointer hover:bg-slate-100"
                >
                  <div className="flex items-center gap-1">
                    <span>Patient ID</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('age')}
                  className="px-3 py-2.5 cursor-pointer hover:bg-slate-100"
                >
                  <div className="flex items-center gap-1">
                    <span>Age</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="px-3 py-2.5">Gender</th>
                <th
                  onClick={() => handleSort('disorder')}
                  className="px-3 py-2.5 cursor-pointer hover:bg-slate-100"
                >
                  <div className="flex items-center gap-1">
                    <span>Disorder</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="px-3 py-2.5">Inheritance</th>
                <th className="px-3 py-2.5">Family History</th>
                <th className="px-3 py-2.5">Diagnosis Status</th>
                <th
                  onClick={() => handleSort('severityScore')}
                  className="px-3 py-2.5 cursor-pointer hover:bg-slate-100"
                >
                  <div className="flex items-center gap-1">
                    <span>Severity</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="px-3 py-2.5">Region</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {paginatedRecords.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-slate-400 text-xs">
                    No genetic records matching current search or filters.
                  </td>
                </tr>
              ) : (
                paginatedRecords.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-3 py-2 font-mono text-slate-900 font-semibold whitespace-nowrap">
                      {r.id}
                    </td>
                    <td className="px-3 py-2 font-mono tabular-nums text-slate-700">
                      {r.age}
                    </td>
                    <td className="px-3 py-2 text-slate-600">{r.gender}</td>
                    <td className="px-3 py-2 font-medium text-slate-900 whitespace-nowrap">
                      {r.disorder}
                    </td>
                    <td className="px-3 py-2 text-slate-600 whitespace-nowrap">
                      {r.inheritance}
                    </td>
                    <td className="px-3 py-2 text-slate-700">
                      {r.familyHistory ? (
                        <span className="text-blue-700 font-medium">Positive</span>
                      ) : (
                        <span className="text-slate-400">Negative</span>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium ${
                          r.diagnosisStatus === 'Confirmed'
                            ? 'bg-blue-50 text-blue-700'
                            : r.diagnosisStatus === 'Suspected'
                            ? 'bg-purple-50 text-purple-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {r.diagnosisStatus}
                      </span>
                    </td>
                    <td className="px-3 py-2 font-mono tabular-nums font-semibold text-slate-900">
                      {r.severityScore.toFixed(1)}
                    </td>
                    <td className="px-3 py-2 text-slate-600 whitespace-nowrap">{r.region}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="text-xs text-slate-500 font-mono">
            Showing{' '}
            <span className="font-semibold text-slate-800">
              {processedRecords.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}
            </span>{' '}
            to{' '}
            <span className="font-semibold text-slate-800">
              {Math.min(currentPage * pageSize, processedRecords.length)}
            </span>{' '}
            of <span className="font-semibold text-slate-800">{processedRecords.length.toLocaleString()}</span> records
          </div>

          <div className="flex items-center gap-2">
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="text-xs bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-600"
            >
              <option value={10}>10 / page</option>
              <option value={15}>15 / page</option>
              <option value={25}>25 / page</option>
              <option value={50}>50 / page</option>
            </select>

            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-1 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono px-2 text-slate-700">
                {currentPage} / {totalPages}
              </span>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="p-1 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
