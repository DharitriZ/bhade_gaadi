import React, { useState } from 'react';
import { File, Clock, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import { UserRequest } from '../../types';
import RequestActionDialog from './RequestActionDialog';

interface RequestCardProps {
  request: UserRequest;
  onStatusUpdate: (id: string, status: 'approved' | 'rejected' | 'pending', reason?: string) => void;
}

const RequestCard: React.FC<RequestCardProps> = ({ request, onStatusUpdate }) => {
  const [dialog, setDialog] = useState<{ open: boolean; action: 'approve' | 'reject' }>({ open: false, action: 'approve' });

  const openDialog = (action: 'approve' | 'reject') => setDialog({ open: true, action });
  const closeDialog = () => setDialog({ open: false, action: 'approve' });

  const formatDate = (dateString: string) =>
    new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));

  const statusStyles = {
    pending: 'bg-amber-100 text-amber-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
  };

  return (
    <div className="bg-white border-cyan-500 rounded-lg shadow-md shadow-cyan-500 overflow-hidden hover:shadow-lg p-2 transition-all">
      <div className="p-4 border-b flex justify-between items-start">
        <div>
          <h3 className="font-medium">{request.username}</h3>
          <p className="text-sm text-gray-500">{request.email}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[request.status]}`}>
          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
        </div>
      </div>

      <div className="p-4 bg-gray-50 border-b space-y-2 text-sm">
        <div className="flex items-center">
          <File size={16} className="mr-2 text-gray-500" />
          <span className="mr-1 text-gray-700">Document:</span>
          <a
            href={request.documentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 flex items-center hover:underline"
          >
            {request.documentName}
            <ExternalLink size={12} className="ml-1" />
          </a>
        </div>
        <div className="flex items-center">
          <Clock size={16} className="mr-2 text-gray-500" />
          <span className="mr-1 text-gray-700">Submitted:</span>
          <span>{formatDate(request.createdAt)}</span>
        </div>
      </div>

      {request.status === 'rejected' && request.rejectionReason && (
        <div className="p-4 bg-red-50 text-sm">
          <p className="font-medium text-red-700">Rejection reason:</p>
          <p className="text-red-600 mt-1">{request.rejectionReason}</p>
        </div>
      )}

      <div className="p-4 flex gap-2">
        {request.status === 'pending' ? (
          <>
            <ActionButton label="Approve" icon={CheckCircle} color="green" onClick={() => openDialog('approve')} />
            <ActionButton label="Reject" icon={XCircle} color="red" onClick={() => openDialog('reject')} />
          </>
        ) : (
          <ActionButton label="Reset to Pending" icon={Clock} color="cyan" onClick={() => onStatusUpdate(request.id, 'pending')} />
        )}
      </div>

      {dialog.open && (
        <RequestActionDialog
          isOpen={dialog.open}
          onClose={closeDialog}
          onConfirm={(reason) => {
            onStatusUpdate(request.id, dialog.action === 'approve' ? 'approved' : 'rejected', reason);
            closeDialog();
          }}
          type={dialog.action}
          username={request.username}
        />
      )}
    </div>
  );
};

interface ActionButtonProps {
  label: string;
  icon: React.ElementType;
  color: 'green' | 'red' | 'cyan';
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, icon: Icon, color, onClick }) => (
  <button
    onClick={onClick}
    className={`flex-1 bg-${color}-500 hover:bg-${color}-600 text-white py-2 rounded flex items-center justify-center transition-colors`}
  >
    <Icon size={16} className="mr-2" />
    {label}
  </button>
);

export default RequestCard;
