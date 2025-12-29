import { motion } from "framer-motion";
import {
  Users,
  FileCheck,
  Clock,
  FileText,
  TrendingUp,
} from "lucide-react";

import Header from "../components/layout/Header";
import StatCard from "../components/common/StatCard";
import StatusChart from "../components/dashboard/StatusChart";
import RecentActivityList from "../components/dashboard/RecentActivityList";
import {
  useDashboardStats,
  useRecentActivity,
} from "../hooks/useApplicants";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const Dashboard = () => {
  const { data: statsResponse, isLoading: statsLoading } =
    useDashboardStats();
  const { data: activityResponse, isLoading: activityLoading } =
    useRecentActivity();

  const stats = statsResponse?.data;
  const activities = activityResponse?.data || [];

  return (
    <div className="min-h-screen">
      <Header
        title="Dashboard"
        subtitle="Welcome back! Here's what's happening with your applications."
      />

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Applicants"
            value={stats?.totalApplicants || 0}
            change="+12% from last month"
            changeType="positive"
            icon={Users}
            delay={0}
          />

          <StatCard
            title="Pending Review"
            value={stats?.pendingReview || 0}
            change="Needs attention"
            changeType="neutral"
            icon={Clock}
            iconColor="text-status-pending"
            delay={0.1}
          />

          <StatCard
            title="Approved"
            value={stats?.approved || 0}
            change="+8% approval rate"
            changeType="positive"
            icon={FileCheck}
            iconColor="text-status-approved"
            delay={0.2}
          />

          <StatCard
            title="Documents Processed"
            value={stats?.documentsProcessed || 0}
            change={`${stats?.totalDocuments || 0} total`}
            changeType="neutral"
            icon={FileText}
            delay={0.3}
          />
        </div>

        {/* Charts and Activity */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Status Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  Status Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                {stats && <StatusChart stats={stats} />}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="lg:col-span-2"
          >
            <Card className="h-[50vh] overflow-y-auto">
              <CardHeader>
                <CardTitle className="text-lg">
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RecentActivityList
                  activities={activities}
                  isLoading={activityLoading}
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Processing Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-status-approved-bg p-4">
                  <p className="text-2xl font-bold text-status-approved">
                    {stats
                      ? Math.round(
                          (stats.approved /
                            stats.totalApplicants) *
                            100
                        )
                      : 0}
                    %
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Approval Rate
                  </p>
                </div>

                <div className="rounded-lg bg-status-processing-bg p-4">
                  <p className="text-2xl font-bold text-status-processing">
                    {stats
                      ? Math.round(
                          (stats.documentsProcessed /
                            stats.totalDocuments) *
                            100
                        )
                      : 0}
                    %
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Documents Processed
                  </p>
                </div>

                <div className="rounded-lg bg-status-pending-bg p-4">
                  <p className="text-2xl font-bold text-status-pending">
                    {stats?.pendingReview || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Awaiting Review
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
