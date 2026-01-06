import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const ReceptionFlowCard = ({
  title,
  icon,
  received,
  pickedUp,
  receivedLabel,
  pickedUpLabel,
  delay = 0,
}) => {
  const pickupRate =
    received > 0 ? Math.round((pickedUp / received) * 100) : 0;

  const pending = received - pickedUp;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className="h-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            {icon}
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Total Received */}
          <div className="rounded-lg bg-muted/50 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                {receivedLabel}
              </span>
              <span className="text-2xl font-bold text-foreground">
                {received.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Arrow indicating flow */}
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <ArrowRight className="h-4 w-4" />
              <span className="text-xs">DocuGenie Pickup</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>

          {/* Picked Up */}
          <div className="rounded-lg bg-status-approved-bg border border-status-approved/20 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-status-approved" />
                <span className="text-sm text-muted-foreground">
                  {pickedUpLabel}
                </span>
              </div>
              <span className="text-2xl font-bold text-status-approved">
                {pickedUp.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>{pickupRate}% picked up</span>
              <span>{pending.toLocaleString()} pending</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ReceptionFlowCard;
