import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, FileText, Upload } from "lucide-react";
import Header from "../components/layout/Header";
import DocumentList from "../components/documents/DocumentList";
import { useApplicants } from "../hooks/useApplicants";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import TablePagination from "../components/common/TablePagination";

const ITEMS_PER_PAGE = 5;

const Documents = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: response, isLoading } = useApplicants({});

  // Flatten all documents from all applicants
  const allDocuments = useMemo(() => {
    if (!response?.data?.applicants) return [];

    return response.data.applicants.flatMap((applicant) =>
      applicant.documents.map((doc) => ({
        ...doc,
        applicantName: applicant.name,
      }))
    );
  }, [response]);

  // Filter documents
  const filteredDocuments = useMemo(() => {
    let filtered = allDocuments;

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (doc) =>
          doc.name.toLowerCase().includes(searchLower) ||
          doc.applicantName?.toLowerCase().includes(searchLower)
      );
    }

    if (statusFilter && statusFilter !== "all") {
      filtered = filtered.filter(
        (doc) => doc.status === statusFilter
      );
    }

    return filtered;
  }, [allDocuments, search, statusFilter]);

  const totalPages = Math.ceil(
    filteredDocuments.length / ITEMS_PER_PAGE
  );

  const paginatedDocuments = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredDocuments.slice(
      start,
      start + ITEMS_PER_PAGE
    );
  }, [filteredDocuments, currentPage]);

  // Reset page when filters change
  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const documentStats = useMemo(() => {
    return {
      total: allDocuments.length,
      verified: allDocuments.filter((d) => d.status === "verified").length,
      pending: allDocuments.filter((d) => d.status === "pending").length,
      processing: allDocuments.filter((d) => d.status === "processing").length,
      rejected: allDocuments.filter((d) => d.status === "rejected").length,
    };
  }, [allDocuments]);

  return (
    <div className="min-h-screen">
      <Header
        title="Documents"
        subtitle={`Managing ${allDocuments.length} documents`}
      />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {[
            {
              label: "Total",
              value: documentStats.total,
              color: "bg-primary/10 text-primary",
            },
            {
              label: "Verified",
              value: documentStats.verified,
              color: "bg-status-approved-bg text-status-approved",
            },
            {
              label: "Pending",
              value: documentStats.pending,
              color: "bg-status-pending-bg text-status-pending",
            },
            {
              label: "Processing",
              value: documentStats.processing,
              color: "bg-status-processing-bg text-status-processing",
            },
            {
              label: "Rejected",
              value: documentStats.rejected,
              color: "bg-status-rejected-bg text-status-rejected",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`rounded-xl p-4 ${stat.color.split(" ")[0]}`}
            >
              <p className={`text-2xl font-bold ${stat.color.split(" ")[1]}`}>
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search documents..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex items-center gap-3">
            <Select
              value={statusFilter}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger className="w-40">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Button className="gap-2">
              <Upload className="h-4 w-4" />
              Upload
            </Button>
          </div>
        </motion.div>

        {/* Document List + Pagination */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <DocumentList
            documents={paginatedDocuments}
            isLoading={isLoading}
          />
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </motion.div>

        {/* Empty State */}
        {!isLoading && filteredDocuments.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-16"
          >
            <div className="rounded-full bg-muted p-4">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-medium">
              No documents found
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
            <Button
              className="mt-4"
              variant="outline"
              onClick={() => {
                setSearch("");
                setStatusFilter("all");
                setCurrentPage(1);
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Documents;
