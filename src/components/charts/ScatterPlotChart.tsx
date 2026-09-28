import React, { useState } from 'react';

interface ScatterPoint {
  x: number;
  y: number;
  id?: string;
  label?: string;
  category?: string;
}

interface ScatterPlotChartProps {
  data: ScatterPoint[];
  xLabel: string;
  yLabel: string;
  title?: string;
  height?: number;
}

export const ScatterPlotChart: React.FC<ScatterPlotChartProps> = ({
  data,
  xLabel,
  yLabel,
  title,
  height = 280
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<ScatterPoint | null>(null);

  if (data.length === 0) {
    return <div className="h-48 flex items-center justify-center text-xs text-slate-400">No data points</div>;
  }

  // Sample data if too large to prevent SVG bog down (max 300 points)
  const sampledData = data.length > 300 ? data.filter((_, i) => i % Math.ceil(data.length / 300) === 0) : data;

  const xVals = data.map((d) => d.x);
  const yVals = data.map((d) => d.y);
  const minX = Math.min(...xVals);
  const maxX = Math.max(...xVals);
  const minY = Math.min(...yVals);
  const maxY = Math.max(...yVals);

  const rangeX = maxX - minX || 1;
  const rangeY = maxY - minY || 1;

  const width = 500;
  const plotHeight = 220;
  const padL = 40;
  const padB = 30;
  const padT = 15;
  const padR = 20;

  const chartW = width - padL - padR;
  const chartH = plotHeight - padT - padB;

  const getSvgX = (x: number) => padL + ((x - minX) / rangeX) * chartW;
  const getSvgY = (y: number) => padT + chartH - ((y - minY) / rangeY) * chartH;

  // Simple linear regression line: y = mx + c
  const n = data.length;
  const sumX = xVals.reduce((a, b) => a + b, 0);
  const sumY = yVals.reduce((a, b) => a + b, 0);
  const sumXY = data.reduce((a, b) => a + b.x * b.y, 0);
  const sumX2 = data.reduce((a, b) => a + b.x * b.x, 0);
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX || 1);
  const intercept = (sumY - slope * sumX) / n;

  const lineX1 = minX;
  const lineY1 = slope * lineX1 + intercept;
  const lineX2 = maxX;
  const lineY2 = slope * lineX2 + intercept;

  return (
    <div className="w-full flex flex-col h-full">
      {title && (
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-semibold text-slate-800 tracking-tight">{title}</h4>
          <span className="text-xs text-slate-500 font-mono">Bivariate Scatter & Trendline</span>
        </div>
      )}

      <div className="flex-1 w-full overflow-hidden flex items-center justify-center">
        <svg
          viewBox={`0 0 ${width} ${plotHeight}`}
          className="w-full max-h-[300px] overflow-visible"
        >
          {/* Grid lines */}
          <line x1={padL} y1={padT} x2={padL} y2={padT + chartH} stroke="#e2e8f0" />
          <line x1={padL} y1={padT + chartH} x2={padL + chartW} y2={padT + chartH} stroke="#e2e8f0" />

          {/* Regression Line */}
          <line
            x1={getSvgX(lineX1)}
            y1={getSvgY(lineY1)}
            x2={getSvgX(lineX2)}
            y2={getSvgY(lineY2)}
            stroke="#2563eb"
            strokeWidth="2"
            strokeDasharray="4 3"
            opacity="0.85"
          />

          {/* Data Points */}
          {sampledData.map((pt, i) => {
            const cx = getSvgX(pt.x);
            const cy = getSvgY(pt.y);
            const isHovered = hoveredPoint === pt;

            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={isHovered ? 5.5 : 3}
                fill={isHovered ? '#2563eb' : '#0d9488'}
                opacity={isHovered ? 1 : 0.65}
                className="transition-all duration-150 cursor-pointer"
                onMouseEnter={() => setHoveredPoint(pt)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            );
          })}

          {/* Axis Labels */}
          <text
            x={padL + chartW / 2}
            y={plotHeight - 4}
            textAnchor="middle"
            className="text-[10px] font-sans fill-slate-500 font-medium"
          >
            {xLabel} ({minX.toFixed(1)} - {maxX.toFixed(1)})
          </text>
          <text
            x={12}
            y={padT + chartH / 2}
            textAnchor="middle"
            transform={`rotate(-90 12 ${padT + chartH / 2})`}
            className="text-[10px] font-sans fill-slate-500 font-medium"
          >
            {yLabel}
          </text>
        </svg>
      </div>

      <div className="mt-2 h-6 flex items-center justify-between text-xs border-t border-slate-100 pt-1.5">
        {hoveredPoint ? (
          <div className="flex items-center gap-2 font-mono text-[11px]">
            {hoveredPoint.id && <span className="font-semibold text-slate-800">{hoveredPoint.id}:</span>}
            <span className="text-teal-700">{xLabel}: {hoveredPoint.x}</span>
            <span className="text-blue-700">{yLabel}: {hoveredPoint.y}</span>
            {hoveredPoint.label && <span className="text-slate-500">({hoveredPoint.label})</span>}
          </div>
        ) : (
          <span className="text-slate-400 italic text-[11px]">
            Linear Fit: y = {slope.toFixed(2)}x + {intercept.toFixed(2)} · Hover points to inspect values
          </span>
        )}
      </div>
    </div>
  );
};
