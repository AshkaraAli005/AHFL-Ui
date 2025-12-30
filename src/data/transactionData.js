// Mock bank accounts for applicants
export const mockBankAccounts = [
  // Sarah Johnson's accounts
  {
    id: "acc1",
    accountNumber: "****4521",
    bankName: "Indian Bank",
    accountType: "business",
    balance: 45230.5,
    documentId: "d1",
    applicantId: "1",
  },
  {
    id: "acc2",
    accountNumber: "****7892",
    bankName: "State Bank of India",
    accountType: "savings",
    balance: 28150.75,
    documentId: "d2",
    applicantId: "1",
  },

  // Michael Chen's accounts
  {
    id: "acc3",
    accountNumber: "****3345",
    bankName: "SBI",
    accountType: "current",
    balance: 67890.0,
    documentId: "d4",
    applicantId: "2",
  },

  // Emily Rodriguez's accounts
  {
    id: "acc4",
    accountNumber: "****9012",
    bankName: "Citibank",
    accountType: "savings",
    balance: 12450.25,
    documentId: "d6",
    applicantId: "3",
  },

  // David Thompson's accounts
  {
    id: "acc5",
    accountNumber: "****5678",
    bankName: "US Bank",
    accountType: "business",
    balance: 234500.0,
    documentId: "d7",
    applicantId: "4",
  },
  {
    id: "acc6",
    accountNumber: "****1234",
    bankName: "PNC Bank",
    accountType: "current",
    balance: 89750.5,
    documentId: "d8",
    applicantId: "4",
  },

  // Jessica Williams's accounts
  {
    id: "acc7",
    accountNumber: "****6789",
    bankName: "Union Bank",
    accountType: "savings",
    balance: 34200.0,
    documentId: "d9",
    applicantId: "5",
  },

  // Robert Martinez's accounts
  {
    id: "acc8",
    accountNumber: "****2345",
    bankName: "Capital One",
    accountType: "business",
    balance: 156780.25,
    documentId: "d11",
    applicantId: "6",
  },
  {
    id: "acc9",
    accountNumber: "****8901",
    bankName: "Regions Bank",
    accountType: "current",
    balance: 45600.0,
    documentId: "d12",
    applicantId: "6",
  },
];

// Generate mock transactions for accounts
const generateTransactions = (accountId, count) => {
  const categories = [
    "Payroll",
    "Utilities",
    "Rent",
    "Supplies",
    "Insurance",
    "Revenue",
    "Transfer",
    "Tax",
    "Services",
    "Refund",
  ];
    const transactionMethods = ['Bank Transfer', 'Wire Transfer', 'ACH', 'Check', 'Cash Deposit', 'Direct Debit', 'SWIFT', 'RTGS'];
  const transactionPurposes = ['Payroll', 'Vendor Payment', 'Loan Repayment', 'Utility Bill', 'Rent Payment', 'Client Invoice', 'Tax Payment', 'Insurance Premium', 'Equipment Purchase', 'Marketing Expense'];

  const descriptions = [
    "Monthly salary deposit",
    "Electric bill payment",
    "Office rent payment Office rent payment Office rent payment Office rent payment",
    "Office supplies purchase",
    "Insurance premium",
    "Client payment received",
    "Wire transfer",
    "Quarterly tax payment",
    "Professional services",
    "Vendor refund",
    "Equipment purchase",
    "Marketing expense",
    "Subscription fee",
    "Maintenance cost",
    "Commission payment",
  ];

  const transactions = [];
  let balance = 50000 + Math.random() * 100000;

  for (let i = 0; i < count; i++) {
    const isCredit = Math.random() > 0.45;
    const amount =
      Math.round((500 + Math.random() * 15000) * 100) / 100;

    balance = isCredit ? balance + amount : balance - amount;

    const date = new Date();
    date.setDate(date.getDate() - i);

    transactions.push({
      id: `txn-${accountId}-${i}`,
      date: date.toISOString(),
      description:
        descriptions[
          Math.floor(Math.random() * descriptions.length)
        ],
      type: isCredit ? "credit" : "debit",
      amount,
      balance: Math.round(balance * 100) / 100,
    //   category:
    //     categories[
    //       Math.floor(Math.random() * categories.length)
    //     ],
    //   reference: `REF${Math.random()
    //     .toString(36)
    //     .substring(2, 10)
    //     .toUpperCase()}`,
     transactionMethod: transactionMethods[Math.floor(Math.random() * transactionMethods.length)],
      transactionPurpose: transactionPurposes[Math.floor(Math.random() * transactionPurposes.length)],
      accountId,
    });
  }

  return transactions;
};

// Pre-generate transactions for all accounts
export const mockTransactions = {
  acc1: generateTransactions("acc1", 45),
  acc2: generateTransactions("acc2", 32),
  acc3: generateTransactions("acc3", 28),
  acc4: generateTransactions("acc4", 15),
  acc5: generateTransactions("acc5", 52),
  acc6: generateTransactions("acc6", 38),
  acc7: generateTransactions("acc7", 22),
  acc8: generateTransactions("acc8", 41),
  acc9: generateTransactions("acc9", 29),
};

export const getAccountsByApplicantId = (applicantId) => {
  return mockBankAccounts.filter(
    (acc) => acc.applicantId === applicantId
  );
};

export const getTransactionsByAccountId = (accountId) => {
  return mockTransactions[accountId] || [];
};
