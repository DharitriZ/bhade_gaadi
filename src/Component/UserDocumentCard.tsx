import React, { useState, useRef, useEffect } from "react";
import { Phone } from "lucide-react";

export type Document = {
    id: string;
    documentType: string;
    documentUrl: string;
    status: string;
    rejectionReason?: string;
};

export type User = {
    id: string;
    fullName: string;
    phoneNumber: string;
    documents: Document[];
};

type Props = {
    user: User;
    onApprove?: (docId: string) => void;
    onReject?: (docId: string, reason: string) => void;
    status: string;
    isLoading?: boolean;
};

export const UserDocumentCard: React.FC<Props> = ({ user, onApprove, onReject, status, isLoading }) => {
    const [rejectDocId, setRejectDocId] = useState<string | null>(null);
    const [reason, setReason] = useState("");
    const modalRef = useRef<HTMLDivElement | null>(null);

    const handleOutsideClick = (e: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            setRejectDocId(null);
            setReason("");
        }
    };

    useEffect(() => {
        if (rejectDocId) {
            document.addEventListener("mousedown", handleOutsideClick);
        } else {
            document.removeEventListener("mousedown", handleOutsideClick);
        }
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [rejectDocId]);

    const handleConfirmReject = () => {
        if (rejectDocId) {
            onReject?.(rejectDocId, reason);
            setRejectDocId(null);
            setReason("");
        }
    };

    return (
        <div className="border rounded-lg shadow p-4 mb-6 bg-white">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                <div className="flex flex-col items-start">
                    <h2 className="text-xl font-semibold text-[#1E3A8A]">{user.fullName}</h2>
                    <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 text-[#1E3A8A] mr-2" />
                        {user.phoneNumber}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {user.documents.map((doc) => (
                    <div key={doc.id} className="border rounded-md p-3 shadow-sm bg-gray-50">
                        <p className="font-medium text-[#1E3A8A] mb-1">{doc.documentType}</p>
                        <a
                            href={doc.documentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 underline mb-1 inline-block"
                        >
                            View Document
                        </a>

                        {status === "PENDING" && (
                            <div className="mt-2 flex gap-2">
                                <button
                                    className="bg-[#1E3A8A] text-white px-2 py-1 rounded hover:bg-green-700 text-xs"
                                    onClick={() => onApprove?.(doc.id)}
                                    disabled={isLoading}
                                >
                                    Approve
                                </button>
                                <button
                                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-xs"
                                    onClick={() => setRejectDocId(doc.id)}
                                    disabled={isLoading}
                                >
                                    Reject
                                </button>
                            </div>
                        )}

                        {doc.status === "REJECTED" && doc.rejectionReason && (
                            <p className="text-sm text-red-600 mt-2">
                                Reason: {doc.rejectionReason}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            {/* Reject modal */}
            {rejectDocId && (
                <div ref={modalRef} className="mt-3">
                    <textarea
                        placeholder="Reason for rejection"
                        className="w-full p-2 border rounded mb-2 text-sm"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />
                    <button
                        onClick={handleConfirmReject}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                    >
                        Confirm Reject
                    </button>
                    <button
                        onClick={() => {
                            setRejectDocId(null);
                            setReason("");
                        }}
                        className="ml-2 text-sm text-gray-500 underline"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};
