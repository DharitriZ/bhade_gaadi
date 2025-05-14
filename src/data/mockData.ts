import { UserRequest, DashboardStat } from '../types';

// import { UserRequest } from '../../types'; // assuming you have proper types defined

export const mockUserRequests: UserRequest[] = [
  {
    id: '1',
    username: 'rahulsharma',
    email: 'rahul.sharma@example.in',
    status: 'pending',
    documents: [
      {
        id: 'doc1',
        userId: '1',
        docType: 'AADHAR_FRONT',
        docUrl: 'URL_ADDRESS.com/documents/rahulsharma_aadhar_front.pdf',
        docStatus: 'PENDING',
        rejectionReason: null,
        reviewBy: null,
        reviewAt: null,
        createdAt: '2025-02-15T10:30:00Z',
        updatedAt: '2025-02-15T10:30:00Z',
      },
      {
        id: 'doc2',
        userId: '1',
        docType: 'AADHAR_BACK',
        docUrl: 'URL_ADDRESS.com/documents/rahulsharma_aadhar_back.pdf',
        docStatus: 'PENDING',
        rejectionReason: null,
        reviewBy: null,
        reviewAt: null,
        createdAt: '2025-02-15T10:30:00Z',
        updatedAt: '2025-02-15T10:30:00Z',
      },
      {
        id: 'doc3',
        userId: '2',
        docType: 'DRIVING_LICENSE_FRONT',
        docUrl: 'URL_ADDRESS.com/documents/anitasingh_dl_front.pdf',
        docStatus: 'PENDING',
        rejectionReason: null,
        reviewBy: null,
        reviewAt: null,
        createdAt: '2025-02-16T08:15:00Z',
        updatedAt: '2025-02-16T08:15:00Z',
      },
      {
        id: 'doc4',
        userId: '2',
        docType: 'DRIVING_LICENSE_BACK',
        docUrl: 'URL_ADDRESS.com/documents/anitasingh_dl_back.pdf',
        docStatus: 'APPROVED',
        rejectionReason: null,
        reviewBy: null,
        reviewAt: null,
        createdAt: '2025-02-16T08:15:00Z',
        updatedAt: '2025-02-16T08:15:00Z',
      }
    ],
  },
  {
    id: '2',
    username: 'anitasingh',
    email: 'anita.singh@example.in',
    status: 'pending',
    documents: [
      {
        id: 'doc3',
        userId: '2',
        docType: 'DRIVING_LICENSE_FRONT',
        docUrl: 'URL_ADDRESS.com/documents/anitasingh_dl_front.pdf',
        docStatus: 'PENDING',
        rejectionReason: null,
        reviewBy: null,
        reviewAt: null,
        createdAt: '2025-02-16T08:15:00Z',
        updatedAt: '2025-02-16T08:15:00Z',
      },
      {
        id: 'doc4',
        userId: '2',
        docType: 'DRIVING_LICENSE_BACK',
        docUrl: 'URL_ADDRESS.com/documents/anitasingh_dl_back.pdf',
        docStatus: 'PENDING',
        rejectionReason: null,
        reviewBy: null,
        reviewAt: null,
        createdAt: '2025-02-16T08:15:00Z',
        updatedAt: '2025-02-16T08:15:00Z',
      }
    ],
  },
  {
    id: '3',
    username: 'amitverma',
    email: 'amit.verma@example.in',
    status: 'approved',
    documents: [
      {
        id: 'doc5',
        userId: '3',
        docType: 'AADHAR_FRONT',
        docUrl: 'URL_ADDRESS.com/documents/amitverma_aadhar_front.pdf',
        docStatus: 'APPROVED',
        rejectionReason: null,
        reviewBy: 'admin1',
        reviewAt: '2025-02-18T09:00:00Z',
        createdAt: '2025-02-15T10:30:00Z',
        updatedAt: '2025-02-18T09:00:00Z',
      },
      {
        id: 'doc6',
        userId: '3',
        docType: 'AADHAR_BACK',
        docUrl: 'URL_ADDRESS.com/documents/amitverma_aadhar_back.pdf',
        docStatus: 'APPROVED',
        rejectionReason: null,
        reviewBy: 'admin1',
        reviewAt: '2025-02-18T09:00:00Z',
        createdAt: '2025-02-15T10:30:00Z',
        updatedAt: '2025-02-18T09:00:00Z',
      }
    ],
  },
  {
    id: '4',
    username: 'priyapatel',
    email: 'priya.patel@example.in',
    status: 'rejected',
    documents: [
      {
        id: 'doc7',
        userId: '4',
        docType: 'AADHAR_FRONT',
        docUrl: 'URL_ADDRESS.com/documents/priyapatel_aadhar_front.pdf',
        docStatus: 'REJECTED',
        rejectionReason: 'Document is expired. Please upload a valid certificate.',
        reviewBy: 'admin2',
        reviewAt: '2025-02-18T11:00:00Z',
        createdAt: '2025-02-15T10:30:00Z',
        updatedAt: '2025-02-18T11:00:00Z',
      },
      {
        id: 'doc8',
        userId: '4',
        docType: 'AADHAR_BACK',
        docUrl: 'URL_ADDRESS.com/documents/priyapatel_aadhar_back.pdf',
        docStatus: 'REJECTED',
        rejectionReason: 'Document is expired. Please upload a valid certificate.',
        reviewBy: 'admin2',
        reviewAt: '2025-02-18T11:00:00Z',
        createdAt: '2025-02-15T10:30:00Z',
        updatedAt: '2025-02-18T11:00:00Z',
      }
    ],
  },
  {
    id: '5',
    username: 'siddharthkumar',
    email: 'siddharth.kumar@example.in',
    status: 'pending',
    documents: [
      {
        id: 'doc9',
        userId: '5',
        docType: 'DRIVING_LICENSE_FRONT',
        docUrl: 'URL_ADDRESS.com/documents/siddharth_dl_front.pdf',
        docStatus: 'PENDING',
        rejectionReason: null,
        reviewBy: null,
        reviewAt: null,
        createdAt: '2025-02-15T10:30:00Z',
        updatedAt: '2025-02-15T10:30:00Z',
      },
      {
        id: 'doc10',
        userId: '5',
        docType: 'DRIVING_LICENSE_BACK',
        docUrl: 'URL_ADDRESS.com/documents/siddharth_dl_back.pdf',
        docStatus: 'PENDING',
        rejectionReason: null,
        reviewBy: null,
        reviewAt: null,
        createdAt: '2025-02-15T10:30:00Z',
        updatedAt: '2025-02-15T10:30:00Z',
      }
    ],
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
