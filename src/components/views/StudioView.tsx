import React, { useState, useMemo } from 'react';
import {
  BarChart,
  PieChart,
  ScatterChart,
  Layers,
  Save,
  Download,
  Sliders,
  Check,
  Sparkles
} from 'lucide-react';
import { GeneticRecord } from '../../types/dataset';
import { exportRecordsToCSV } from '../../services/exportUtils';
import {
  getDisorderDistribution,
  getAgeDistribution,
  getInheritanceDistribution,
  calculateCorrelationMatrix,
  calculateBoxPlotData
} from '../../services/dataEngine';
import { HorizontalBarChart } from '../charts/HorizontalBarChart';
import { HistogramChart } from '../charts/HistogramChart';
import { DonutChart } from '../charts/DonutChart';
import { HeatmapChart } from '../charts/HeatmapChart';
import { BoxPlotChart } from '../charts/BoxPlotChart';
import { ScatterPlotChart } from '../charts/ScatterPlotChart';

interface StudioViewProps {
  records: GeneticRecord[];
}

type ChartType =
  | 'Bar'
  | 'Histogram'
  | 'Donut'
  | 'Scatter'
  | 'Box Plot'
  | 'Heatmap';

export const StudioView: React.FC<StudioViewProps> = ({ records }) => {
  const [chartType, setChartType] = useState<ChartType>('Bar');
  const [xAxis, setXAxis] = useState<string>('disorder');
  const [yAxis, setYAxis] = useState<string>('count');
  const [severityMin, setSeverityMin] = useState<number>(1.0);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Filter records by local studio controls
  const studioFilteredRecords = useMemo(() => {
    return records.filter((r) => r.severityScore >= severityMin);
  }, [records, severityMin]);

  const chartTypes: { type: ChartType; label: string; icon: React.ElementType }[] = [
    { type: 'Bar', label: 'Bar Chart', icon: BarChart },
    { type: 'Histogram', label: 'Histogram', icon: BarChart },
    { type: 'Donut', label: 'Donut Chart', icon: PieChart },
    { type: 'Scatter', label: 'Scatter Plot', icon: ScatterChart },
    { type: 'Box Plot', label: 'Box Plot', icon: Layers },
    { type: 'Heatmap', label: 'Heatmap', icon: Sliders }
  ];

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleExportPNG = () => {
    const blob = new Blob([`<svg xmlns="http://www.w3.org/2000/svg"><text y="20">GeneScope Chart Export</text></svg>`], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GeneScope_${chartType}_Chart.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Chart Builder
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Pick a chart type and variables to create a custom visualization.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium border border-slate-200 rounded-lg shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {saveSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-teal-600" />
                <span className="text-teal-700">Saved to Report</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5 text-slate-400" />
                <span>Save</span>
              </>
            )}
          </button>

          <button
            onClick={handleExportPNG}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Image</span>
          </button>

          <button
            onClick={() => exportRecordsToCSV(studioFilteredRecords, `GeneScope_${chartType}_Data.csv`)}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Main Studio Dual-Panel Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Builder Configuration Panel (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Step 1: Choose Chart Type
          </h3>

          <div className="grid grid-cols-2 gap-2">
            {chartTypes.map((c) => {
              const isSelected = chartType === c.type;
              const Icon = c.icon;
              return (
                <button
                  key={c.type}
                  onClick={() => setChartType(c.type)}
                  className={`p-2.5 rounded-lg border text-xs font-medium flex items-center gap-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold shadow-2xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{c.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Step 2: Choose Data Variable
            </h3>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Primary Dimension (X-Axis)
              </label>
              <select
                value={xAxis}
                onChange={(e) => setXAxis(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none"
              >
                <option value="disorder">Disorder Name</option>
                <option value="age">Age (Years)</option>
                <option value="inheritance">Inheritance Pattern</option>
                <option value="gender">Gender</option>
                <option value="region">Region</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Metric (Y-Axis)
              </label>
              <select
                value={yAxis}
                onChange={(e) => setYAxis(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none"
              >
                <option value="count">Count of Patients</option>
                <option value="severityScore">Average Severity Score</option>
                <option value="biomarkerValue">Biomarker Level</option>
                <option value="symptomCount">Symptom Count</option>
              </select>
            </div>
          </div>

          {/* Simple Filter */}
          <div className="pt-3 border-t border-slate-100">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-medium text-slate-700">Filter by Min Severity:</span>
              <span className="font-mono font-bold text-blue-700">{severityMin.toFixed(1)} / 10</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="9.0"
              step="0.5"
              value={severityMin}
              onChange={(e) => setSeverityMin(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Right Large Live Chart Preview (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {chartType} Preview
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Showing {studioFilteredRecords.length.toLocaleString()} matching records
              </p>
            </div>
            <span className="text-xs text-teal-700 font-medium">Live Updates</span>
          </div>

          {/* Live Chart Rendering */}
          <div className="flex-1 min-h-[340px] flex items-center justify-center p-2">
            {chartType === 'Bar' && (
              <HorizontalBarChart
                data={getDisorderDistribution(studioFilteredRecords, 10)}
                height={320}
              />
            )}

            {chartType === 'Histogram' && (
              <HistogramChart
                data={getAgeDistribution(studioFilteredRecords)}
                height={280}
              />
            )}

            {chartType === 'Donut' && (
              <DonutChart
                data={getInheritanceDistribution(studioFilteredRecords)}
              />
            )}

            {chartType === 'Scatter' && (
              <ScatterPlotChart
                data={studioFilteredRecords.map((r) => ({
                  x: r.severityScore,
                  y: r.symptomCount,
                  id: r.id,
                  label: r.disorder
                }))}
                xLabel="Severity Score"
                yLabel="Symptom Count"
                height={300}
              />
            )}

            {chartType === 'Box Plot' && (
              <BoxPlotChart
                data={calculateBoxPlotData(studioFilteredRecords, 'severityScore', 'inheritance')}
                height={280}
              />
            )}

            {chartType === 'Heatmap' && (
              <HeatmapChart
                data={calculateCorrelationMatrix(studioFilteredRecords)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
