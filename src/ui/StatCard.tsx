import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { DashboardStat } from '../types';

const StatCard: React.FC<{ stat: DashboardStat }> = ({ stat }) => {
  // Dynamically get the icon from lucide-react
  const IconComponent = (LucideIcons as any)[stat.icon.charAt(0).toUpperCase() + stat.icon.slice(1)] || LucideIcons.Activity;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{stat.title}</p>
          <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
        </div>
        <div className={`p-3 rounded-full ${stat.title === 'Pending' ? 'bg-amber-100 text-amber-600' :
            stat.title === 'Approved' ? 'bg-green-100 text-green-600' :
              stat.title === 'Rejected' ? 'bg-red-100 text-red-600' :
                'bg-blue-100 text-blue-600'
          }`}>
          <IconComponent size={20} />
        </div>
      </div>
      <div className="mt-2 flex items-center">
        {stat.change > 0 ? (
          <>
            <TrendingUp size={16} className="text-green-500 mr-1" />
            <span className="text-sm text-green-500">+{stat.change}% </span>
          </>
        ) : (
          <>
            <TrendingDown size={16} className="text-red-500 mr-1" />
            <span className="text-sm text-red-500">{stat.change}% </span>
          </>
        )}
        <span className="text-sm text-gray-500 ml-1">since last week</span>
      </div>
    </div>
  );
};

export default StatCard;