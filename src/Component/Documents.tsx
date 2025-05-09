import React, { useEffect, useState, useCallback } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../store";
import { getPendingDocumentsAction, reviewDocumentAction } from "../store/actions/documents";
import { UserDocumentCard } from "./UserDocumentCard";
import { User } from "./UserDocumentCard";
import { debounce } from "lodash";

export const ReviewDocuments = () => {
    const dispatch = useAppDispatch();
    const { data: pendingDocuments, totalPages } = useAppSelector(
        (state: RootState) => state.document
    );

    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    // Use useCallback to memoize the debounced search function
    const handleSearch = useCallback(
        debounce((search: string) => {
            setPage(1); // Reset to the first page when search changes
            dispatch(getPendingDocumentsAction({ search, page: 1, pageSize: 10 }));
        }, 1000),
        [] // Ensure this is only created once
    );

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        dispatch(getPendingDocumentsAction({ search: searchTerm, page: newPage, pageSize: 10 }));
    };


    const handleApprove = (docId: string) => {
        dispatch(reviewDocumentAction({ id: docId, status: "APPROVED" }));
    };

    const handleReject = (docId: string, reason: string) => {
        dispatch(reviewDocumentAction({ id: docId, status: "REJECTED", rejectionReason: reason }));
    };


    useEffect(() => {
        // Dispatch to fetch documents initially
        dispatch(getPendingDocumentsAction({ search: searchTerm, page, pageSize: 10 }));
    }, [dispatch, page]);

    return (
        <div className="p-6">
            <div className="mb-4">
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        handleSearch(e.target.value); // Call the debounced search handler
                    }}
                />
            </div>

            {loading && <div>Loading...</div>}

            {Array.isArray(pendingDocuments) && pendingDocuments.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 mb-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m4 0v-6a6 6 0 00-6-6H9a6 6 0 00-6 6v6m16 0H5"
                        />
                    </svg>
                    <p className="text-lg font-medium">No pending documents found</p>
                    <p className="text-sm mt-1">You're all caught up!</p>
                </div>
            ) : (
                Array.isArray(pendingDocuments) &&
                pendingDocuments.map((user: User) => (
                    <UserDocumentCard
                        key={user.id}
                        user={user}
                        onApprove={handleApprove}
                        onReject={handleReject}
                    />
                ))
            )}

            <div className="mt-4 flex justify-between items-center">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
                >
                    Previous
                </button>
                <span>
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
                >
                    Next
                </button>
            </div>
        </div>
    );
};
