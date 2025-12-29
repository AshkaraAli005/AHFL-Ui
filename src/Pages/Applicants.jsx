import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import Header from "../components/layout/Header";
import ApplicantTable from "../components/applicants/ApplicantTable";
import ApplicantFilters from "../components/applicants/ApplicantFilters";
import TablePagination from '../components/common/TablePagination';
import { useApplicants } from "../hooks/useApplicants";
import { Button } from "../components/ui/button";

const ITEMS_PER_PAGE = 5;

const Applicants = () => {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: response, isLoading } = useApplicants({
    search,
    status,
  });

  const allApplicants = response?.data?.applicants || [];
  const total = response?.data?.total || 0;

  // Filter applicants
  const filteredApplicants = useMemo(() => {
    let filtered = allApplicants;

    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.name.toLowerCase().includes(searchLower) ||
          a.email.toLowerCase().includes(searchLower)
      );
    }

    if (status && status !== "all") {
      filtered = filtered.filter(
        (a) => a.status === status
      );
    }

    return filtered;
  }, [allApplicants, search, status]);

  const totalPages = Math.ceil(
    filteredApplicants.length / ITEMS_PER_PAGE
  );

  const paginatedApplicants = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredApplicants.slice(
      start,
      start + ITEMS_PER_PAGE
    );
  }, [filteredApplicants, currentPage]);

  // Reset page when filters change
  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen">
      <Header
        title="Applicants"
        subtitle={`Managing ${total} applicants`}
      />

      <div className="p-6 space-y-6">
        {/* Header Actions */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h2 className="text-lg font-semibold">
              All Applicants
            </h2>
            <p className="text-sm text-muted-foreground">
              View and manage all loan applications
            </p>
          </div>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add Applicant
          </Button>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ApplicantFilters
            search={search}
            onSearchChange={handleSearchChange}
            status={status}
            onStatusChange={handleStatusChange}
          />
        </motion.div>

        {/* Table + Pagination */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ApplicantTable
            applicants={paginatedApplicants}
            isLoading={isLoading}
          />
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </motion.div>

        {/* Empty State */}
        {!isLoading && filteredApplicants.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-16"
          >
            <div className="rounded-full bg-muted p-4">
              <UserPlus className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-medium">
              No applicants found
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
            <Button
              className="mt-4"
              variant="outline"
              onClick={() => {
                setSearch("");
                setStatus("all");
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

export default Applicants;
