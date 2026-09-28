import React, { useState } from 'react';
import { OutlierBoxPlotData } from '../../types/dataset';

interface BoxPlotChartProps {
  data: OutlierBoxPlotData[];
  title?: string;
  variableLabel?: string;
  height?: number;
}

export const BoxPlotChart: React.FC<BoxPlotChartProps> = ({
  data,
  title,
  variableLabel = 'Value',
  height = 300
}) => {
  const [hoveredGroup, setHoveredGroup] = useState<OutlierBoxPlotData | null>(null);

  // Calculate global min and max across all groups
  const allMins = data.map((d) => d.min);
  const allMaxs = data.map((d) => d.max);
  const globalMin = Math.min(...allMins, 0);
  const globalMax = Math.max(...allMaxs, 10);
  const range = globalMax - globalMin || 1;

  const getYPct = (val: number) => {
    // 0% at bottom, 100% at top
    return ((val - globalMin) / range) * 100;
  };

  return (
    <div className="w-full flex flex-col h-full">
      {title && (
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-slate-800 tracking-tight">{title}</h4>
          <span className="text-xs text-slate-500 font-mono">Tukey 1.5×IQR Whiskers</span>
        </div>
      )}

      {/* Boxplot Canvas */}
      <div className="flex-1 relative border-l border-b border-slate-200 ml-8 mb-6 mt-4" style={{ height }}>
        {/* Y-axis guidelines */}
        {[0, 25, 50, 75, 100].map((pct) => {
          const val = globalMin + (pct / 100) * range;
          return (
            <div
              key={pct}
              className="absolute left-0 right-0 border-t border-slate-100 flex items-center"
              style={{ bottom: `${pct}%` }}
            >
              <span className="absolute -left-8 text-[10px] font-mono text-slate-400">
                {val.toFixed(1)}
              </span>
            </div>
          );
        })}

        {/* Categories container */}
        <div className="absolute inset-0 flex items-end justify-around px-4">
          {data.map((group) => {
            const bottomBox = getYPct(group.q1);
            const boxHeight = getYPct(group.q3) - bottomBox;
            const medianPos = getYPct(group.median);
            const minPos = getYPct(group.min);
            const maxPos = getYPct(group.max);
            const isHovered = hoveredGroup?.category === group.category;

            return (
              <div
                key={group.category}
                onMouseEnter={() => setHoveredGroup(group)}
                onMouseLeave={() => setHoveredGroup(null)}
                className="relative flex flex-col items-center h-full justify-end w-20 cursor-pointer group"
              >
                {/* Upper Whisker line */}
                <div
                  className="absolute w-0.5 bg-slate-400 group-hover:bg-blue-600 transition-colors"
                  style={{
                    bottom: `${bottomBox + boxHeight}%`,
                    height: `${maxPos - (bottomBox + boxHeight)}%`
                  }}
                />
                {/* Upper Whisker cap */}
                <div
                  className="absolute w-6 h-0.5 bg-slate-500 group-hover:bg-blue-600"
                  style={{ bottom: `${maxPos}%` }}
                />

                {/* Lower Whisker line */}
                <div
                  className="absolute w-0.5 bg-slate-400 group-hover:bg-blue-600 transition-colors"
                  style={{
                    bottom: `${minPos}%`,
                    height: `${bottomBox - minPos}%`
                  }}
                />
                {/* Lower Whisker cap */}
                <div
                  className="absolute w-6 h-0.5 bg-slate-500 group-hover:bg-blue-600"
                  style={{ bottom: `${minPos}%` }}
                />

                {/* IQR Box (Q1 to Q3) */}
                <div
                  className={`absolute w-12 border-2 rounded-xs transition-all duration-200 ${
                    isHovered
                      ? 'bg-blue-100 border-blue-600 shadow-sm'
                      : 'bg-teal-50/80 border-teal-600'
                  }`}
                  style={{
                    bottom: `${bottomBox}%`,
                    height: `${Math.max(2, boxHeight)}%`
                  }}
                >
                  {/* Median Line */}
                  <div
                    className="absolute w-full h-1 bg-teal-800 -translate-y-1/2"
                    style={{
                      bottom: `${((medianPos - bottomBox) / (boxHeight || 1)) * 100}%`
                    }}
                  />
                </div>

                {/* Outlier Dots */}
                {group.outliers.map((outlierVal, oIdx) => (
                  <div
                    key={oIdx}
                    title={`Outlier: ${outlierVal}`}
                    className="absolute w-2 h-2 rounded-full bg-rose-500 ring-1 ring-white -translate-x-1/2"
                    style={{
                      bottom: `${getYPct(outlierVal)}%`,
                      left: '50%'
                    }}
                  />
                ))}

                {/* Category label */}
                <span className="absolute -bottom-6 text-[10px] font-medium text-slate-600 text-center truncate max-w-[80px]">
                  {group.category.split(' ')[0]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hover Readout */}
      <div className="mt-4 flex items-center justify-between text-xs border-t border-slate-100 pt-2">
        {hoveredGroup ? (
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px]">
            <span className="font-semibold text-slate-800">{hoveredGroup.category}:</span>
            <span className="text-slate-600">Min: {hoveredGroup.min}</span>
            <span className="text-teal-700">Q1: {hoveredGroup.q1}</span>
            <span className="text-blue-700 font-bold">Med: {hoveredGroup.median}</span>
            <span className="text-teal-700">Q3: {hoveredGroup.q3}</span>
            <span className="text-slate-600">Max: {hoveredGroup.max}</span>
            {hoveredGroup.outliers.length > 0 && (
              <span className="text-rose-600">
                Outliers ({hoveredGroup.outliers.length}): {hoveredGroup.outliers.slice(0, 3).join(', ')}...
              </span>
            )}
          </div>
        ) : (
          <span className="text-slate-400 italic text-[11px]">
            Hover over box plot categories to inspect five-number summary (Min, Q1, Median, Q3, Max)
          </span>
        )}
      </div>
    </div>
  );
};
