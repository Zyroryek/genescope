import React, { useState } from 'react';

interface BarItem {
  disorder: string;
  count: number;
  percentage: number;
}

interface HorizontalBarChartProps {
  data: BarItem[];
  title?: string;
  height?: number;
}

export const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({
  data,
  title,
  height = 360
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="w-full flex flex-col h-full">
      {title && (
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-slate-800 tracking-tight">{title}</h4>
          <span className="text-xs text-slate-500 font-mono">Top {data.length} Cohorts</span>
        </div>
      )}
      <div className="flex-1 overflow-y-auto pr-2 space-y-2.5" style={{ maxHeight: height }}>
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-xs text-slate-400">
            No records matching active filter
          </div>
        ) : (
          data.map((item, index) => {
            const widthPct = (item.count / maxCount) * 100;
            const isHovered = hoveredIdx === index;

            return (
              <div
                key={item.disorder}
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="group cursor-pointer transition-colors"
              >
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className={`font-medium truncate max-w-[200px] transition-colors ${isHovered ? 'text-blue-600' : 'text-slate-700'}`}>
                    {item.disorder}
                  </span>
                  <div className="flex items-center gap-2 font-mono tabular-nums text-xs">
                    <span className="text-slate-900 font-semibold">{item.count.toLocaleString()}</span>
                    <span className="text-slate-400">({item.percentage}%)</span>
                  </div>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isHovered
                        ? 'bg-blue-600 shadow-xs'
                        : index === 0
                        ? 'bg-gradient-to-r from-blue-600 to-teal-500'
                        : 'bg-blue-500/85'
                    }`}
                    style={{ width: `${Math.max(2, widthPct)}%` }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
