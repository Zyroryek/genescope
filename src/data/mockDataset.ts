import { GeneticRecord, InheritanceType, Gender, DiagnosisStatus, Region, DatasetMetadata } from '../types/dataset';

export const GENETIC_DISORDERS: { name: string; defaultInheritance: InheritanceType; typicalAgeRange: [number, number]; maleBias?: number }[] = [
  { name: 'Cystic Fibrosis', defaultInheritance: 'Autosomal Recessive', typicalAgeRange: [2, 38] },
  { name: "Huntington's Disease", defaultInheritance: 'Autosomal Dominant', typicalAgeRange: [32, 65] },
  { name: 'Sickle Cell Anemia', defaultInheritance: 'Autosomal Recessive', typicalAgeRange: [4, 45] },
  { name: 'Thalassemia Major', defaultInheritance: 'Autosomal Recessive', typicalAgeRange: [3, 40] },
  { name: 'Marfan Syndrome', defaultInheritance: 'Autosomal Dominant', typicalAgeRange: [12, 55] },
  { name: 'Hemophilia A', defaultInheritance: 'X-Linked Recessive', typicalAgeRange: [1, 50], maleBias: 0.96 },
  { name: 'Hemophilia B', defaultInheritance: 'X-Linked Recessive', typicalAgeRange: [2, 52], maleBias: 0.94 },
  { name: 'Neurofibromatosis Type 1', defaultInheritance: 'Autosomal Dominant', typicalAgeRange: [5, 48] },
  { name: 'Duchenne Muscular Dystrophy', defaultInheritance: 'X-Linked Recessive', typicalAgeRange: [3, 24], maleBias: 0.98 },
  { name: 'Fragile X Syndrome', defaultInheritance: 'X-Linked Dominant', typicalAgeRange: [2, 35], maleBias: 0.75 },
  { name: 'Down Syndrome', defaultInheritance: 'Autosomal Recessive', typicalAgeRange: [0, 60] },
  { name: 'Gaucher Disease', defaultInheritance: 'Autosomal Recessive', typicalAgeRange: [8, 55] },
  { name: 'Tay-Sachs Disease', defaultInheritance: 'Autosomal Recessive', typicalAgeRange: [1, 8] },
  { name: 'Wilson Disease', defaultInheritance: 'Autosomal Recessive', typicalAgeRange: [10, 42] },
  { name: 'Familial Hypercholesterolemia', defaultInheritance: 'Autosomal Dominant', typicalAgeRange: [18, 70] },
  { name: 'Phenylketonuria (PKU)', defaultInheritance: 'Autosomal Recessive', typicalAgeRange: [1, 30] },
  { name: 'Charcot-Marie-Tooth Disease', defaultInheritance: 'Autosomal Dominant', typicalAgeRange: [14, 58] },
  { name: 'Polycystic Kidney Disease', defaultInheritance: 'Autosomal Dominant', typicalAgeRange: [25, 68] },
  { name: 'Rett Syndrome', defaultInheritance: 'X-Linked Dominant', typicalAgeRange: [2, 28], maleBias: 0.05 },
  { name: 'Albinism Oculocutaneous', defaultInheritance: 'Autosomal Recessive', typicalAgeRange: [5, 62] },
  { name: 'Hereditary Spherocytosis', defaultInheritance: 'Autosomal Dominant', typicalAgeRange: [6, 50] },
  { name: 'Leber Optic Neuropathy', defaultInheritance: 'Mitochondrial', typicalAgeRange: [15, 36], maleBias: 0.80 },
  { name: 'Myotonic Dystrophy', defaultInheritance: 'Autosomal Dominant', typicalAgeRange: [20, 60] },
  { name: 'Fabry Disease', defaultInheritance: 'X-Linked Recessive', typicalAgeRange: [12, 54], maleBias: 0.70 }
];

export const REGIONS: Region[] = [
  'North America',
  'Europe',
  'East Asia',
  'South Asia',
  'Latin America',
  'Sub-Saharan Africa'
];

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

// Seeded PRNG for reproducible synthetic cohorts
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateSyntheticDataset(count = 5000, seed = 2026): GeneticRecord[] {
  const rng = mulberry32(seed);
  const records: GeneticRecord[] = [];

  for (let i = 0; i < count; i++) {
    const padId = String(i + 1).padStart(4, '0');
    const id = `PAT-2026-${padId}`;

    // Select disorder with realistic slight weighting
    const disorderIndex = Math.floor(rng() * GENETIC_DISORDERS.length);
    const disorderConfig = GENETIC_DISORDERS[disorderIndex];

    // Gender with disease-specific biases where applicable
    let gender: Gender = 'Female';
    const maleProb = disorderConfig.maleBias !== undefined ? disorderConfig.maleBias : 0.49;
    const rGender = rng();
    if (rGender < maleProb) {
      gender = 'Male';
    } else if (rGender > 0.985) {
      gender = 'Other';
    }

    // Age bounded by clinical typical onset
    const [minAge, maxAge] = disorderConfig.typicalAgeRange;
    const baseAge = minAge + Math.floor(rng() * (maxAge - minAge + 1));
    const age = Math.min(92, Math.max(1, baseAge + Math.floor((rng() - 0.5) * 8)));

    // Family history (stronger in dominant inheritance)
    const isDominant = disorderConfig.defaultInheritance.includes('Dominant');
    const famHistoryProb = isDominant ? 0.78 : 0.44;
    const familyHistory = rng() < famHistoryProb;

    // Diagnosis status
    const rDiag = rng();
    let diagnosisStatus: DiagnosisStatus = 'Confirmed';
    if (rDiag > 0.88) {
      diagnosisStatus = 'Suspected';
    } else if (rDiag > 0.82) {
      diagnosisStatus = 'Inconclusive';
    }

    // Severity Score (1.0 to 10.0), moderately influenced by age and family history
    const baseSeverity = 2.5 + rng() * 5.0;
    const ageFactor = (age / 80) * 1.5;
    const severityScore = Number(Math.min(9.9, Math.max(1.1, baseSeverity + ageFactor)).toFixed(1));

    // Symptom count (1 to 14) correlated with severityScore (target r ~ 0.70)
    const symptomNoise = (rng() - 0.5) * 2.8;
    const calcSymptoms = Math.round(severityScore * 1.25 + symptomNoise);
    const symptomCount = Math.max(1, Math.min(14, calcSymptoms));

    // Biomarker Value (ng/mL) correlated with severity and mutations
    const baseBiomarker = 25 + severityScore * 12.8 + (rng() - 0.5) * 24;
    const biomarkerValue = Number(Math.max(10.2, Math.min(198.5, baseBiomarker)).toFixed(1));

    // Treatment duration in months
    const treatmentDurationMonths = Math.floor(rng() * 48);

    // Gene mutation count (1 - 7)
    const geneMutationCount = Math.max(1, Math.min(7, Math.floor(severityScore * 0.6 + rng() * 2.5)));

    // Region
    const region = REGIONS[Math.floor(rng() * REGIONS.length)];

    // Carrier status
    const carrierStatus = rng() < 0.28;

    // Blood group
    const bloodGroup = BLOOD_GROUPS[Math.floor(rng() * BLOOD_GROUPS.length)];

    records.push({
      id,
      age,
      gender,
      disorder: disorderConfig.name,
      inheritance: disorderConfig.defaultInheritance,
      familyHistory,
      diagnosisStatus,
      severityScore,
      symptomCount,
      biomarkerValue,
      treatmentDurationMonths,
      geneMutationCount,
      region,
      carrierStatus,
      bloodGroup
    });
  }

  return records;
}

export const INITIAL_DATASET_METADATA: DatasetMetadata = {
  id: 'ds-cohort-primary-2026',
  name: 'Genetic_Disorder_Dataset.csv',
  recordsCount: 5000,
  columnsCount: 12,
  fileSize: '1.24 MB',
  lastUpdated: 'Spring 2026',
  status: 'Ready for Analysis',
  description: 'Primary comprehensive multi-cohort genetic disorder exploration dataset with clinical & phenotypic features.',
  cohortType: 'Synthetic Educational Dataset (Demo Data)'
};
