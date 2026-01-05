import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Briefcase,
  MoreHorizontal,
  Receipt,
} from "lucide-react";

import Header from "../components/layout/Header";
import StatusBadge from "../components/common/StatusBadge";
import DocumentList from "../components/documents/DocumentList";
import { useApplicant, useUpdateApplicantStatus } from "../hooks/useApplicants";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../components/ui/dropdown-menu";

const ApplicantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: response, isLoading } = useApplicant(id || "");
  const updateStatus = useUpdateApplicantStatus();

  const applicant = response?.data;

  const handleStatusChange = (status) => {
    if (id) {
      updateStatus.mutate({ id, status });
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header title="Loading..." />
        <div className="p-6">
          <div className="space-y-6 animate-pulse">
            <div className="h-8 w-48 rounded bg-muted" />
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="h-64 rounded-xl bg-muted lg:col-span-1" />
              <div className="h-64 rounded-xl bg-muted lg:col-span-2" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!applicant) {
    return (
      <div className="min-h-screen">
        <Header title="Applicant Not Found" />
        <div className="flex flex-col items-center justify-center p-16">
          <p className="text-muted-foreground">
            The applicant you're looking for doesn't exist.
          </p>
          <Button className="mt-4" onClick={() => navigate("/applicants")}>
            Back to Applicants
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header title="Applicant Details" />

      <div className="p-6 space-y-6">
        {/* Back Button & Actions */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <Button
            variant="ghost"
            className="gap-2"
            onClick={() => navigate("/applicants")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Applicants
          </Button>

          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => navigate(`/applicants/${id}/transactions`)}
            >
              <Receipt className="h-4 w-4" />
              View Transactions
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <MoreHorizontal className="h-4 w-4" />
                  Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => handleStatusChange('approved')}>
                  Mark as Approved
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange('processing')}>
                  Mark as Processing
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusChange('pending')}>
                  Mark as Pending
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-destructive"
                  onClick={() => handleStatusChange('rejected')}
                >
                  Mark as Rejected
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Applicant Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    Applicant Info
                  </CardTitle>
                  <StatusBadge status={applicant.status} />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar & Name */}
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                    {applicant.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      {applicant.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Applicant
                    </p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{applicant.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{applicant.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      Processed On{" "}
                      {format(
                        new Date(applicant.createdAt),
                        "MMM d, yyyy"
                      )}
                    </span>
                  </div>
                </div>

                {/* Loan Details */}
                <div className="rounded-lg bg-muted/50 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Briefcase className="h-4 w-4" />
                      Loan Type
                    </div>
                    <span className="font-medium">
                      {applicant.loanType}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <DollarSign className="h-4 w-4" />
                      Amount
                    </div>
                    <span className="text-lg font-bold text-accent">
                      {formatCurrency(applicant.loanAmount)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Documents */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">
                  Documents ({applicant.documents.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DocumentList documents={applicant.documents} />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetail;
