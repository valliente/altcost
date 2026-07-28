import React, { memo } from 'react';
import { MoreHorizontal } from 'lucide-react';

export interface GoalItem {
  id: string;
  title: string;
  category: string;
  percentage: number;
  color: string;
  bgColor: string;
}

export const GoalsCard: React.FC = memo(() => {
  const goals: GoalItem[] = [
    {
      id: 'lego',
      title: 'Vintage Lego Collection',
      category: 'Finance Goal',
      percentage: 80,
      color: '#3464f3',
      bgColor: 'bg-blue-50/70',
    },
    {
      id: 'watch',
      title: 'Watch Funding',
      category: 'Finance Update',
      percentage: 70,
      color: '#ff5c8d',
      bgColor: 'bg-pink-50/70',
    },
  ];

  const renderCircularProgress = (percentage: number, color: string) => {
    const radius = 16;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative w-11 h-11 flex items-center justify-center">
        <svg className="w-11 h-11 transform -rotate-90">
          <circle
            cx="22"
            cy="22"
            r={radius}
            stroke="#e2e8f0"
            strokeWidth="3"
            fill="transparent"
          />
          <circle
            cx="22"
            cy="22"
            r={radius}
            stroke={color}
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        <span className="absolute text-[10px] font-bold font-mono text-slate-800">
          {percentage}%
        </span>
      </div>
    );
  };

  return (
    <div className="light-card p-6 flex flex-col justify-between h-full min-h-[300px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-bold text-slate-800 text-sm md:text-base font-display">
          Goals
        </h4>
        <button className="text-slate-400 hover:text-slate-600">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Goals List matching image_1.png */}
      <div className="space-y-3 my-auto">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className={`p-3.5 rounded-2xl ${goal.bgColor} border border-slate-100 flex items-center justify-between transition-all hover:scale-[1.01]`}
          >
            <div>
              <h5 className="font-bold text-slate-900 text-xs md:text-sm font-display">
                {goal.title}
              </h5>
              <span className="text-[11px] text-slate-400 font-medium">
                {goal.category}
              </span>
            </div>

            {renderCircularProgress(goal.percentage, goal.color)}
          </div>
        ))}
      </div>
    </div>
  );
});
