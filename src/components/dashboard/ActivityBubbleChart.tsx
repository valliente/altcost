import React, { memo } from 'react';
import { MoreHorizontal } from 'lucide-react';

interface ActivityBubbleChartProps {
  hasData?: boolean;
  activityText?: string;
}

export const ActivityBubbleChart: React.FC<ActivityBubbleChartProps> = memo(({
  hasData = false,
  activityText = 'Recent Activities: None'
}) => {
  return (
    <div className="light-card p-6 flex flex-col justify-between h-full min-h-[300px] rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-bold text-slate-800 text-sm md:text-base font-display">Activities</h4>
        <button className="text-slate-400 hover:text-slate-600">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Bubble Visualization matching image_2.png */}
      <div className="relative w-full h-44 flex items-center justify-center my-auto">
        {/* Circle 1 */}
        <div className={`absolute left-4 top-2 w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all ${
          hasData ? 'bg-[#3464f3] text-white shadow-lg shadow-blue-500/20' : 'bg-slate-200/90 text-slate-400'
        }`}>
          <span className="font-bold text-xs font-mono">{hasData ? '$2,509' : ''}</span>
        </div>

        {/* Circle 2 */}
        <div className={`absolute right-6 top-3 w-18 h-18 rounded-full flex flex-col items-center justify-center transition-all ${
          hasData ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/20' : 'bg-slate-200/70 text-slate-400'
        }`}>
          <span className="font-bold text-xs font-mono">{hasData ? '$3,50' : ''}</span>
        </div>

        {/* Circle 3 */}
        <div className={`absolute right-10 bottom-2 w-14 h-14 rounded-full flex flex-col items-center justify-center transition-all ${
          hasData ? 'bg-amber-400 text-white shadow-lg shadow-amber-500/20' : 'bg-slate-200/50 text-slate-400'
        }`}>
          <span className="font-bold text-[10px] font-mono">{hasData ? '$2,50' : ''}</span>
        </div>
      </div>

      {/* Bottom Subtext matching image_2.png */}
      <div className="pt-3 border-t border-slate-100 text-center">
        <span className="text-xs font-semibold text-slate-400">
          {activityText}
        </span>
      </div>
    </div>
  );
});
