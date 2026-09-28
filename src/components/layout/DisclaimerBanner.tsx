import React from 'react';
import { Info } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-slate-100/90 border-b border-slate-200/80 px-4 py-1.5 text-xs text-slate-600 flex items-center justify-between">
      <div className="flex items-center gap-2 max-w-5xl mx-auto w-full justify-center text-center">
        <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
        <p className="text-[11px] leading-tight">
          <strong className="font-semibold text-slate-800">Educational Project:</strong> Synthetic demo dataset for college coursework (Data Exploration and Visualization). Not for clinical diagnosis or medical advice.
        </p>
      </div>
    </div>
  );
};
