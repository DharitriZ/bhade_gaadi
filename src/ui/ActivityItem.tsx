import React from 'react';
import { CheckCircle, XCircle, Bell } from 'lucide-react';

interface ActivityItemProps {
  action: 'approved' | 'rejected' | 'new request';
  username: string;
  time: string;
  reason?: string;
}

const icons = {
  approved: <CheckCircle size={16} />,
  rejected: <XCircle size={16} />,
  'new request': <Bell size={16} />,
};

const colors = {
  approved: 'bg-green-100 text-green-500',
  rejected: 'bg-red-100 text-red-500',
  'new request': 'bg-blue-100 text-blue-500',
};

const messages = {
  approved: 'request was approved',
  rejected: 'request was rejected',
  'new request': 'submitted a new request',
};

const ActivityItem: React.FC<ActivityItemProps> = ({ action, username, time, reason }) => (
  <div className="py-3 flex gap-3 border-b border-gray-100 last:border-0">
    <div className={`flex-shrink-0 p-2 rounded-full ${colors[action]}`}>
      {icons[action]}
    </div>
    <div className="flex-1">
      <p className="text-sm">
        <span className="font-medium">{username}</span> {messages[action]}
      </p>
      {reason && <p className="text-xs text-gray-500 mt-1">Reason: {reason}</p>}
      <p className="text-xs text-gray-500 mt-1">{time}</p>
    </div>
  </div>
);

export default ActivityItem;
