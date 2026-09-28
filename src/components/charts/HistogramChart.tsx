import React, { useState } from 'react';

interface BinItem {
  label: string;
  min: number;
  max: number;
  count: number;
  percentage: number;
}

interface HistogramChartProps {
  data: BinItem[];
  title?: string;
  height?: number;
}

export const HistogramChart: React.FC<HistogramChartProps> = ({ data, title, height = 240 }) => {
  const [hoveredBin, setHoveredBin] = useState<BinItem | null>(null);
  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="w-full flex flex-col h-full">
      {title && (
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-slate-800 tracking-tight">{title}</h4>
          <span className="text-xs text-slate-500 font-mono">Age Bracket (Years)</span>
        </div>
      )}

      {/* Chart Canvas */}
      <div className="relative flex-1 flex items-end gap-1.5 pt-6 pb-2" style={{ height }}>
        {data.map((bin) => {
          const heightPct = (bin.count / maxCount) * 100;
          const isHovered = hoveredBin?.label === bin.label;

          return (
            <div
              key={bin.label}
              className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
              onMouseEnter={() => setHoveredBin(bin)}
              onMouseLeave={() => setHoveredBin(null)}
            >
              {/* Bar */}
              <div className="w-full relative flex items-end justify-center">
                <div
                  className={`w-full max-w-[34px] rounded-t transition-all duration-200 ${
                    isHovered
                      ? 'bg-teal-500 shadow-sm scale-y-[1.02]'
                      : 'bg-teal-600/80 hover:bg-teal-500'
                  }`}
                  style={{ height: `${Math.max(4, heightPct)}%` }}
                />
              </div>

              {/* Label */}
              <span className={`text-[11px] mt-2 font-mono tabular-nums transition-colors ${
                isHovered ? 'text-teal-700 font-semibold' : 'text-slate-500'
              }`}>
                {bin.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Tooltip / Active status */}
      <div className="mt-2 h-6 flex items-center justify-between text-xs border-t border-slate-100 pt-1.5">
        {hoveredBin ? (
          <>
            <span className="text-slate-600 font-medium">Age {hoveredBin.label} years:</span>
            <span className="font-mono text-slate-900 font-semibold">
              {hoveredBin.count.toLocaleString()} records ({hoveredBin.percentage}%)
            </span>
          </>
        ) : (
          <span className="text-slate-400 italic text-[11px]">Hover over age bars to inspect cohort frequency</span>
        )}
      </div>
    </div>
  );
};
