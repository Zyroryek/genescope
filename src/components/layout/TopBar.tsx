import React, { useState } from 'react';
import {
  Search,
  Database,
  ChevronDown,
  Menu,
  Download,
  Upload,
  Check
} from 'lucide-react';
import { PREDEFINED_DATASETS } from '../../data/sampleDatasets';
import { DatasetMetadata } from '../../types/dataset';

interface TopBarProps {
  currentDatasetId: string;
  onSelectDataset: (datasetId: string) => void;
  datasetMetadata: DatasetMetadata;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenMobileMenu: () => void;
  onNavigateToUpload: () => void;
  onDownloadCSV: () => void;
  onOpenLogin: () => void;
  userEmail: string | null;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentDatasetId,
  onSelectDataset,
  datasetMetadata,
  searchQuery,
  onSearchChange,
  onOpenMobileMenu,
  onNavigateToUpload,
  onDownloadCSV,
  onOpenLogin,
  userEmail
}) => {
  const [showDatasetMenu, setShowDatasetMenu] = useState(false);

  return (
    <header className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between gap-4 sticky top-0 z-30">
      {/* Left: Mobile hamburger & Search */}
      <div className="flex items-center gap-3 flex-1 max-w-sm">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-1.5 text-slate-500 hover:text-slate-800 rounded-md hover:bg-slate-100 cursor-pointer"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search disorders, age, region..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Right: Dataset dropdown & Quick export */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Dataset dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDatasetMenu(!showDatasetMenu)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <Database className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="font-mono text-slate-800 truncate max-w-[130px] sm:max-w-[180px]">
              {datasetMetadata.name}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
          </button>

          {showDatasetMenu && (
            <div className="absolute right-0 mt-1.5 w-72 bg-white rounded-lg shadow-lg border border-slate-200 py-1.5 z-50 text-xs">
              <div className="px-3 py-1 text-[10px] font-semibold uppercase text-slate-400">
                Switch Dataset
              </div>
              {Object.values(PREDEFINED_DATASETS).map((ds) => {
                const isSelected = ds.metadata.id === currentDatasetId;
                return (
                  <button
                    key={ds.metadata.id}
                    onClick={() => {
                      onSelectDataset(ds.metadata.id);
                      setShowDatasetMenu(false);
                    }}
                    className={`w-full px-3 py-2 text-left flex items-start gap-2 hover:bg-slate-50 transition-colors cursor-pointer ${
                      isSelected ? 'bg-blue-50 text-blue-900' : 'text-slate-700'
                    }`}
                  >
                    <div className="mt-0.5">
                      {isSelected ? (
                        <Check className="w-3.5 h-3.5 text-blue-600" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border border-slate-300" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{ds.metadata.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        {ds.metadata.recordsCount.toLocaleString()} rows
                      </div>
                    </div>
                  </button>
                );
              })}
              <div className="border-t border-slate-100 mt-1 pt-1 px-2">
                <button
                  onClick={() => {
                    setShowDatasetMenu(false);
                    onNavigateToUpload();
                  }}
                  className="w-full py-1.5 px-2 text-blue-600 hover:bg-blue-50 rounded flex items-center justify-center gap-1.5 font-medium transition-colors cursor-pointer"
                >
                  <Upload className="w-3 h-3" /> Upload Custom File
                </button>
              </div>
            </div>
          )}
        </div>

        {/* CSV export */}
        <button
          onClick={onDownloadCSV}
          title="Download dataset as CSV"
          className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>Export CSV</span>
        </button>

        {/* Profile / Demo status */}
        <button
          onClick={onOpenLogin}
          className="flex items-center gap-1.5 pl-2 pr-1 py-1 rounded-lg hover:bg-slate-100 transition-colors text-xs cursor-pointer"
          title="Switch User / Login"
        >
          <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-semibold flex items-center justify-center text-[10px]">
            {userEmail ? userEmail.charAt(0).toUpperCase() : 'A'}
          </div>
          <span className="hidden md:inline text-slate-700 font-medium text-xs">
            Demo
          </span>
        </button>
      </div>
    </header>
  );
};
