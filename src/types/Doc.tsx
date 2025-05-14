export type DocType = 'AADHAR_FRONT' | 'AADHAR_BACK' | 'DRIVING_LICENSE_FRONT' | 'DRIVING_LICENSE_BACK';


export interface Documents {
    id: string;
    userId: string;
    documentType: DocType;
    documentUrl: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    rejectionReason: string | null;
    reviewedBy: string | null;
    reviewedAt: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface DocumentUser {
    id: string;
    fullName: string;
    phoneNumber: string;
    documents: Documents[];
}
export interface DocumentResponse {
    data: DocumentUser[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
}



export interface UpdateStatusData {
    message: string;
    document: Documents;
    isUserVerified: boolean;
}

export interface DocumentPayload {
    page: number;
    pageSize: number;
    search?: string;
    status?: string;
}
