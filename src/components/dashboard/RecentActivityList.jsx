import { motion } from "framer-motion";
import { formatDistanceToNow, parseISO } from "date-fns";
import {
  UserPlus,
  FileUp,
  CheckCircle,
  FileCheck,
  Download,
  Package,
  Layers,
} from "lucide-react";
import { cn } from "../../lib/utils";


const activityConfig = {
  applicant_received: {
    icon: Download,
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  applicant_picked_up: {
    icon: Package,
    color: 'text-status-processing',
    bg: 'bg-status-processing-bg',
  },
  qc_completed: {
    icon: CheckCircle,
    color: 'text-status-approved',
    bg: 'bg-status-approved-bg',
  },
  batch_processed: {
    icon: Layers,
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
};

const getActivityDetails = (activity) => {
  if (activity.applicantName) {
    return activity.applicantName;
  }
  if (activity.batchId) {
    return `${activity.batchId} • ${activity.count} applicants`;
  }
  if (activity.count) {
    return `${activity.count} applicants`;
  }
  return null;
};

const RecentActivityList = ({ activities, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 animate-pulse">
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

  if (!activities.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No recent activity
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {activities.map((activity, index) => {
        const config =
          activityConfig[activity.type] ||
          activityConfig.applicant_received;

        const Icon = config.icon;
        const details = getActivityDetails(activity);

        return (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-muted/50"
          >
            <div
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full',
                config.bg
              )}
            >
              <Icon className={cn('h-5 w-5', config.color)} />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {activity.message}
              </p>
              <p className="text-xs text-muted-foreground">
                {details && (
                  <span className="font-medium text-foreground/80">
                    {details}
                  </span>
                )}
                {details && ' • '}
                {formatDistanceToNow(
                  parseISO(activity.timestamp),
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
