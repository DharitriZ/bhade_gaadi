export interface UserRequest {
  id: string;
  username: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
  documentUrl: string;
  documentName: string;
  documentType: string;
  createdAt: string;
  rejectionReason?: string;
}

export interface DashboardStat {
  title: string;
  value: string | number;
  change: number;
  icon: string;
}