export type Gender = 'Male' | 'Female' | 'Other';

export type InheritanceType =
  | 'Autosomal Dominant'
  | 'Autosomal Recessive'
  | 'X-Linked Dominant'
  | 'X-Linked Recessive'
  | 'Mitochondrial';

export type DiagnosisStatus = 'Confirmed' | 'Suspected' | 'Inconclusive';

export type Region =
  | 'North America'
  | 'Europe'
  | 'East Asia'
  | 'South Asia'
  | 'Latin America'
  | 'Sub-Saharan Africa';

export interface GeneticRecord {
  id: string;
  age: number;
  gender: Gender;
  disorder: string;
  inheritance: InheritanceType;
  familyHistory: boolean;
  diagnosisStatus: DiagnosisStatus;
  severityScore: number; // 1.0 - 10.0
  symptomCount: number; // 1 - 15
  biomarkerValue: number; // 10.0 - 200.0 ng/mL
  treatmentDurationMonths: number; // 0 - 60
  geneMutationCount: number; // 1 - 8
  region: Region;
  carrierStatus: boolean;
  bloodGroup: string;
}

export interface FilterState {
  ageGroup: string; // 'All', '0-17', '18-35', '36-55', '56+'
  gender: string;
  disorder: string;
  inheritance: string;
  diagnosisStatus: string;
  region: string;
  searchQuery: string;
}

export interface DatasetMetadata {
  id: string;
  name: string;
  recordsCount: number;
  columnsCount: number;
  fileSize: string;
  lastUpdated: string;
  status: 'Ready for Analysis' | 'Processing' | 'Cleaned' | 'Raw';
  description: string;
  cohortType: string;
}

export interface ColumnQualityReport {
  column: string;
  missingCount: number;
  missingPercent: number;
  uniqueCount: number;
  dataType: string;
  status: 'Good' | 'Fair' | 'Needs Imputation';
}

export interface DatasetQualitySummary {
  totalRows: number;
  totalColumns: number;
  missingValuesCount: number;
  missingPercent: number;
  duplicateRowsCount: number;
  invalidValuesCount: number;
  overallCompleteness: number; // e.g., 96.4%
  columns: ColumnQualityReport[];
}

export interface DescriptiveStats {
  column: string;
  mean: number;
  median: number;
  mode: number;
  stdDev: number;
  min: number;
  max: number;
  q1: number;
  q3: number;
  iqr: number;
  skewness: number;
}

export interface CorrelationCell {
  var1: string;
  var2: string;
  coefficient: number;
  pValue: number;
  sampleSize: number;
}

export interface OutlierBoxPlotData {
  category: string;
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  outliers: number[];
}

export interface AutoInsight {
  id: string;
  title: string;
  description: string;
  metricType: 'prevalence' | 'distribution' | 'correlation' | 'quality';
  significance: 'high' | 'medium' | 'low';
}
