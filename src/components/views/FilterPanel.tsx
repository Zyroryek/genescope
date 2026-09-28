import React, { useState } from 'react';
import { Filter, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { FilterState } from '../../types/dataset';
import { GENETIC_DISORDERS, REGIONS } from '../../data/mockDataset';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onResetFilters: () => void;
  filteredCount: number;
  totalCount: number;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  filteredCount,
  totalCount
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const activeCount = [
    filters.ageGroup !== 'All' ? 1 : 0,
    filters.gender !== 'All' ? 1 : 0,
    filters.disorder !== 'All' ? 1 : 0,
    filters.inheritance !== 'All' ? 1 : 0,
    filters.diagnosisStatus !== 'All' ? 1 : 0,
    filters.region !== 'All' ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  const update = (key: keyof FilterState, val: string) => {
    onFilterChange({
      ...filters,
      [key]: val
    });
  };

  return (
    <div className="bg-white border border-slate-200/70 rounded-2xl p-4 sm:p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-4">
      {/* Top Row: Presets & Live Count */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium mr-1 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Filter:</span>
          </span>

          <div className="flex items-center gap-1.5 bg-slate-100/70 p-1 rounded-xl">
            <button
              onClick={() => onFilterChange({ ...filters, ageGroup: 'All', diagnosisStatus: 'All' })}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                filters.ageGroup === 'All' && filters.diagnosisStatus === 'All'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Records
            </button>
            <button
              onClick={() => update('ageGroup', '0-17')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                filters.ageGroup === '0-17'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Children (0–17)
            </button>
            <button
              onClick={() => update('ageGroup', '18-35')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                filters.ageGroup === '18-35'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Young Adults (18–35)
            </button>
            <button
              onClick={() => update('diagnosisStatus', 'Confirmed')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                filters.diagnosisStatus === 'Confirmed'
                  ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Confirmed
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-slate-500 font-normal">
            Matching <span className="font-semibold text-slate-900 font-mono">{filteredCount.toLocaleString()}</span>{' '}
            <span className="text-slate-400">/</span> {totalCount.toLocaleString()}
          </span>

          {activeCount > 0 && (
            <button
              onClick={onResetFilters}
              className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer font-medium hover:underline ml-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          )}

          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium cursor-pointer ml-1 py-1 px-2 hover:bg-blue-50/60 rounded-lg transition-colors"
          >
            <span>{showAdvanced ? 'Fewer options' : 'More filters'}</span>
            {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Advanced Filter Dropdowns (collapsible for reduced visual clutter) */}
      {showAdvanced && (
        <div className="pt-3 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Age Group */}
          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">
              Age Range
            </label>
            <select
              value={filters.ageGroup}
              onChange={(e) => update('ageGroup', e.target.value)}
              className="w-full text-xs bg-slate-50/70 border border-slate-200/80 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
            >
              <option value="All">All Ages</option>
              <option value="0-17">0–17 (Child)</option>
              <option value="18-35">18–35 (Young)</option>
              <option value="36-55">36–55 (Adult)</option>
              <option value="56+">56+ (Senior)</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">
              Gender
            </label>
            <select
              value={filters.gender}
              onChange={(e) => update('gender', e.target.value)}
              className="w-full text-xs bg-slate-50/70 border border-slate-200/80 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
            >
              <option value="All">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Disorder */}
          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">
              Specific Disorder
            </label>
            <select
              value={filters.disorder}
              onChange={(e) => update('disorder', e.target.value)}
              className="w-full text-xs bg-slate-50/70 border border-slate-200/80 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors truncate"
            >
              <option value="All">All 24 Disorders</option>
              {GENETIC_DISORDERS.map((d) => (
                <option key={d.name} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Inheritance */}
          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">
              Inheritance Type
            </label>
            <select
              value={filters.inheritance}
              onChange={(e) => update('inheritance', e.target.value)}
              className="w-full text-xs bg-slate-50/70 border border-slate-200/80 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
            >
              <option value="All">All Patterns</option>
              <option value="Autosomal Dominant">Autosomal Dominant</option>
              <option value="Autosomal Recessive">Autosomal Recessive</option>
              <option value="X-Linked Recessive">X-Linked Recessive</option>
              <option value="X-Linked Dominant">X-Linked Dominant</option>
              <option value="Mitochondrial">Mitochondrial</option>
            </select>
          </div>

          {/* Diagnosis Status */}
          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">
              Diagnosis
            </label>
            <select
              value={filters.diagnosisStatus}
              onChange={(e) => update('diagnosisStatus', e.target.value)}
              className="w-full text-xs bg-slate-50/70 border border-slate-200/80 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
            >
              <option value="All">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Suspected">Suspected</option>
              <option value="Inconclusive">Inconclusive</option>
            </select>
          </div>

          {/* Region */}
          <div>
            <label className="block text-[11px] font-medium text-slate-500 mb-1">
              Region
            </label>
            <select
              value={filters.region}
              onChange={(e) => update('region', e.target.value)}
              className="w-full text-xs bg-slate-50/70 border border-slate-200/80 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors"
            >
              <option value="All">All Regions</option>
              {REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
