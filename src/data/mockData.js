import  sampleDoc from "../assets/252.pdf";


export const mockApplicants = [
  {
    id: '1',
    name: 'Ashkar Ali',
    email: 'ashkarali.a@email.com',
    phone: '+1 (555) 123-4567',
    status: 'approved',
    processingStatus: 'qc_done',
    createdAt: '2024-12-20T10:30:00Z',
    updatedAt: '2024-12-28T14:20:00Z',
    receivedAt: '2024-12-20T10:30:00Z',
    pickedUpAt: '2024-12-20T11:00:00Z',
    loanAmount: 75000,
    loanType: 'Business Loan',
    documents: [
      {
        id: 'd1',
        name: 'Bank Statement - Dec 2024.pdf',
        type: 'bank_statement',
        status: 'verified',
        url:sampleDoc,
        uploadedAt: '2024-12-20T10:35:00Z',
        fileSize: '2.4 MB',
        applicantId: '1',
      },
      {
        id: 'd2',
        name: 'Bank Statement - Nov 2024.pdf',
        type: 'bank_statement',
        status: 'verified',
        url:sampleDoc,
        uploadedAt: '2024-12-20T10:36:00Z',
        fileSize: '2.1 MB',
        applicantId: '1',
      },
      {
        id: 'd3',
        name: 'Income Tax Return 2023.pdf',
        type: 'tax_document',
        url:sampleDoc,
        status: 'verified',
        uploadedAt: '2024-12-21T09:00:00Z',
        fileSize: '1.8 MB',
        applicantId: '1',
      },
    ],
  },
  {
    id: '2',
    name: 'Ragul Rathna',
    email: 'ragulrathna@email.com',
    phone: '+1 (555) 234-5678',
    status: 'processing',
    processingStatus: 'qc_pending',
    createdAt: '2024-12-22T14:00:00Z',
    updatedAt: '2024-12-28T16:45:00Z',
    receivedAt: '2024-12-22T14:00:00Z',
    pickedUpAt: '2024-12-22T15:00:00Z',
    loanAmount: 150000,
    loanType: 'Mortgage',
    documents: [
      {
        id: 'd4',
        name: 'Bank Statement - Dec 2024',
        type: 'bank_statement',
        status: 'processing',
        uploadedAt: '2024-12-22T14:05:00Z',
        fileSize: '3.2 MB',
        applicantId: '2',
      },
      {
        id: 'd5',
        name: 'Employment Verification',
        type: 'employment',
        status: 'verified',
        uploadedAt: '2024-12-22T14:10:00Z',
        fileSize: '0.8 MB',
        applicantId: '2',
      },
    ],
  },
  {
    id: '3',
    name: 'Tharun Kumar E',
    email: 'tharunkumar.elango@email.com',
    phone: '+1 (555) 345-6789',
    status: 'pending',
    processingStatus: 'queued',
    createdAt: '2024-12-25T09:15:00Z',
    updatedAt: '2024-12-25T09:15:00Z',
    receivedAt: '2024-12-25T09:15:00Z',
    pickedUpAt: '2024-12-25T10:00:00Z',
    loanAmount: 25000,
    loanType: 'Personal Loan',
    documents: [
      {
        id: 'd6',
        name: 'Bank Statement - Dec 2024',
        type: 'bank_statement',
        status: 'pending',
        uploadedAt: '2024-12-25T09:20:00Z',
        fileSize: '1.9 MB',
        applicantId: '3',
      },
    ],
  },
  {
    id: '4',
    name: 'David Thompson',
    email: 'david.thompson@email.com',
    phone: '+1 (555) 456-7890',
    status: 'rejected',
    processingStatus: 'qc_done',
    createdAt: '2024-12-18T11:00:00Z',
    updatedAt: '2024-12-27T10:30:00Z',
    receivedAt: '2024-12-18T11:00:00Z',
    pickedUpAt: '2024-12-18T12:00:00Z',
    loanAmount: 500000,
    loanType: 'Commercial Loan',
    documents: [
      {
        id: 'd7',
        name: 'Bank Statement - Nov 2024',
        type: 'bank_statement',
        status: 'rejected',
        uploadedAt: '2024-12-18T11:05:00Z',
        fileSize: '4.1 MB',
        applicantId: '4',
      },
      {
        id: 'd8',
        name: 'Business Financial Report',
        type: 'financial_report',
        status: 'rejected',
        uploadedAt: '2024-12-18T11:10:00Z',
        fileSize: '5.6 MB',
        applicantId: '4',
      },
    ],
  },
  {
    id: '5',
    name: 'Jessica Williams',
    email: 'jessica.williams@email.com',
    phone: '+1 (555) 567-8901',
    status: 'approved',
    processingStatus: 'qc_done',
    createdAt: '2024-12-15T08:30:00Z',
    updatedAt: '2024-12-26T13:00:00Z',
    receivedAt: '2024-12-15T08:30:00Z',
    pickedUpAt: '2024-12-15T09:00:00Z',
    loanAmount: 45000,
    loanType: 'Auto Loan',
    documents: [
      {
        id: 'd9',
        name: 'Bank Statement - Dec 2024',
        type: 'bank_statement',
        status: 'verified',
        uploadedAt: '2024-12-15T08:35:00Z',
        fileSize: '2.0 MB',
        applicantId: '5',
      },
      {
        id: 'd10',
        name: 'Driver License',
        type: 'identity',
        status: 'verified',
        uploadedAt: '2024-12-15T08:40:00Z',
        fileSize: '0.5 MB',
        applicantId: '5',
      },
    ],
  },
  {
    id: '6',
    name: 'Robert Martinez',
    email: 'robert.martinez@email.com',
    phone: '+1 (555) 678-9012',
    status: 'processing',
    processingStatus: 'qc_pending',
    createdAt: '2024-12-26T16:00:00Z',
    updatedAt: '2024-12-28T11:30:00Z',
    receivedAt: '2024-12-26T16:00:00Z',
    pickedUpAt: '2024-12-26T17:00:00Z',
    loanAmount: 200000,
    loanType: 'Business Expansion',
    documents: [
      {
        id: 'd11',
        name: 'Bank Statement - Dec 2024',
        type: 'bank_statement',
        status: 'processing',
        uploadedAt: '2024-12-26T16:10:00Z',
        fileSize: '3.8 MB',
        applicantId: '6',
      },
      {
        id: 'd12',
        name: 'Bank Statement - Nov 2024',
        type: 'bank_statement',
        status: 'verified',
        uploadedAt: '2024-12-26T16:15:00Z',
        fileSize: '3.5 MB',
        applicantId: '6',
      },
      {
        id: 'd13',
        name: 'Business Plan',
        type: 'business_plan',
        status: 'pending',
        uploadedAt: '2024-12-27T10:00:00Z',
        fileSize: '2.2 MB',
        applicantId: '6',
      },
    ],
  },
  {
    id: '7',
    name: 'Amanda Foster',
    email: 'amanda.foster@email.com',
    phone: '+1 (555) 789-0123',
    status: 'pending',
    processingStatus: 'queued',
    createdAt: '2024-12-28T07:45:00Z',
    updatedAt: '2024-12-28T07:45:00Z',
    receivedAt: '2024-12-28T07:45:00Z',
    pickedUpAt: '2024-12-28T08:30:00Z',
    loanAmount: 35000,
    loanType: 'Education Loan',
    documents: [
      {
        id: 'd14',
        name: 'Bank Statement - Dec 2024',
        type: 'bank_statement',
        status: 'pending',
        uploadedAt: '2024-12-28T07:50:00Z',
        fileSize: '1.7 MB',
        applicantId: '7',
      },
    ],
  },
  {
    id: '8',
    name: 'Christopher Lee',
    email: 'christopher.lee@email.com',
    phone: '+1 (555) 890-1234',
    status: 'approved',
    processingStatus: 'qc_done',
    createdAt: '2024-12-10T12:00:00Z',
    updatedAt: '2024-12-24T09:15:00Z',
    receivedAt: '2024-12-10T12:00:00Z',
    pickedUpAt: '2024-12-10T13:00:00Z',
    loanAmount: 85000,
    loanType: 'Home Improvement',
    documents: [
      {
        id: 'd15',
        name: 'Bank Statement - Dec 2024',
        type: 'bank_statement',
        status: 'verified',
        uploadedAt: '2024-12-10T12:10:00Z',
        fileSize: '2.3 MB',
        applicantId: '8',
      },
      {
        id: 'd16',
        name: 'Property Deed',
        type: 'property',
        status: 'verified',
        uploadedAt: '2024-12-10T12:20:00Z',
        fileSize: '1.1 MB',
        applicantId: '8',
      },
    ],
  },
];

export const mockDashboardStats = {
  totalApplicantsReceived: 1247,
  totalFilesReceived: 4823,
  totalApplicantsPickedUp: 1189,
  totalFilesPickedUp: 4567,
  qcDone: 892,
  qcPending: 156,
  queued: 141,
    // Files Returned to AHFL
    totalFilesReturned:  4129,
};

// Generate mock daily stats for the last 30 days
const generateMockDailyStats = () => {
  const stats = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const baseMultiplier = isWeekend ? 0.3 : 1;

    const applicantsReceived = Math.floor(
      (40 + Math.random() * 40) * baseMultiplier
    );
    const filesReceived = Math.floor(
      (150 + Math.random() * 150) * baseMultiplier
    );
    const applicantsPickedUp = Math.floor(
      applicantsReceived * (0.85 + Math.random() * 0.1)
    );
    const filesPickedUp = Math.floor(
      filesReceived * (0.85 + Math.random() * 0.1)
    );
    const filesReturned = Math.floor(
      filesPickedUp * (0.6 + Math.random() * 0.3)
    );

    stats.push({
      date: date.toISOString().split('T')[0],
      applicantsReceived,
      filesReceived,
      applicantsPickedUp,
      filesPickedUp,
      filesReturned,
    });
  }

  return stats;
};

export const mockDailyStats = generateMockDailyStats();


export const mockRecentActivity = [
  {
    id: 'a1',
    type: 'batch_processed',
    message: 'Batch processing completed',
    timestamp: '2024-12-28T15:30:00Z',
    batchId: 'BATCH-2024-1228-001',
    count: 24,
  },
  {
    id: 'a2',
    type: 'applicant_received',
    message: 'New applicants received from AHFL',
    timestamp: '2024-12-28T14:45:00Z',
    count: 15,
  },
  {
    id: 'a3',
    type: 'qc_completed',
    message: 'QC completed for applicant',
    timestamp: '2024-12-28T13:20:00Z',
    applicantName: 'Sarah Johnson',
  },
  {
    id: 'a4',
    type: 'applicant_picked_up',
    message: 'Applicants picked up for processing',
    timestamp: '2024-12-28T12:00:00Z',
    count: 18,
  },
  {
    id: 'a5',
    type: 'qc_completed',
    message: 'QC completed for applicant',
    timestamp: '2024-12-27T16:30:00Z',
    applicantName: 'Christopher Lee',
  },
  {
    id: 'a6',
    type: 'batch_processed',
    message: 'Batch processing completed',
    timestamp: '2024-12-27T14:00:00Z',
    batchId: 'BATCH-2024-1227-003',
    count: 32,
  },
];
