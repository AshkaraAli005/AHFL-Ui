import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Eye, MoreHorizontal, FileText, Receipt } from "lucide-react";

import StatusBadge from "../../components/common/StatusBadge";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

const ApplicantTable = ({ applicants, isLoading }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-16 animate-pulse rounded-lg bg-muted"
          />
        ))}
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="rounded-xl border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="min-w-[250px]">Applicant</TableHead>
            {/* <TableHead>Loan Type</TableHead>
            <TableHead>Amount</TableHead> */}
            <TableHead>Documents</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Processed On</TableHead>
            <TableHead className="text-left">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicants.map((applicant, index) => (
            <motion.tr
              key={applicant.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.2,
                delay: index * 0.03,
              }}
              className="group cursor-pointer transition-colors hover:bg-muted/50"
              onClick={() =>
                navigate(`/applicants/${applicant.id}`)
              }
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {applicant.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {applicant.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {applicant.email}
                    </p>
                  </div>
                </div>
              </TableCell>
{/* 
              <TableCell className="text-muted-foreground">
                {applicant.loanType}
              </TableCell>

              <TableCell className="font-medium">
                {formatCurrency(applicant.loanAmount)}
              </TableCell> */}

              <TableCell>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>{applicant.documents.length}</span>
                </div>
              </TableCell>

              <TableCell>
                <StatusBadge status={applicant.status} />
              </TableCell>

              <TableCell className="text-muted-foreground">
                {formatDistanceToNow(
                  new Date(applicant.createdAt),
                  { addSuffix: true }
                )}
              </TableCell>

              <TableCell className="text-left">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    asChild
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(
                          `/applicants/${applicant.id}`
                        );
                      }}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/applicants/${applicant.id}/transactions`);
                    }}>
                      <Receipt className="mr-2 h-4 w-4" />
                      View Transactions
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantTable;
