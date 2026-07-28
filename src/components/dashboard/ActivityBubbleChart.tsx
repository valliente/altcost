import React, { memo } from 'react';
import { MoreHorizontal } from 'lucide-react';

export const ActivityBubbleChart: React.FC = memo(() => {
  return (
    <div className="light-card p-6 flex flex-col justify-between h-full min-h-[220px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-slate-800 text-sm font-display">Activity</h4>
        <button className="text-slate-400 hover:text-slate-600">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Bubble Chart Visualization matching image_1.png */}
      <div className="relative w-full h-44 flex items-center justify-center">
        {/* Large Blue Circle */}
        <div className="absolute left-4 top-2 w-28 h-28 rounded-full bg-[#3464f3] text-white flex flex-col items-center justify-center shadow-lg shadow-blue-500/20 transform transition-transform hover:scale-105 z-10">
          <span className="font-bold text-sm font-mono">$2,509</span>
          <span className="text-[10px] text-white/80">Online Shop</span>
        </div>

        {/* Medium Pink Circle */}
        <div className="absolute right-6 top-3 w-20 h-20 rounded-full bg-pink-500 text-white flex flex-col items-center justify-center shadow-lg shadow-pink-500/20 transform transition-transform hover:scale-105 z-20">
          <span className="font-bold text-xs font-mono">$3,50</span>
          <span className="text-[9px] text-white/80">Tax</span>
        </div>

        {/* Gold Circle */}
        <div className="absolute right-12 bottom-2 w-20 h-20 rounded-full bg-amber-400 text-white flex flex-col items-center justify-center shadow-lg shadow-amber-500/20 transform transition-transform hover:scale-105 z-30">
          <span className="font-bold text-xs font-mono">$2,50</span>
          <span className="text-[9px] text-white/80">Food</span>
        </div>
      </div>
    </div>
  );
});
