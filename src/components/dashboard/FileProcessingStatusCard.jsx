import { motion } from 'framer-motion';
import { FileText, CheckCircle, Clock, Layers } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const FileProcessingStatusCard = ({
  totalFilesPickedUp,
  qcDone,
  qcPending,
  queued,
  delay = 0,
}) => {
  const total = qcDone + qcPending + queued;

  const qcDonePercent = total > 0 ? Math.round((qcDone / total) * 100) : 0;
  const qcPendingPercent = total > 0 ? Math.round((qcPending / total) * 100) : 0;
  const queuedPercent = total > 0 ? Math.round((queued / total) * 100) : 0;

  const statItems = [
    {
      label: 'QC Done',
      value: qcDone,
      percent: qcDonePercent,
      icon: CheckCircle,
      colorClass: 'text-status-approved',
      bgClass: 'bg-status-approved-bg',
      progressColor: 'bg-status-approved',
    },
    {
      label: 'QC Pending',
      value: qcPending,
      percent: qcPendingPercent,
      icon: Clock,
      colorClass: 'text-status-pending',
      bgClass: 'bg-status-pending-bg',
      progressColor: 'bg-status-pending',
    },
    {
      label: 'Queued',
      value: queued,
      percent: queuedPercent,
      icon: Layers,
      colorClass: 'text-status-processing',
      bgClass: 'bg-status-processing-bg',
      progressColor: 'bg-status-processing',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className="h-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5 text-accent" />
            File Processing Status
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Out of {totalFilesPickedUp.toLocaleString()} files picked up
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {statItems.map((item) => (
            <div
              key={item.label}
              className={`rounded-lg ${item.bgClass} p-4`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <item.icon className={`h-4 w-4 ${item.colorClass}`} />
                  <span className="text-sm font-medium text-foreground">
                    {item.label}
                  </span>
                </div>

                <div className="text-right">
                  <span className={`text-xl font-bold ${item.colorClass}`}>
                    {item.value.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground ml-2">
                    ({item.percent}%)
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Total Summary */}
          <div className="pt-2 border-t border-border">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Total in Processing
              </span>
              <span className="font-semibold text-foreground">
                {total.toLocaleString()} files
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FileProcessingStatusCard;
