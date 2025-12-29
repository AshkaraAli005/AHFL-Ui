import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const StatCard = ({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  iconColor = "text-accent",
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="stat-card group"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            {title}
          </p>

          <p className="text-3xl font-bold tracking-tight text-foreground">
            {typeof value === "number"
              ? value.toLocaleString()
              : value}
          </p>

          {change && (
            <p
              className={cn(
                "text-xs font-medium",
                changeType === "positive" &&
                  "text-status-approved",
                changeType === "negative" &&
                  "text-status-rejected",
                changeType === "neutral" &&
                  "text-muted-foreground"
              )}
            >
              {change}
            </p>
          )}
        </div>

        <div
          className={cn(
            "rounded-xl p-3 transition-transform duration-300 group-hover:scale-110",
            "bg-accent/10"
          )}
        >
          <Icon className={cn("h-6 w-6", iconColor)} />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-1 w-0 bg-accent transition-all duration-300 group-hover:w-full rounded-b-xl" />
    </motion.div>
  );
};

export default StatCard;
