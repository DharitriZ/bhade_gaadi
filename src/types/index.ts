export interface UserRequest {
  id: string;
  username: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
  documents: {
    id: string;
    userId: string;
    docType: string;
    docUrl: string;
    docStatus: "PENDING" | "APPROVED" | "REJECTED";
    rejectionReason: string | null;
    reviewBy: string | null;
    reviewAt: string | null;
    createdAt: string;
    updatedAt: string;
  }[];
  // docType: string;
  rejectionReason?: string;
}

export interface DashboardStat {
  title: string;
  value: string | number;
  change: number;
  icon: string;
}