// types/document.types.ts

export type DocumentType =
    | 'AADHAR_FRONT'
    | 'AADHAR_BACK'
    | 'DRIVING_LICENSE_FRONT'
    | 'DRIVING_LICENSE_BACK';

export interface UserDocument {
    id: string;
    userId: string;
    documentType: DocumentType;
    documentUrl: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    rejectionReason: string | null;
    reviewedBy: string | null;
    reviewedAt: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface PendingDocumentGroup {
    id: string;
    fullName: string;
    phoneNumber: string;
    documents: UserDocument[];
}
