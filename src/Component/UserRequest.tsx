import React, { useEffect, useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { updateStatusThunk, viewDocThunk } from '../Redux/Action/DocReviewAction';

import RequestCard from './userRequests/RequestCard';
import RequestFilters from './userRequests/RequestFilters';
import { DocumentUser } from '../types/Doc';

const PAGE_SIZE = 10;

const UserRequests: React.FC = () => {
    // const { updateRequestStatus } = useAdmin();
    const dispatch = useAppDispatch();
    const docState = useAppSelector((state) => state.doc);

    const [filters, setFilters] = useState({ search: '', status: '' });
    const [currentPage, setCurrentPage] = useState(1);

    const isLoading = docState.loading;

    const [documents, setDocuments] = useState<DocumentUser[]>([]);

    // Fetch documents and setDocuments on mount...

    const handleStatusUpdate = async (
        id: string,
        status: 'APPROVED' | 'REJECTED' | 'PENDING',
        reason?: string,
        documentId?: string
    ) => {
        await dispatch(updateStatusThunk({ id: documentId!, status, rejectionReason: reason || '' }));

        // Update local state immediately after dispatch
        setDocuments((prevDocs) =>
            prevDocs.map((doc) =>
                doc.id === documentId ? { ...doc, docStatus: status.toUpperCase(), rejectionReason: reason || '' } : doc
            )
        );
    };


    useEffect(() => {
        dispatch(
            viewDocThunk({
                page: currentPage,
                pageSize: PAGE_SIZE,
                search: filters.search,
                status: filters.status,
            })
        );
    }, [dispatch, currentPage, filters]);

    const filteredRequests = docState.data.filter((user: DocumentUser) => {
        const searchLower = filters.search.toLowerCase();
        const statusLower = filters.status.toLowerCase();

        const searchMatch =
            !filters.search ||
            user.id.toLowerCase().includes(searchLower) ||
            user.fullName.toLowerCase().includes(searchLower) ||
            user.phoneNumber.toLowerCase().includes(searchLower);

        const statusMatch =
            !filters.status ||
            filters.status === 'null' ||
            user.documents.some((doc) => doc.status.toLowerCase() === statusLower);

        return searchMatch && statusMatch;
    });

    const totalPages = docState.totalPages;

    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div>
            <header className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">User Requests</h1>
                <p className="text-gray-600 mt-1">Manage and review user verification requests.</p>
            </header>

            <RequestFilters onFilterChange={setFilters} />

            {isLoading ? (
                <div className="flex justify-center items-center min-h-[50vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
                </div>
            ) : filteredRequests.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <p className="font-bold text-2xl text-gray-500/50">No requests pending!</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-6">
                        {filteredRequests.map((user) => (
                            <RequestCard
                                key={user.id}
                                request={{
                                    id: user.id,
                                    fullName: user.fullName,
                                    phoneNumber: user.phoneNumber,
                                }}
                                documents={user.documents}
                                onStatusUpdate={handleStatusUpdate}
                            />
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center mt-6 space-x-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`px-3 py-1 border rounded ${page === currentPage ? 'bg-blue-500 text-white' : ''}`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserRequests;
