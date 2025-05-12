import React, { useEffect, useState, useCallback } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../store";
import { getApprovedDocumentsAction } from "../store/actions/documents";
import { UserDocumentCard } from "./UserDocumentCard";
import { User } from "./UserDocumentCard";
import { debounce } from "lodash";
import { toast } from "react-toastify";

const ApprovedDocuments: React.FC = () => {
    const dispatch = useAppDispatch();
    const { approvedDocuments, approvedPagination } = useAppSelector(
        (state: RootState) => state.document
    );

    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);



    // Use useCallback to memoize the debounced search function
    const handleSearch = useCallback(
        debounce((search: string) => {
            setPage(1); // Reset to the first page when search changes
            dispatch(getApprovedDocumentsAction({ search, page: 1, pageSize: 10, }));
        }, 1000),
        [] // Ensure this is only created once
    );

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        dispatch(getApprovedDocumentsAction({ search: searchTerm, page: newPage, pageSize: 10 }));
    };

    useEffect(() => {
        // Dispatch to fetch documents initially
        dispatch(getApprovedDocumentsAction({ search: searchTerm, page, pageSize: 10 }));
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
                        handleSearch(e.target.value); // Call the debounced search handler
                    }}
                />
            </div>

            {loading && <div>Loading...</div>}

            {Array.isArray(approvedDocuments) && approvedDocuments.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                    <p className="text-lg font-medium">No approved documents found</p>
                    <p className="text-sm mt-1">You're all caught up!</p>
                </div>
            ) : (
                Array.isArray(approvedDocuments) &&
                approvedDocuments.map((user: User) => (
                    <UserDocumentCard
                        key={user.id}
                        user={user}
                        status="APPROVED"
                    />
                ))
            )}
            {approvedPagination.totalPages > 1 && (
                <div className="mt-4 flex justify-between items-center">
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
                    >
                        Previous
                    </button>
                    <span>
                        Page {page} of {approvedPagination.totalPages}
                    </span>

                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === approvedPagination.totalPages}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default ApprovedDocuments;