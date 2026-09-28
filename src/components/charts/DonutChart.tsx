import React, { useState } from 'react';

interface DonutItem {
  inheritance: string;
  count: number;
  percentage: number;
}

interface DonutChartProps {
  data: DonutItem[];
  title?: string;
  height?: number;
}

const INHERITANCE_COLORS = [
  '#2563eb', // Blue
  '#0d9488', // Teal
  '#9333ea', // Purple
  '#ea580c', // Orange
  '#0284c7'  // Sky
];

export const DonutChart: React.FC<DonutChartProps> = ({ data, title }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const total = data.reduce((acc, d) => acc + d.count, 0) || 1;
  const size = 180;
  const strokeWidth = 28;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;

  const activeItem = hoveredIdx !== null ? data[hoveredIdx] : null;

  return (
    <div className="w-full flex flex-col h-full">
      {title && (
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-slate-800 tracking-tight">{title}</h4>
          <span className="text-xs text-slate-500 font-mono">{data.length} Categories</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 my-auto">
        {/* SVG Donut */}
        <div className="relative shrink-0 flex items-center justify-center" style={{ width: size, height: size }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
            {data.map((item, index) => {
              const fraction = item.count / total;
              const strokeDasharray = `${fraction * circumference} ${circumference}`;
              const strokeDashoffset = -accumulatedPercent * circumference;
              accumulatedPercent += fraction;

              const isHovered = hoveredIdx === index;
              const color = INHERITANCE_COLORS[index % INHERITANCE_COLORS.length];

              return (
                <circle
                  key={item.inheritance}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke={color}
                  strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-200 cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(index)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />
              );
            })}
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            {activeItem ? (
              <>
                <span className="text-lg font-bold font-mono text-slate-900 leading-none">
                  {activeItem.percentage}%
                </span>
                <span className="text-[10px] text-slate-500 mt-1 max-w-[80px] truncate">
                  {activeItem.count.toLocaleString()}
                </span>
              </>
            ) : (
              <>
                <span className="text-base font-bold font-mono text-slate-900 leading-none">
                  {total.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5">Records</span>
              </>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 w-full space-y-1.5">
          {data.map((item, index) => {
            const isHovered = hoveredIdx === index;
            const color = INHERITANCE_COLORS[index % INHERITANCE_COLORS.length];

            return (
              <div
                key={item.inheritance}
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`flex items-center justify-between text-xs py-1 px-1.5 rounded transition-colors cursor-pointer ${
                  isHovered ? 'bg-slate-100/80 font-medium' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2 truncate pr-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-slate-700 truncate">{item.inheritance}</span>
                </div>
                <div className="flex items-center gap-2 font-mono tabular-nums text-slate-900 shrink-0">
                  <span>{item.count.toLocaleString()}</span>
                  <span className="text-slate-400 text-[11px]">({item.percentage}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
