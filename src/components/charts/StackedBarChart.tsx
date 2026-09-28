import React, { useState } from 'react';

interface StackedGroup {
  group: string;
  confirmed: number;
  suspected: number;
  inconclusive: number;
  total: number;
}

interface StackedBarChartProps {
  data: StackedGroup[];
  title?: string;
  height?: number;
}

export const StackedBarChart: React.FC<StackedBarChartProps> = ({
  data,
  title,
  height = 240
}) => {
  const [activeTooltip, setActiveTooltip] = useState<{
    group: string;
    status: string;
    count: number;
    pct: number;
  } | null>(null);

  const colors = {
    confirmed: '#2563eb', // Blue
    suspected: '#9333ea', // Purple
    inconclusive: '#cbd5e1' // Slate
  };

  return (
    <div className="w-full flex flex-col h-full">
      {title && (
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-slate-800 tracking-tight">{title}</h4>
          <div className="flex items-center gap-3 text-[11px] text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-xs bg-blue-600" /> Confirmed
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-xs bg-purple-600" /> Suspected
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-xs bg-slate-300" /> Inconclusive
            </span>
          </div>
        </div>
      )}

      {/* Main stacked bars */}
      <div className="flex-1 flex flex-col justify-center gap-5 py-2" style={{ minHeight: height - 60 }}>
        {data.map((item) => {
          const tot = item.total || 1;
          const confPct = (item.confirmed / tot) * 100;
          const suspPct = (item.suspected / tot) * 100;
          const inconcPct = (item.inconclusive / tot) * 100;

          return (
            <div key={item.group} className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-800">{item.group}</span>
                <span className="font-mono text-slate-500 tabular-nums text-[11px]">
                  Total: {item.total.toLocaleString()} records
                </span>
              </div>

              {/* Progress bar container */}
              <div className="w-full h-8 bg-slate-100 rounded-lg flex overflow-hidden p-0.5 gap-0.5">
                {/* Confirmed segment */}
                <div
                  style={{ width: `${confPct}%` }}
                  onMouseEnter={() =>
                    setActiveTooltip({
                      group: item.group,
                      status: 'Confirmed',
                      count: item.confirmed,
                      pct: Number(confPct.toFixed(1))
                    })
                  }
                  onMouseLeave={() => setActiveTooltip(null)}
                  className="h-full bg-blue-600 rounded-l transition-all duration-200 hover:brightness-110 flex items-center justify-center cursor-pointer text-[10px] font-mono font-medium text-white overflow-hidden"
                >
                  {confPct > 12 && `${confPct.toFixed(0)}%`}
                </div>

                {/* Suspected segment */}
                <div
                  style={{ width: `${suspPct}%` }}
                  onMouseEnter={() =>
                    setActiveTooltip({
                      group: item.group,
                      status: 'Suspected',
                      count: item.suspected,
                      pct: Number(suspPct.toFixed(1))
                    })
                  }
                  onMouseLeave={() => setActiveTooltip(null)}
                  className="h-full bg-purple-600 transition-all duration-200 hover:brightness-110 flex items-center justify-center cursor-pointer text-[10px] font-mono font-medium text-white overflow-hidden"
                >
                  {suspPct > 12 && `${suspPct.toFixed(0)}%`}
                </div>

                {/* Inconclusive segment */}
                <div
                  style={{ width: `${inconcPct}%` }}
                  onMouseEnter={() =>
                    setActiveTooltip({
                      group: item.group,
                      status: 'Inconclusive',
                      count: item.inconclusive,
                      pct: Number(inconcPct.toFixed(1))
                    })
                  }
                  onMouseLeave={() => setActiveTooltip(null)}
                  className="h-full bg-slate-300 rounded-r transition-all duration-200 hover:brightness-110 flex items-center justify-center cursor-pointer text-[10px] font-mono font-medium text-slate-700 overflow-hidden"
                >
                  {inconcPct > 12 && `${inconcPct.toFixed(0)}%`}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active hover readout */}
      <div className="mt-2 h-6 flex items-center justify-between text-xs border-t border-slate-100 pt-1.5">
        {activeTooltip ? (
          <>
            <span className="text-slate-700 font-medium">
              {activeTooltip.group} · {activeTooltip.status}:
            </span>
            <span className="font-mono text-slate-900 font-semibold">
              {activeTooltip.count.toLocaleString()} cases ({activeTooltip.pct}%)
            </span>
          </>
        ) : (
          <span className="text-slate-400 italic text-[11px]">Hover over segments for category details</span>
        )}
      </div>
    </div>
  );
};
