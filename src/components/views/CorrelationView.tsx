import React, { useState } from 'react';
import {
  Compass,
  AlertCircle,
  TrendingUp,
  Activity,
  ArrowRight,
  Info
} from 'lucide-react';
import { GeneticRecord, CorrelationCell } from '../../types/dataset';
import { calculateCorrelationMatrix } from '../../services/dataEngine';
import { HeatmapChart } from '../charts/HeatmapChart';
import { ScatterPlotChart } from '../charts/ScatterPlotChart';

interface CorrelationViewProps {
  records: GeneticRecord[];
}

export const CorrelationView: React.FC<CorrelationViewProps> = ({ records }) => {
  const correlationMatrix = calculateCorrelationMatrix(records);

  // Selected pair for bivariate scatter drill-down
  const [selectedPair, setSelectedPair] = useState<{ var1: string; var2: string }>({
    var1: 'Severity Score',
    var2: 'Symptom Count'
  });

  // Extract non-diagonal unique pairs for correlation summary
  const uniquePairs = correlationMatrix
    .filter((c) => c.var1 !== c.var2)
    .filter((c, idx, arr) => {
      return arr.findIndex((x) => (x.var1 === c.var2 && x.var2 === c.var1) || (x.var1 === c.var1 && x.var2 === c.var2)) === idx;
    })
    .sort((a, b) => Math.abs(b.coefficient) - Math.abs(a.coefficient));

  // Map variable label back to record key
  const labelToKeyMap: Record<string, keyof GeneticRecord> = {
    'Age': 'age',
    'Severity Score': 'severityScore',
    'Symptom Count': 'symptomCount',
    'Biomarker Value': 'biomarkerValue',
    'Treatment Duration': 'treatmentDurationMonths',
    'Gene Mutation Count': 'geneMutationCount'
  };

  const key1 = labelToKeyMap[selectedPair.var1] || 'severityScore';
  const key2 = labelToKeyMap[selectedPair.var2] || 'symptomCount';

  const scatterData = records.slice(0, 300).map((r) => ({
    x: Number(r[key1]),
    y: Number(r[key2]),
    id: r.id,
    label: r.disorder
  }));

  const activePairCell = correlationMatrix.find(
    (c) => c.var1 === selectedPair.var1 && c.var2 === selectedPair.var2
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Correlation Analysis
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Discover which clinical variables move together. Click any cell to inspect the scatter plot.
          </p>
        </div>
      </div>

      {/* Friendly Explanatory Note */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-slate-700">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-semibold text-slate-900">
            How to read this chart:
          </span>
          <p className="text-slate-600 leading-relaxed text-xs">
            Values near <strong className="text-teal-700">+1.0</strong> mean the two features increase together (e.g. higher symptom count corresponds to higher severity).
            Values near <strong className="text-slate-700">0.0</strong> mean no link.
            <span className="text-slate-500 ml-1">
              (Note: Correlation shows mathematical association, not direct biological cause.)
            </span>
          </p>
        </div>
      </div>

      {/* Main Heatmap Section */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-900">
            Variable Correlation Heatmap
          </h3>
          <span className="text-xs text-slate-400">
            Click any cell to preview scatter plot
          </span>
        </div>

        <div className="py-2">
          <HeatmapChart
            data={correlationMatrix}
            onSelectCell={(cell) => {
              if (cell.var1 !== cell.var2) {
                setSelectedPair({ var1: cell.var1, var2: cell.var2 });
              }
            }}
          />
        </div>
      </div>

      {/* Bivariate Drill-Down & Correlation Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Selected Pair Scatter Inspector (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Scatter Plot: {selectedPair.var1} vs {selectedPair.var2}
              </h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Correlation: <strong className="text-blue-700">r = {activePairCell?.coefficient.toFixed(2)}</strong>
              </p>
            </div>
            <span className="text-xs text-slate-400">300 Sampled Patients</span>
          </div>

          <div className="flex-1 min-h-[250px] flex items-center justify-center">
            <ScatterPlotChart
              data={scatterData}
              xLabel={selectedPair.var1}
              yLabel={selectedPair.var2}
              height={250}
            />
          </div>
        </div>

        {/* Right: Correlation Summary Table (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <div className="pb-2 border-b border-slate-100 mb-2">
            <h3 className="text-sm font-bold text-slate-900">
              Ranked Relationships
            </h3>
            <p className="text-xs text-slate-500">
              Pairs ordered from strongest to weakest link
            </p>
          </div>

          <div className="flex-1 overflow-y-auto max-h-[280px] space-y-2 pr-1">
            {uniquePairs.map((pair) => {
              const isSelected =
                (selectedPair.var1 === pair.var1 && selectedPair.var2 === pair.var2) ||
                (selectedPair.var1 === pair.var2 && selectedPair.var2 === pair.var1);
              const absR = Math.abs(pair.coefficient);
              const strength =
                absR >= 0.7
                  ? 'Strong link'
                  : absR >= 0.4
                  ? 'Moderate link'
                  : absR >= 0.2
                  ? 'Weak link'
                  : 'Minimal link';

              return (
                <div
                  key={`${pair.var1}-${pair.var2}`}
                  onClick={() => setSelectedPair({ var1: pair.var1, var2: pair.var2 })}
                  className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-50 border-blue-500 shadow-2xs font-medium'
                      : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100/70'
                  }`}
                >
                  <div className="flex items-center justify-between text-slate-900">
                    <span className="font-semibold">
                      {pair.var1} &amp; {pair.var2}
                    </span>
                    <span className="font-mono text-blue-700 font-bold tabular-nums">
                      r = {pair.coefficient > 0 ? `+${pair.coefficient.toFixed(2)}` : pair.coefficient.toFixed(2)}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
                    <span>{strength}</span>
                    <span className="font-mono">N={records.length}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
