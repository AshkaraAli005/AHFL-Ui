import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowDownLeft,
  FileText,
  X,
  Download,
  ChevronDown,
  Wallet,
  Building2,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import Header from "../components/layout/Header";
import TablePagination from "../components/common/TablePagination";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { ScrollArea } from "../components/ui/scroll-area";

import { mockApplicants } from "../data/mockData";
import {
  getAccountsByApplicantId,
  getTransactionsByAccountId,
} from "../data/transactionData";
import { cn } from "../lib/utils";

const ITEMS_PER_PAGE = 10;

const ApplicantTransactions = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const applicant = mockApplicants.find((a) => a.id === id);

  const accounts = useMemo(
    () => getAccountsByApplicantId(id || ""),
    [id]
  );

  const [selectedAccountId, setSelectedAccountId] = useState(
    accounts[0]?.id || ""
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [showDocumentPreview, setShowDocumentPreview] =
    useState(false);

  const selectedAccount = accounts.find(
    (acc) => acc.id === selectedAccountId
  );

  const relatedDocument = applicant?.documents.find(
    (doc) => doc.id === selectedAccount?.documentId
  );

  const transactions = useMemo(() => {
    return getTransactionsByAccountId(selectedAccountId);
  }, [selectedAccountId]);

  const totalPages = Math.ceil(
    transactions.length / ITEMS_PER_PAGE
  );

  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return transactions.slice(start, start + ITEMS_PER_PAGE);
  }, [transactions, currentPage]);

  // Summary stats
  const stats = useMemo(() => {
    const totalCredits = transactions
      .filter((t) => t.type === "credit")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalDebits = transactions
      .filter((t) => t.type === "debit")
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalCredits,
      totalDebits,
      netFlow: totalCredits - totalDebits,
    };
  }, [transactions]);

  const handleAccountChange = (accountId) => {
    setSelectedAccountId(accountId);
    setCurrentPage(1);
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  if (!applicant) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">
          Applicant not found
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header
        title="Transaction Analysis"
        subtitle={`Extracted data for ${applicant.name}`}
      />

      <div className="p-6 space-y-6">
        {/* Back + Account Selector */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <Button
            variant="ghost"
            onClick={() => navigate("/applicants")}
            className="w-fit gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Applicants
          </Button>

          <div className="flex items-center gap-3">
            <Select
              value={selectedAccountId}
              onValueChange={handleAccountChange}
            >
              <SelectTrigger className="">
                <Wallet className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select Account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem
                    key={account.id}
                    value={account.id}
                  >
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span>{account.bankName}</span>
                      <span className="text-muted-foreground">
                        {account.accountNumber}
                      </span>
                      <Badge
                        variant="outline"
                        className="ml-1 text-xs"
                      >
                        {account.accountType}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() =>
                setShowDocumentPreview(!showDocumentPreview)
              }
              className="gap-2"
            >
              <FileText className="h-4 w-4" />
              {showDocumentPreview
                ? "Hide Document"
                : "View Document"}
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <div className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Wallet className="h-4 w-4" />
              <span className="text-sm">
                Current Balance
              </span>
            </div>
            <p className="mt-2 text-2xl font-bold">
              {formatCurrency(selectedAccount?.balance || 0)}
            </p>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2 text-status-approved">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm">
                Total Credits
              </span>
            </div>
            <p className="mt-2 text-2xl font-bold text-status-approved">
              {formatCurrency(stats.totalCredits)}
            </p>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2 text-status-rejected">
              <TrendingDown className="h-4 w-4" />
              <span className="text-sm">
                Total Debits
              </span>
            </div>
            <p className="mt-2 text-2xl font-bold text-status-rejected">
              {formatCurrency(stats.totalDebits)}
            </p>
          </div>

          <div className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <ChevronDown className="h-4 w-4" />
              <span className="text-sm">
                Transactions
              </span>
            </div>
            <p className="mt-2 text-2xl font-bold">
              {transactions.length}
            </p>
          </div>
        </motion.div>

        {/* Table + Document Preview */}
        <div
          className={cn(
            "flex gap-6",
            showDocumentPreview
              ? "flex-col lg:flex-row"
              : ""
          )}
        >
          {/* Transactions Table */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={cn(
              "flex-1",
              showDocumentPreview ? "lg:w-2/3" : ""
            )}
          >
            <div className="rounded-xl border bg-card">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="min-w-[100px] max-w-[120px]">Date</TableHead>
                    <TableHead className="min-w-[180px] max-w-[280px]">Description</TableHead>
                    <TableHead className="min-w-[100px] max-w-[140px]">Method</TableHead>
                    <TableHead className="min-w-[120px] max-w-[160px]">Purpose</TableHead>
                    <TableHead className="min-w-[100px] max-w-[140px] text-right">Amount</TableHead>
                    <TableHead className="min-w-[100px] max-w-[140px] text-right">Balance</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {paginatedTransactions.map(
                    (txn, index) => (
                      <motion.tr
                        key={txn.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.2,
                          delay: index * 0.02,
                        }}
                        className="group"
                      >
                      <TableCell className="min-w-[100px] max-w-[120px] text-muted-foreground whitespace-nowrap">
                          {format(
                            new Date(txn.date),
                            "MMM dd, yyyy"
                          )}
                        </TableCell>

                      <TableCell className="min-w-[180px] max-w-[280px]">
                          <div className="flex items-center gap-2">
                            <div
                              className={cn(
                            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                                txn.type === "credit"
                                  ? "bg-status-approved-bg text-status-approved"
                                  : "bg-status-rejected-bg text-status-rejected"
                              )}
                            >
                              {txn.type === "credit" ? (
                                <ArrowDownLeft className="h-3.5 w-3.5" />
                              ) : (
                                <ArrowUpRight className="h-3.5 w-3.5" />
                              )}
                            </div>
                          <span className="font-medium truncate">{txn.description}</span>
                          </div>
                        </TableCell>
                      <TableCell className="min-w-[100px] max-w-[140px]">
                        <Badge variant="secondary" className="text-xs whitespace-nowrap">
                          {txn.transactionMethod}
                          </Badge>
                        </TableCell>

                      <TableCell className="min-w-[120px] max-w-[160px]">
                        <span className="text-sm text-muted-foreground truncate block">
                          {txn.transactionPurpose}
                        </span>
                        </TableCell>

                        <TableCell
                          className={cn(
                        "min-w-[100px] max-w-[140px] text-right font-medium whitespace-nowrap",
                            txn.type === "credit"
                              ? "text-status-approved"
                              : "text-status-rejected"
                          )}
                        >
                          {txn.type === "credit" ? "+" : "-"}
                          {formatCurrency(txn.amount)}
                        </TableCell>

                      <TableCell className="min-w-[100px] max-w-[140px] text-right font-medium whitespace-nowrap">
                          {formatCurrency(txn.balance)}
                        </TableCell>
                      </motion.tr>
                    )
                  )}
                </TableBody>
              </Table>
            </div>

            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </motion.div>

          {/* Document Preview */}
          {showDocumentPreview && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/3"
            >
              <div className="sticky top-20 rounded-xl border bg-card">
                <div className="flex items-center justify-between border-b p-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">
                        {relatedDocument?.name ||
                          "No Document"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {relatedDocument?.fileSize} •{" "}
                        {relatedDocument?.type.replace(
                          "_",
                          " "
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        setShowDocumentPreview(false)
                      }
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <ScrollArea className="h-[500px]">
                  <div className="p-4">
                    {relatedDocument ? (
                      relatedDocument.name.toLowerCase().endsWith('.pdf') ? (
                        <iframe
                          src={relatedDocument.url || '/placeholder.svg'}
                          className="w-full h-[460px] rounded-lg border-0"
                          title={relatedDocument.name}
                        />
                      ) : (
                        <div className="flex flex-col gap-4">
                          <img
                            src={relatedDocument.url || '/placeholder.svg'}
                            alt={relatedDocument.name}
                            className="w-full h-auto rounded-lg object-contain bg-muted"
                          />
                          <Button variant="outline" className="gap-2 w-full">
                            <Download className="h-4 w-4" />
                            Download Document
                          </Button>
                        </div>
                      )
                    ) : (
                      <div className="flex flex-col items-center gap-4 text-center py-8">
                        <div className="rounded-lg bg-muted p-8">
                          <FileText className="h-16 w-16 text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Select an account to view related document
                        </p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicantTransactions;
