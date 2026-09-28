import React, { useState } from 'react';

interface GenderItem {
  gender: string;
  count: number;
  percentage: number;
}

interface GenderBarChartProps {
  data: GenderItem[];
  title?: string;
  height?: number;
}

export const GenderBarChart: React.FC<GenderBarChartProps> = ({
  data,
  title,
  height = 240
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const maxCount = Math.max(...data.map((d) => d.count), 1);

  const colors: Record<string, string> = {
    Male: '#0284c7', // Sky / Blue
    Female: '#0d9488', // Teal
    Other: '#9333ea' // Purple
  };

  return (
    <div className="w-full flex flex-col h-full">
      {title && (
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-slate-800 tracking-tight">{title}</h4>
          <span className="text-xs text-slate-500 font-mono">Phenotypic Cohort</span>
        </div>
      )}

      <div className="flex-1 flex items-end justify-around gap-6 pt-4 pb-2" style={{ height }}>
        {data.map((item, index) => {
          const heightPct = (item.count / maxCount) * 100;
          const isHovered = hoveredIdx === index;
          const col = colors[item.gender] || '#3b82f6';

          return (
            <div
              key={item.gender}
              className="flex-1 max-w-[80px] flex flex-col items-center h-full justify-end cursor-pointer group"
              onMouseEnter={() => setHoveredIdx(index)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div className="w-full relative flex items-end justify-center">
                <div
                  className="w-full rounded-t-md transition-all duration-200"
                  style={{
                    height: `${Math.max(6, heightPct)}%`,
                    backgroundColor: col,
                    filter: isHovered ? 'brightness(1.15)' : 'none',
                    transform: isHovered ? 'scaleY(1.02)' : 'none'
                  }}
                />
              </div>

              <span className="text-xs mt-2 font-medium text-slate-700">{item.gender}</span>
              <span className="text-[11px] font-mono tabular-nums text-slate-500 font-semibold">
                {item.count.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-2 h-6 flex items-center justify-between text-xs border-t border-slate-100 pt-1.5">
        {hoveredIdx !== null ? (
          <>
            <span className="text-slate-600 font-medium">{data[hoveredIdx].gender}:</span>
            <span className="font-mono text-slate-900 font-semibold">
              {data[hoveredIdx].count.toLocaleString()} ({data[hoveredIdx].percentage}%)
            </span>
          </>
        ) : (
          <span className="text-slate-400 italic text-[11px]">Hover over bars for percentage breakdown</span>
        )}
      </div>
    </div>
  );
};
