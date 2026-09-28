import { DatasetMetadata, GeneticRecord } from '../types/dataset';
import { generateSyntheticDataset } from './mockDataset';

export interface PredefinedDataset {
  metadata: DatasetMetadata;
  getRecords: () => GeneticRecord[];
}

export const PREDEFINED_DATASETS: Record<string, PredefinedDataset> = {
  'ds-cohort-primary-2026': {
    metadata: {
      id: 'ds-cohort-primary-2026',
      name: 'Genetic_Disorder_Dataset.csv',
      recordsCount: 5000,
      columnsCount: 12,
      fileSize: '1.24 MB',
      lastUpdated: 'Spring 2026',
      status: 'Ready for Analysis',
      description: 'Primary comprehensive multi-cohort genetic disorder exploration dataset with clinical & phenotypic features.',
      cohortType: 'Synthetic Multi-Disorder Cohort (Demo Data)'
    },
    getRecords: () => generateSyntheticDataset(5000, 2026)
  },
  'ds-pediatric-rare-2026': {
    metadata: {
      id: 'ds-pediatric-rare-2026',
      name: 'Pediatric_Rare_Variants_1200.csv',
      recordsCount: 1200,
      columnsCount: 12,
      fileSize: '312 KB',
      lastUpdated: 'Spring 2026',
      status: 'Ready for Analysis',
      description: 'Pediatric cohort filtered for early-onset autosomal and X-linked genetic disorders under age 18.',
      cohortType: 'Synthetic Pediatric Registry (Demo Data)'
    },
    getRecords: () => {
      const all = generateSyntheticDataset(3500, 999);
      return all.filter((r) => r.age <= 18).slice(0, 1200);
    }
  },
  'ds-cardiogenetic-2500': {
    metadata: {
      id: 'ds-cardiogenetic-2500',
      name: 'Cardio_Neuromuscular_Panel_2500.csv',
      recordsCount: 2500,
      columnsCount: 12,
      fileSize: '640 KB',
      lastUpdated: 'Spring 2026',
      status: 'Ready for Analysis',
      description: 'Focused panel of neuromuscular, connective tissue, and metabolic genetic disorders.',
      cohortType: 'Synthetic Specialized Panel (Demo Data)'
    },
    getRecords: () => {
      const all = generateSyntheticDataset(4000, 5432);
      const targetDisorders = new Set([
        'Marfan Syndrome',
        'Duchenne Muscular Dystrophy',
        'Charcot-Marie-Tooth Disease',
        'Myotonic Dystrophy',
        'Familial Hypercholesterolemia',
        'Fabry Disease'
      ]);
      return all.filter((r) => targetDisorders.has(r.disorder)).slice(0, 2500);
    }
  }
};
