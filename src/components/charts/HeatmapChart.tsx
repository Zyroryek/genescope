import React, { useState } from 'react';
import { CorrelationCell } from '../../types/dataset';

interface HeatmapChartProps {
  data: CorrelationCell[];
  title?: string;
  onSelectCell?: (cell: CorrelationCell) => void;
  compact?: boolean;
}

export const HeatmapChart: React.FC<HeatmapChartProps> = ({
  data,
  title,
  onSelectCell,
  compact = false
}) => {
  const [hoveredCell, setHoveredCell] = useState<CorrelationCell | null>(null);

  // Extract unique variables preserving order
  const variables: string[] = Array.from(new Set(data.map((d) => d.var1)));

  // Helper for correlation color ramp:
  // -1.0 -> deep blue (#1e3a8a)
  // 0.0 -> neutral light slate (#f1f5f9)
  // +1.0 -> rich teal/blue (#0d9488 / #2563eb)
  const getCellColor = (r: number) => {
    if (r === 1) return '#2563eb'; // Diagonal
    if (r > 0) {
      // Positive correlation: from soft teal to deep teal
      if (r >= 0.6) return '#0f766e';
      if (r >= 0.4) return '#0d9488';
      if (r >= 0.2) return '#2dd4bf';
      return '#ccfbf1';
    } else {
      // Negative correlation: from soft indigo to deep indigo
      if (r <= -0.6) return '#312e81';
      if (r <= -0.4) return '#4338ca';
      if (r <= -0.2) return '#818cf8';
      return '#e0e7ff';
    }
  };

  const getTextColor = (r: number) => {
    return Math.abs(r) >= 0.35 ? '#ffffff' : '#1e293b';
  };

  return (
    <div className="w-full flex flex-col h-full">
      {title && (
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-slate-800 tracking-tight">{title}</h4>
          <span className="text-[11px] text-slate-500 font-mono">Pearson r (-1.0 to +1.0)</span>
        </div>
      )}

      {/* Heatmap Grid */}
      <div className="flex-1 overflow-x-auto flex items-center justify-center p-2">
        <div className="inline-block border border-slate-200 rounded-lg overflow-hidden bg-white shadow-xs">
          {/* Column Header Row */}
          <div className="flex">
            <div className={`${compact ? 'w-24' : 'w-32'} h-8 shrink-0 bg-slate-50 border-b border-r border-slate-200 flex items-center px-2 text-[10px] font-mono text-slate-400 font-semibold uppercase tracking-wider`}>
              Variables
            </div>
            {variables.map((v) => (
              <div
                key={v}
                title={v}
                className={`${compact ? 'w-16' : 'w-24'} h-8 shrink-0 bg-slate-50 border-b border-r border-slate-200 last:border-r-0 flex items-center justify-center px-1 text-[11px] font-medium text-slate-600 truncate`}
              >
                {compact ? v.split(' ')[0] : v}
              </div>
            ))}
          </div>

          {/* Grid Rows */}
          {variables.map((rowVar) => (
            <div key={rowVar} className="flex border-b border-slate-100 last:border-b-0">
              {/* Row Header */}
              <div
                title={rowVar}
                className={`${compact ? 'w-24' : 'w-32'} ${compact ? 'h-10' : 'h-12'} shrink-0 bg-slate-50/70 border-r border-slate-200 flex items-center px-2 text-[11px] font-medium text-slate-700 truncate`}
              >
                {compact ? rowVar.split(' ')[0] : rowVar}
              </div>

              {/* Matrix Cells */}
              {variables.map((colVar) => {
                const cell = data.find((c) => c.var1 === rowVar && c.var2 === colVar);
                const r = cell ? cell.coefficient : 0;
                const isHovered =
                  hoveredCell?.var1 === rowVar && hoveredCell?.var2 === colVar;

                return (
                  <div
                    key={`${rowVar}-${colVar}`}
                    onClick={() => cell && onSelectCell && onSelectCell(cell)}
                    onMouseEnter={() => cell && setHoveredCell(cell)}
                    onMouseLeave={() => setHoveredCell(null)}
                    style={{
                      backgroundColor: getCellColor(r),
                      color: getTextColor(r)
                    }}
                    className={`${compact ? 'w-16 h-10' : 'w-24 h-12'} shrink-0 border-r border-slate-200/50 last:border-r-0 flex flex-col items-center justify-center cursor-pointer transition-all duration-150 ${
                      isHovered ? 'ring-2 ring-blue-500 ring-inset z-10 scale-[1.04]' : 'hover:opacity-90'
                    }`}
                  >
                    <span className="font-mono text-xs font-semibold tabular-nums">
                      {r > 0 && r !== 1 ? `+${r.toFixed(2)}` : r.toFixed(2)}
                    </span>
                    {!compact && cell && (
                      <span className="text-[9px] opacity-80 font-mono">
                        {r === 1 ? 'identity' : `p<${cell.pValue}`}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Heatmap Legend & Tooltip */}
      <div className="mt-3 flex flex-col sm:flex-row items-center justify-between text-xs border-t border-slate-100 pt-2 gap-2">
        {hoveredCell ? (
          <div className="flex items-center gap-2">
            <span className="font-medium text-slate-700">
              {hoveredCell.var1} ↔ {hoveredCell.var2}:
            </span>
            <span className="font-mono font-bold text-blue-700">
              r = {hoveredCell.coefficient.toFixed(2)}
            </span>
            <span className="text-slate-400 font-mono text-[11px]">
              (p = {hoveredCell.pValue}, N={hoveredCell.sampleSize})
            </span>
          </div>
        ) : (
          <span className="text-slate-400 italic text-[11px]">
            Hover over matrix cells to inspect correlation coefficients & significance
          </span>
        )}

        {/* Color Scale Bar */}
        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
          <span>-1.0</span>
          <div className="w-24 h-2 rounded bg-gradient-to-r from-indigo-800 via-slate-100 to-teal-700 border border-slate-200" />
          <span>+1.0</span>
        </div>
      </div>
    </div>
  );
};
