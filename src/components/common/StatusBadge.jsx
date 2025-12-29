import { cn } from "../../lib/utils";
import {
  CheckCircle2,
  Clock,
  XCircle,
  Loader2,
} from "lucide-react";

const statusConfig = {
  approved: {
    label: "Approved",
    bgClass: "bg-status-approved-bg",
    textClass: "text-status-approved",
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
  },
  verified: {
    label: "Verified",
    bgClass: "bg-status-approved-bg",
    textClass: "text-status-approved",
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
  },
  pending: {
    label: "Pending",
    bgClass: "bg-status-pending-bg",
    textClass: "text-status-pending",
    icon: <Clock className="h-3.5 w-3.5" />,
  },
  rejected: {
    label: "Rejected",
    bgClass: "bg-status-rejected-bg",
    textClass: "text-status-rejected",
    icon: <XCircle className="h-3.5 w-3.5" />,
  },
  processing: {
    label: "Processing",
    bgClass: "bg-status-processing-bg",
    textClass: "text-status-processing",
    icon: (
      <Loader2 className="h-3.5 w-3.5 animate-spin" />
    ),
  },
};

const StatusBadge = ({ status, size = "md" }) => {
  const config = statusConfig[status];

  if (!config) return null;

  return (
    <span
      className={cn(
        "status-badge",
        config.bgClass,
        config.textClass,
        size === "sm" && "text-[10px] px-2 py-0.5"
      )}
    >
      {config.icon}
      {config.label}
    </span>
  );
};

export default StatusBadge;
