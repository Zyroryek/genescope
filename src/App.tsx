import React, { useState, useMemo } from 'react';
import { Sidebar, NavItemKey } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { DisclaimerBanner } from './components/layout/DisclaimerBanner';
import { LoginModal } from './components/views/LoginModal';
import { LandingView } from './components/views/LandingView';
import { DashboardView } from './components/views/DashboardView';
import { DatasetView } from './components/views/DatasetView';
import { UploadView } from './components/views/UploadView';
import { CleaningView } from './components/views/CleaningView';
import { EDAView } from './components/views/EDAView';
import { StudioView } from './components/views/StudioView';
import { CorrelationView } from './components/views/CorrelationView';
import { ComparisonView } from './components/views/ComparisonView';
import { ReportsView } from './components/views/ReportsView';
import { ArchitectureView } from './components/views/ArchitectureView';
import { PipelineView } from './components/views/PipelineView';
import { UserFlowView } from './components/views/UserFlowView';
import { AdminView } from './components/views/AdminView';
import { SettingsView } from './components/views/SettingsView';

import { PREDEFINED_DATASETS } from './data/sampleDatasets';
import { GeneticRecord, FilterState, DatasetMetadata } from './types/dataset';
import { applyFilters } from './services/dataEngine';
import { exportRecordsToCSV } from './services/exportUtils';

export default function App() {
  // Navigation State
  const [currentView, setCurrentView] = useState<NavItemKey>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>('alex.mercer@university.edu');

  // Active Dataset State
  const [currentDatasetId, setCurrentDatasetId] = useState<string>('ds-cohort-primary-2026');
  const [allRecords, setAllRecords] = useState<GeneticRecord[]>(() => {
    return PREDEFINED_DATASETS['ds-cohort-primary-2026'].getRecords();
  });
  const [datasetMetadata, setDatasetMetadata] = useState<DatasetMetadata>(() => {
    return PREDEFINED_DATASETS['ds-cohort-primary-2026'].metadata;
  });

  // Global Multi-Dimensional Filters
  const initialFilterState: FilterState = {
    ageGroup: 'All',
    gender: 'All',
    disorder: 'All',
    inheritance: 'All',
    diagnosisStatus: 'All',
    region: 'All',
    searchQuery: ''
  };
  const [filters, setFilters] = useState<FilterState>(initialFilterState);

  // Compute filtered records in real-time
  const filteredRecords = useMemo(() => {
    return applyFilters(allRecords, filters);
  }, [allRecords, filters]);

  // Handlers for switching pre-defined cohorts
  const handleSelectDataset = (id: string) => {
    const cohort = PREDEFINED_DATASETS[id];
    if (cohort) {
      setCurrentDatasetId(id);
      setAllRecords(cohort.getRecords());
      setDatasetMetadata(cohort.metadata);
      setFilters(initialFilterState);
    }
  };

  // Handler for custom uploaded datasets
  const handleDatasetLoaded = (newRecords: GeneticRecord[], newMetadata: DatasetMetadata) => {
    setAllRecords(newRecords);
    setDatasetMetadata(newMetadata);
    setCurrentDatasetId(newMetadata.id);
    setFilters(initialFilterState);
  };

  const handleResetFilters = () => {
    setFilters(initialFilterState);
  };

  const handleClearDataset = () => {
    setAllRecords([]);
    setDatasetMetadata((prev) => ({
      ...prev,
      recordsCount: 0,
      status: 'Raw'
    }));
  };

  const handleResetToDefault = () => {
    handleSelectDataset('ds-cohort-primary-2026');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased">
      {/* Educational & Non-Clinical Ethics Disclaimer Banner */}
      <DisclaimerBanner />

      <div className="flex-1 flex w-full relative">
        {/* Navigation Sidebar */}
        <Sidebar
          currentView={currentView}
          onNavigate={(view) => setCurrentView(view)}
          isOpenMobile={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Backdrop for mobile sidebar */}
        {isMobileMenuOpen && (
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden backdrop-blur-2xs"
          />
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar
            currentDatasetId={currentDatasetId}
            onSelectDataset={handleSelectDataset}
            datasetMetadata={datasetMetadata}
            searchQuery={filters.searchQuery}
            onSearchChange={(q) => setFilters((f) => ({ ...f, searchQuery: q }))}
            onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
            onNavigateToUpload={() => setCurrentView('upload')}
            onDownloadCSV={() => exportRecordsToCSV(allRecords, datasetMetadata.name)}
            onOpenLogin={() => setIsLoginModalOpen(true)}
            userEmail={userEmail}
          />

          {/* Active View Router */}
          <main className="flex-1 overflow-y-auto">
            {currentView === 'landing' && (
              <LandingView
                onOpenDashboard={() => setCurrentView('dashboard')}
                onExploreDataset={() => setCurrentView('dataset')}
                datasetMetadata={datasetMetadata}
              />
            )}

            {currentView === 'dashboard' && (
              <DashboardView
                records={filteredRecords}
                allRecords={allRecords}
                filters={filters}
                onFilterChange={setFilters}
                onResetFilters={handleResetFilters}
                datasetMetadata={datasetMetadata}
                onNavigateToView={(view) => setCurrentView(view)}
              />
            )}

            {currentView === 'dataset' && (
              <DatasetView
                records={filteredRecords}
                datasetMetadata={datasetMetadata}
                onNavigateToUpload={() => setCurrentView('upload')}
                onClearDataset={handleClearDataset}
                onResetDataset={handleResetToDefault}
              />
            )}

            {currentView === 'upload' && (
              <UploadView
                onDatasetLoaded={handleDatasetLoaded}
                onNavigateToCleaning={() => setCurrentView('cleaning')}
              />
            )}

            {currentView === 'cleaning' && (
              <CleaningView
                records={allRecords}
                onCleanComplete={() => {
                  setDatasetMetadata((prev) => ({
                    ...prev,
                    status: 'Ready for Analysis'
                  }));
                }}
              />
            )}

            {currentView === 'eda' && <EDAView records={filteredRecords} />}

            {currentView === 'studio' && <StudioView records={filteredRecords} />}

            {currentView === 'correlation' && (
              <CorrelationView records={filteredRecords} />
            )}

            {currentView === 'comparison' && (
              <ComparisonView records={allRecords} />
            )}

            {currentView === 'reports' && (
              <ReportsView
                records={filteredRecords}
                datasetMetadata={datasetMetadata}
              />
            )}

            {currentView === 'architecture' && <ArchitectureView />}

            {currentView === 'pipeline' && <PipelineView />}

            {currentView === 'userflow' && (
              <UserFlowView
                onNavigateToView={(view) => setCurrentView(view)}
              />
            )}

            {currentView === 'admin' && (
              <AdminView currentMetadata={datasetMetadata} />
            )}

            {currentView === 'settings' && <SettingsView />}
          </main>
        </div>
      </div>

      {/* Authentication & Demo Access Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={(email) => setUserEmail(email)}
      />
    </div>
  );
}
