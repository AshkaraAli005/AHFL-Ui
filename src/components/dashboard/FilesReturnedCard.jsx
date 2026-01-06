import { motion } from 'framer-motion';
import { Upload, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const FilesReturnedCard = ({
  totalFilesPickedUp,
  qcDone,
  totalFilesReturned,
  delay = 0,
}) => {
  const returnRate =
    qcDone > 0 ? Math.round((totalFilesReturned / qcDone) * 100) : 0;

  const pendingReturn = qcDone - totalFilesReturned;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className="h-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Upload className="h-5 w-5 text-status-approved" />
            Files Returned to AHFL
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Main returned count */}
          <div className="text-center py-4 rounded-lg bg-status-approved-bg">
            <p className="text-4xl font-bold text-status-approved">
              {totalFilesReturned.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Files Returned
            </p>
          </div>

          {/* Return stats */}
          <div className="flex items-center justify-between text-sm px-2">
            <span className="text-muted-foreground">Return Rate</span>
            <span className="font-semibold text-foreground">
              {returnRate}%
            </span>
          </div>

          {/* Status breakdown */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-muted/50 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <CheckCircle className="h-4 w-4 text-status-approved" />
              </div>
              <p className="text-xl font-semibold text-foreground">
                {totalFilesReturned.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Returned</p>
            </div>

            <div className="p-3 rounded-lg bg-muted/50 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Upload className="h-4 w-4 text-status-processing" />
              </div>
              <p className="text-xl font-semibold text-foreground">
                {pendingReturn.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">
                Pending Return
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FilesReturnedCard;
