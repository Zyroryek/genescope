import { GeneticRecord } from '../types/dataset';

export function exportRecordsToCSV(records: GeneticRecord[], filename = 'GeneScope_Genetic_Disorder_Dataset.csv') {
  if (!records || records.length === 0) return;

  const headers = [
    'Patient_ID',
    'Age',
    'Gender',
    'Disorder',
    'Inheritance_Type',
    'Family_History',
    'Diagnosis_Status',
    'Severity_Score',
    'Symptom_Count',
    'Biomarker_Value_ng_mL',
    'Treatment_Duration_Months',
    'Gene_Mutation_Count',
    'Region',
    'Carrier_Status',
    'Blood_Group'
  ];

  const rows = records.map((r) => [
    r.id,
    r.age,
    r.gender,
    `"${r.disorder}"`,
    `"${r.inheritance}"`,
    r.familyHistory ? 'Yes' : 'No',
    r.diagnosisStatus,
    r.severityScore,
    r.symptomCount,
    r.biomarkerValue,
    r.treatmentDurationMonths,
    r.geneMutationCount,
    `"${r.region}"`,
    r.carrierStatus ? 'Carrier' : 'Non-Carrier',
    r.bloodGroup
  ]);

  const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportTextReport(reportText: string, filename = 'GeneScope_Analytics_Report.txt') {
  const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
