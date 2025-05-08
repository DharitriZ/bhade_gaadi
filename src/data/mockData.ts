import { UserRequest, DashboardStat } from '../types';

export const mockUserRequests: UserRequest[] = [
  {
    id: '1',
    username: 'rahulsharma',
    email: 'rahul.sharma@example.in',
    status: 'pending',
    documentUrl: 'https://example.com/documents/rahulsharma_aadhaar.pdf',
    documentName: 'Aadhaar Card.pdf',
    documentType: 'pdf',
    createdAt: '2025-02-15T10:30:00Z',
  },
  {
    id: '2',
    username: 'anitasingh',
    email: 'anita.singh@example.in',
    status: 'pending',
    documentUrl: 'https://example.com/documents/anitasingh_passport.jpg',
    documentName: 'Passport.jpg',
    documentType: 'jpg',
    createdAt: '2025-02-16T08:15:00Z',
  },
  {
    id: '3',
    username: 'amitverma',
    email: 'amit.verma@example.in',
    status: 'approved',
    documentUrl: 'https://example.com/documents/amitverma_drivinglicense.pdf',
    documentName: 'Driving License.pdf',
    documentType: 'pdf',
    createdAt: '2025-02-14T14:45:00Z',
  },
  {
    id: '4',
    username: 'priyapatel',
    email: 'priya.patel@example.in',
    status: 'rejected',
    documentUrl: 'https://example.com/documents/priyapatel_birthcertificate.pdf',
    documentName: 'Birth Certificate.pdf',
    documentType: 'pdf',
    createdAt: '2025-02-13T09:20:00Z',
    rejectionReason: 'Document is expired. Please upload a valid certificate.'
  },
  {
    id: '5',
    username: 'siddharthkumar',
    email: 'siddharth.kumar@example.in',
    status: 'pending',
    documentUrl: 'https://example.com/documents/siddharthkumar_pan.jpg',
    documentName: 'PAN Card.jpg',
    documentType: 'jpg',
    createdAt: '2025-02-17T11:10:00Z',
  },
];

export const dashboardStats: DashboardStat[] = [
  {
    title: 'Total Requests',
    value: 150,
    change: 15,
    icon: 'users'
  },
  {
    title: 'Pending',
    value: 45,
    change: -3,
    icon: 'clock'
  },
  {
    title: 'Approved',
    value: 90,
    change: 20,
    icon: 'check-circle'
  },
  {
    title: 'Rejected',
    value: 15,
    change: -2,
    icon: 'x-circle'
  },
];

export const recentActivity = [
  {
    id: '1',
    action: 'approved',
    username: 'amitverma',
    time: '3 hours ago',
  },
  {
    id: '2',
    action: 'rejected',
    username: 'priyapatel',
    time: '6 hours ago',
    reason: 'Document is expired'
  },
  {
    id: '3',
    action: 'new request',
    username: 'siddharthkumar',
    time: '1 day ago',
  },
  {
    id: '4',
    action: 'new request',
    username: 'rahulsharma',
    time: '2 days ago',
  },
];
