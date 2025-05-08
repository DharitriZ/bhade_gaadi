import React, { useState, useRef, useEffect } from 'react';
import { X, CheckCircle, XCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => void;
  type: 'approve' | 'reject';
  username: string;
}

const RequestActionDialog: React.FC<Props> = ({ isOpen, onClose, onConfirm, type, username }) => {
  const [reason, setReason] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) onClose();
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isReject = type === 'reject';
  const confirmDisabled = isReject && !reason.trim();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div ref={dialogRef} className="bg-white rounded-lg shadow-xl w-full max-w-md animate-scale-in">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold flex items-center">
            {isReject ? <XCircle size={20} className="mr-2 text-red-500" /> : <CheckCircle size={20} className="mr-2 text-green-500" />}
            {isReject ? 'Reject Request' : 'Approve Request'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <p className="mb-4">
            {isReject
              ? `Are you sure you want to reject the request from ${username}?`
              : `Are you sure you want to approve the request from ${username}?`}
          </p>

          {isReject && (
            <textarea
              className="w-full border rounded-md p-2 shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="Reason for rejection..."
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          )}
        </div>

        <div className="p-4 bg-gray-50 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100">
            Cancel
          </button>
          <button
            onClick={() => onConfirm(isReject ? reason : undefined)}
            disabled={confirmDisabled}
            className={`px-4 py-2 rounded-md text-white ${isReject ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} ${confirmDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isReject ? 'Reject' : 'Approve'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestActionDialog;
