import React, { useCallback, useState } from 'react';
import { File, Clock, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import { UserRequest } from '../../types';
import RequestActionDialog from './RequestActionDialog';
import { DocumentResponse, Documents } from '../../types/Doc';
import { useDispatch } from 'react-redux';
// import { AppDispatch } from '../../Redux/Store'; // adjust path as per your setup
import { updateStatusThunk } from '../../Redux/Action/DocReviewAction';
import { useAppDispatch } from '../../Redux/hooks';


interface RequestCardProps {
  request: {
    id: string,
    fullName: string,
    phoneNumber: string,
  };
  documents: Documents[];
  onStatusUpdate: (
    id: string,
    status: 'APPROVED' | 'REJECTED' | 'PENDING',
    reason?: string,
    documentId?: string // optional doc-level rejection
  ) => void;
}

const RequestCard: React.FC<RequestCardProps> = React.memo(({ request, documents, onStatusUpdate }) => {

  const dispatch = useAppDispatch();

  const [dialog, setDialog] = useState<{
    open: boolean;
    action: 'approve' | 'reject';
    docId: string | null;
  }>({ open: false, action: 'approve', docId: null });

  const openDialog = useCallback((action: 'approve' | 'reject', docId: string) => {
    setDialog({ open: true, action, docId });
  }, []);

  const closeDialog = useCallback(() => {
    setDialog({ open: false, action: 'approve', docId: null });
  }, []);

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
    <div className="bg-white rounded-xl shadow border border-cyan-700 p-4 transition-all space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">{request.fullName.toUpperCase()}</h3>
        {/* <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[request.status]}`}>
          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
        </div> */}
      </div>

      {/* Documents List */}
      <ul className="space-y-4">
        {documents.map((doc) => (
          <li key={doc.id} className="p-4 border rounded-lg shadow-sm bg-gray-50 space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <File size={18} className="text-gray-500" />
                <span className="font-medium text-gray-700">{doc.documentType}</span>
              </div>
              <a href={doc.documentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                View <ExternalLink size={14} className="ml-1" />
              </a>
            </div>

            <div className="text-sm text-gray-600 flex items-center gap-2">
              <Clock size={14} /> Submitted: {formatDate(doc.createdAt)}
            </div>

            <div className="flex items-center gap-3">
              {doc.status === 'PENDING' ? (
                <>
                  <ActionButton label="Approve" icon={CheckCircle} color="green" onClick={() => openDialog('approve', doc.id)} />
                  <ActionButton label="Reject" icon={XCircle} color="red" onClick={() => openDialog('reject', doc.id)} />
                </>
              ) : (
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[doc.status.toLowerCase() as 'pending' | 'approved' | 'rejected']
                  }`}>
                  {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                </div>
              )}
            </div>

            {doc.status === 'REJECTED' && doc.rejectionReason && (
              <div className="text-sm text-red-700 bg-red-50 p-3 rounded mt-2">
                <p className="font-semibold">Rejection reason:</p>
                <p>{doc.rejectionReason}</p>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Request Action Dialog */}
      {dialog.open && dialog.docId && (
        <RequestActionDialog
          isOpen={dialog.open}
          onClose={closeDialog}
          onConfirm={(reason) => {
            console.log(reason);
            dispatch(updateStatusThunk({
              id: dialog.docId!,
              status: dialog.action === 'approve' ? 'APPROVED' : 'REJECTED',
              rejectionReason: reason,
            }));

            onStatusUpdate(request.id, dialog.action === 'approve' ? 'APPROVED' : 'REJECTED', reason, dialog.docId!);
            closeDialog();
          }}

          type={dialog.action}
          username={request.fullName}
        />
      )}
    </div>
  );
});

interface ActionButtonProps {
  label: string;
  icon: React.ElementType;
  color: 'green' | 'red';
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, icon: Icon, color, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center px-3 py-1 rounded text-white bg-${color}-500 hover:bg-${color}-600 text-sm transition`}
  >
    <Icon size={16} className="mr-2" />
    {label}
  </button>
);

export default RequestCard;