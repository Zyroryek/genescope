import React from 'react';

export const GeneScopeLogo: React.FC<{ size?: 'sm' | 'md' | 'lg'; showText?: boolean }> = ({
  size = 'md',
  showText = true
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl'
  };

  return (
    <div className="flex items-center gap-2.5 select-none">
      <div
        className={`${iconSizes[size]} rounded-lg bg-gradient-to-br from-blue-700 via-blue-600 to-teal-500 p-1.5 flex items-center justify-center shadow-xs text-white shrink-0`}
      >
        {/* DNA Helix intertwined with Analytics Bars */}
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* DNA base strands */}
          <path d="M4 4c4 4 12 4 16 0" stroke="currentColor" strokeWidth="1.75" />
          <path d="M4 20c4-4 12-4 16 0" stroke="currentColor" strokeWidth="1.75" />
          {/* Data bar struts between strands */}
          <line x1="8" y1="6" x2="8" y2="18" stroke="#99f6e4" strokeWidth="2.2" />
          <line x1="12" y1="9" x2="12" y2="15" stroke="#ffffff" strokeWidth="2.5" />
          <line x1="16" y1="6" x2="16" y2="18" stroke="#99f6e4" strokeWidth="2.2" />
          {/* Accent analytics dot */}
          <circle cx="12" cy="12" r="1.5" fill="#facc15" stroke="none" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`${textSizes[size]} font-extrabold tracking-tight text-slate-900 leading-none`}>
            Gene<span className="text-blue-600">Scope</span>
          </span>
          <span className="text-[10px] font-medium tracking-wider text-slate-500 uppercase mt-0.5">
            Genomics Analytics
          </span>
        </div>
      )}
    </div>
  );
};
