import React, { useEffect, useState, useCallback } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../store";
import { getPendingDocumentsAction, reviewDocumentAction } from "../store/actions/documents";
import { UserDocumentCard } from "./UserDocumentCard";
import { User } from "./UserDocumentCard";
import { debounce } from "lodash";
import { toast } from "react-toastify";

export const ReviewDocuments = () => {
    const dispatch = useAppDispatch();
    const { pendingDocuments, pendingPagination } = useAppSelector(
        (state: RootState) => state.document
    );

    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [reviewLoading, setReviewLoading] = useState(false);

    // Use useCallback to memoize the debounced search function
    const handleSearch = useCallback(
        debounce((search: string) => {
            setPage(1); // Reset to the first page when search changes
            dispatch(getPendingDocumentsAction({ search, page: 1, pageSize: 10, }));
        }, 1000),
        [] // Ensure this is only created once
    );

    const handlePageChange = async (newPage: number) => {
        setPage(newPage);
        setLoading(true);
        await dispatch(getPendingDocumentsAction({ search: searchTerm, page: newPage, pageSize: 10 }));
        setLoading(false);
    };

    const handleApprove = async (docId: string) => {
        setReviewLoading(true);
        try {
            await dispatch(reviewDocumentAction({ id: docId, status: "APPROVED" }));
            await dispatch(getPendingDocumentsAction({ search: searchTerm, page: 1, pageSize: 10 }));
            toast.success("Document approved successfully");
        } catch (error) {
            console.error("Error approving document:", error);
            toast.error(error.message || "An error occurred while approving the document");
        } finally {
            setReviewLoading(false);
        }
    };

    const handleReject = async (docId: string, reason: string) => {
        setReviewLoading(true);
        try {
            await dispatch(reviewDocumentAction({ id: docId, status: "REJECTED", rejectionReason: reason }));
            await dispatch(getPendingDocumentsAction({ search: searchTerm, page: 1, pageSize: 10 }));
            toast.success("Document rejected successfully");
        } catch (error) {
            console.error("Error rejecting document:", error);
            toast.error(error.message || "An error occurred while rejecting the document");
        } finally {
            setReviewLoading(false);
        }
    };

    useEffect(() => {
        const fetchDocuments = async () => {
            setLoading(true);
            await dispatch(getPendingDocumentsAction({ search: searchTerm, page, pageSize: 10 }));
            setLoading(false);
        }
        fetchDocuments();
    }, [dispatch, page]);

    return (
        <div className="sm:p-6 p-0">
            <div className="mb-4">
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        handleSearch(e.target.value);
                    }}
                />
            </div>

            {loading && <div>Loading...</div>}

            {Array.isArray(pendingDocuments) && pendingDocuments.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
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
                        status="PENDING"
                        isLoading={reviewLoading}
                    />
                ))
            )}
            {pendingPagination.totalPages > 1 && (
                <div className="mt-4 flex justify-between items-center">
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
                    >
                        Previous
                    </button>
                    <span>
                        Page {page} of {pendingPagination.totalPages}
                    </span>

                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === pendingPagination.totalPages}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};
