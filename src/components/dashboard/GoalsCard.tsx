import React, { memo } from 'react';
import { MoreHorizontal, Plus } from 'lucide-react';

export interface GoalItemData {
  id: string;
  title: string;
  category: string;
  percentage: number;
  color: string;
}

interface GoalsCardProps {
  goals?: GoalItemData[];
  onAddGoal?: () => void;
  hasData?: boolean;
}

export const GoalsCard: React.FC<GoalsCardProps> = memo(({
  goals = [],
  onAddGoal,
  hasData = false
}) => {
  const renderCircularProgress = (percentage: number, color: string) => {
    const radius = 14;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
        <svg className="w-10 h-10 transform -rotate-90">
          <circle
            cx="20"
            cy="20"
            r={radius}
            stroke="#e2e8f0"
            strokeWidth="3"
            fill="transparent"
          />
          {percentage > 0 && (
            <circle
              cx="20"
              cy="20"
              r={radius}
              stroke={color}
              strokeWidth="3"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          )}
        </svg>
        <span className="absolute text-[10px] font-bold font-mono text-slate-700">
          {percentage}%
        </span>
      </div>
    );
  };

  return (
    <div className="light-card p-6 flex flex-col justify-between h-full min-h-[220px] rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-bold text-slate-800 text-sm md:text-base font-display">
          Goals
        </h4>
        <button onClick={onAddGoal} className="text-slate-400 hover:text-slate-600">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Goals Items matching image_2.png */}
      <div className="space-y-3 my-auto">
        {/* Primary Goal / Add Target Asset */}
        <div
          onClick={onAddGoal}
          className="p-3.5 rounded-2xl bg-slate-100/70 border border-slate-200/80 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-all"
        >
          <div>
            <h5 className="font-bold text-slate-800 text-xs md:text-sm font-display">
              {hasData && goals.length > 0 ? goals[0].title : 'Add Target Asset'}
            </h5>
            <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-100/60 px-2 py-0.5 rounded-full">
              {hasData && goals.length > 0 ? goals[0].category : 'Finance Goal'}
            </span>
          </div>

          {renderCircularProgress(
            hasData && goals.length > 0 ? goals[0].percentage : 0,
            hasData && goals.length > 0 ? goals[0].color : '#3464f3'
          )}
        </div>

        {/* Empty Placeholder Outline Box 1 matching image_2.png */}
        <div 
          onClick={onAddGoal}
          className="h-12 rounded-2xl border border-slate-200/60 bg-slate-50/50 flex items-center justify-center text-slate-400 hover:border-slate-300 cursor-pointer transition-all"
        >
          {goals.length > 1 ? (
            <div className="w-full px-3.5 flex items-center justify-between">
              <span className="font-bold text-slate-800 text-xs">{goals[1].title}</span>
              {renderCircularProgress(goals[1].percentage, goals[1].color)}
            </div>
          ) : (
            <Plus className="w-4 h-4 text-slate-300" />
          )}
        </div>

        {/* Empty Placeholder Outline Box 2 matching image_2.png */}
        <div 
          onClick={onAddGoal}
          className="h-12 rounded-2xl border border-slate-200/60 bg-slate-50/50 flex items-center justify-center text-slate-400 hover:border-slate-300 cursor-pointer transition-all"
        >
          {goals.length > 2 ? (
            <div className="w-full px-3.5 flex items-center justify-between">
              <span className="font-bold text-slate-800 text-xs">{goals[2].title}</span>
              {renderCircularProgress(goals[2].percentage, goals[2].color)}
            </div>
          ) : (
            <Plus className="w-4 h-4 text-slate-300" />
          )}
        </div>
      </div>
    </div>
  );
});
