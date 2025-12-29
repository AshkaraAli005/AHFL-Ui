import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import {
  UserPlus,
  FileUp,
  CheckCircle,
  FileCheck,
} from "lucide-react";
import { cn } from "../../lib/utils";

const activityConfig = {
  applicant_created: {
    icon: UserPlus,
    color: "text-status-processing",
    bg: "bg-status-processing-bg",
  },
  document_uploaded: {
    icon: FileUp,
    color: "text-status-pending",
    bg: "bg-status-pending-bg",
  },
  document_verified: {
    icon: FileCheck,
    color: "text-status-approved",
    bg: "bg-status-approved-bg",
  },
  status_changed: {
    icon: CheckCircle,
    color: "text-accent",
    bg: "bg-accent/10",
  },
};

const RecentActivityList = ({ activities, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 animate-pulse"
          >
            <div className="h-10 w-10 rounded-full bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded bg-muted" />
              <div className="h-3 w-1/2 rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {activities.map((activity, index) => {
        const config = activityConfig[activity.type];
        if (!config) return null;

        const Icon = config.icon;

        return (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.3,
              delay: index * 0.05,
            }}
            className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-muted/50"
          >
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full",
                config.bg
              )}
            >
              <Icon
                className={cn("h-5 w-5", config.color)}
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {activity.message}
              </p>
              <p className="text-xs text-muted-foreground">
                {activity.applicantName && (
                  <span className="font-medium text-foreground/80">
                    {activity.applicantName}
                  </span>
                )}
                {activity.applicantName && " • "}
                {formatDistanceToNow(
                  new Date(activity.timestamp),
                  { addSuffix: true }
                )}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default RecentActivityList;
