import { motion } from "framer-motion";
import {
  Users,
  FileCheck,
  Clock,
  FileText,
  TrendingUp,
  Download,
  Layers,
  CheckCircle,
} from "lucide-react";

import Header from "../components/layout/Header";
import StatCard from "../components/common/StatCard";
import StatusChart from "../components/dashboard/StatusChart";
import RecentActivityList from "../components/dashboard/RecentActivityList";
import {
  useDailyStats,
  useDashboardStats,
  useRecentActivity,
} from "../hooks/useApplicants";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import DailyTrendsChart from "../components/dashboard/DailyTrendsChart";
import ProcessingStatusChart from "../components/dashboard/ProcessingStatusChart";


const Dashboard = () => {
  const { data: statsResponse, isLoading: statsLoading } = useDashboardStats();
  const { data: activityResponse, isLoading: activityLoading } = useRecentActivity();
  const { data: dailyStatsResponse, isLoading: dailyStatsLoading } = useDailyStats();

  const stats = statsResponse?.data;
  const activities = activityResponse?.data || [];
  const dailyStats = dailyStatsResponse?.data || [];

  return (
    <div className="min-h-screen">
      <Header
        title="DocuGenie Dashboard"
        subtitle="Real-time overview of AHFL document processing pipeline"
      />

      <div className="p-6 space-y-6">
        {/* AHFL Reception Stats */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Download className="h-5 w-5 text-primary" />
            AHFL AWS Reception
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Applicants Received"
              value={stats?.totalApplicantsReceived || 0}
              change="From AHFL AWS"
              changeType="neutral"
              icon={Users}
              delay={0}
            />
            <StatCard
              title="Total Files Received"
              value={stats?.totalFilesReceived || 0}
              change="Documents in pipeline"
              changeType="neutral"
              icon={FileText}
              delay={0.1}
            />
            <StatCard
              title="Applicants Picked Up"
              value={stats?.totalApplicantsPickedUp || 0}
              change="By DocuGenie"
              changeType="positive"
              icon={Download}
              iconColor="text-status-approved"
              delay={0.2}
            />
            <StatCard
              title="Files Picked Up"
              value={stats?.totalFilesPickedUp || 0}
              change="For processing"
              changeType="positive"
              icon={FileText}
              iconColor="text-status-approved"
              delay={0.3}
            />
          </div>
        </div>

        {/* Processing Status Stats */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-accent" />
            Processing Status
          </h2>

          <div className="grid gap-6 sm:grid-cols-3">
            <StatCard
              title="QC Done"
              value={stats?.qcDone || 0}
              change="Processing completed"
              changeType="positive"
              icon={CheckCircle}
              iconColor="text-status-approved"
              delay={0.4}
            />
            <StatCard
              title="QC Pending"
              value={stats?.qcPending || 0}
              change="Awaiting quality check"
              changeType="neutral"
              icon={Clock}
              iconColor="text-status-pending"
              delay={0.5}
            />
            <StatCard
              title="Queued"
              value={stats?.queued || 0}
              change="In pipeline"
              changeType="neutral"
              icon={Layers}
              iconColor="text-status-processing"
              delay={0.6}
            />
          </div>
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">
                  Processing Status Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                {stats && <ProcessingStatusChart stats={stats} />}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">
                  Daily Trends (Last 7 Days)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DailyTrendsChart
                  data={dailyStats}
                  isLoading={dailyStatsLoading}
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activity & Overview */}
        <div className="grid gap-6 lg:grid-cols-3">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.9 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <RecentActivityList
                  activities={activities}
                  isLoading={activityLoading}
                />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.0 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Processing Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-status-approved-bg p-4">
                  <p className="text-2xl font-bold text-status-approved">
                    {stats
                      ? Math.round(
                          (stats.totalApplicantsPickedUp /
                            stats.totalApplicantsReceived) *
                            100
                        )
                      : 0}
                    %
                  </p>
                  <p className="text-sm text-muted-foreground">Pickup Rate</p>
                </div>

                <div className="rounded-lg bg-status-processing-bg p-4">
                  <p className="text-2xl font-bold text-status-processing">
                    {stats
                      ? Math.round(
                          (stats.qcDone /
                            stats.totalApplicantsPickedUp) *
                            100
                        )
                      : 0}
                    %
                  </p>
                  <p className="text-sm text-muted-foreground">
                    QC Completion Rate
                  </p>
                </div>

                <div className="rounded-lg bg-status-pending-bg p-4">
                  <p className="text-2xl font-bold text-status-pending">
                    {(stats?.qcPending || 0) + (stats?.queued || 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Pending Processing
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

