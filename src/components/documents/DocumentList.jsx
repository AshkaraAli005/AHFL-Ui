import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import { FileText, Download, Eye } from "lucide-react";

import StatusBadge from "../../components/common/StatusBadge";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";

const documentTypeIcons = {
  bank_statement: "🏦",
  tax_document: "📋",
  employment: "💼",
  identity: "🪪",
  property: "🏠",
  financial_report: "📊",
  business_plan: "📈",
};

const DocumentList = ({ documents, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-20 animate-pulse rounded-lg bg-muted"
          />
        ))}
      </div>
    );
  }

  if (!documents || documents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <FileText className="h-12 w-12 text-muted-foreground/50" />
        <p className="mt-4 text-lg font-medium text-muted-foreground">
          No documents
        </p>
        <p className="text-sm text-muted-foreground/70">
          Documents will appear here once uploaded
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {documents.map((doc, index) => (
        <motion.div
          key={doc.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.2,
            delay: index * 0.05,
          }}
          className={cn(
            "group flex items-center justify-between rounded-xl border bg-card p-4",
            "transition-all duration-200 hover:border-accent/50 hover:shadow-md"
          )}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-2xl">
              {documentTypeIcons[doc.type] || "📄"}
            </div>

            <div>
              <p className="font-medium text-foreground">
                {doc.name}
              </p>
              <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                <span>{doc.fileSize}</span>
                <span>•</span>
                <span>
                  {formatDistanceToNow(
                    new Date(doc.uploadedAt),
                    { addSuffix: true }
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <StatusBadge status={doc.status} size="sm" />
            <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DocumentList;
