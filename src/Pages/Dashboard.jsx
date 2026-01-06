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
  Calendar
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
import ReceptionFlowCard from "../components/dashboard/ReceptionFlowCard";
import FilesReturnedCard from "../components/dashboard/FilesReturnedCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Users, FileText, Download, Calendar } from 'lucide-react';
// import Header from '@/components/layout/Header';
// import ReceptionFlowCard from '@/components/dashboard/ReceptionFlowCard';
// import FileProcessingStatusCard from '@/components/dashboard/FileProcessingStatusCard';
// import FilesReturnedCard from '@/components/dashboard/FilesReturnedCard';
// import ProcessingStatusChart from '@/components/dashboard/ProcessingStatusChart';
// import DailyTrendsChart from '@/components/dashboard/DailyTrendsChart';
// import RecentActivityList from '@/components/dashboard/RecentActivityList';



const Dashboard = () => {
  const [dateRange, setDateRange] = useState(7);

  const { data: statsResponse, isLoading: statsLoading } =
    useDashboardStats();
  const { data: activityResponse, isLoading: activityLoading } =
    useRecentActivity();
  const { data: dailyStatsResponse, isLoading: dailyStatsLoading } =
    useDailyStats(dateRange);

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
        {/* Row 1: Applicants, Files, Files Returned */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Download className="h-5 w-5 text-primary" />
            AHFL AWS Reception → DocuGenie Pipeline
          </h2>

          <div className="grid gap-6 lg:grid-cols-3">
            <ReceptionFlowCard
              title="Applicants"
              icon={<Users className="h-5 w-5 text-primary" />}
              received={stats?.totalApplicantsReceived || 0}
              pickedUp={stats?.totalApplicantsPickedUp || 0}
              receivedLabel="Total Received from AHFL"
              pickedUpLabel="Picked Up by DocuGenie"
              delay={0}
            />

            <ReceptionFlowCard
              title="Files"
              icon={<FileText className="h-5 w-5 text-accent" />}
              received={stats?.totalFilesReceived || 0}
              pickedUp={stats?.totalFilesPickedUp || 0}
              receivedLabel="Total Files Received"
              pickedUpLabel="Files Picked Up"
              delay={0.1}
            />

            <FilesReturnedCard
              totalFilesPickedUp={stats?.totalFilesPickedUp || 0}
              qcDone={stats?.totalFilesPickedUp || 0}
              totalFilesReturned={stats?.totalFilesReturned || 0}
              delay={0.2}
            />
          </div>
        </div>

        {/* Row 2: Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">
                  File Processing Distribution
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
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg">Daily Trends</CardTitle>

                <Select
                  value={dateRange.toString()}
                  onValueChange={(value) =>
                    setDateRange(Number(value))
                  }
                >
                  <SelectTrigger className="h-8 text-sm w-fitd">
                    <Calendar className="h-3.5 w-3.5 mr-1.5" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover z-50">
                    <SelectItem value="7">Last 7 Days</SelectItem>
                    <SelectItem value="14">Last 14 Days</SelectItem>
                    <SelectItem value="30">Last 30 Days</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>

              <CardContent>
                <DailyTrendsChart
                  data={dailyStats}
                  isLoading={dailyStatsLoading}
                  dateRange={dateRange}
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
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <Card className="h-full">
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">
                  Processing Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-status-approved-bg p-4">
                  <p className="text-2xl font-bold text-status-approved">
                    {stats
                      ? Math.round(
                          (stats.totalFilesPickedUp /
                            stats.totalFilesReceived) *
                            100
                        )
                      : 0}
                    %
                  </p>
                  <p className="text-sm text-muted-foreground">
                    File Pickup Rate
                  </p>
                </div>

                <div className="rounded-lg bg-status-processing-bg p-4">
                  <p className="text-2xl font-bold text-status-processing">
                    {stats
                      ? Math.round(
                          (stats.qcDone /
                            stats.totalFilesPickedUp) *
                            100
                        )
                      : 0}
                    %
                  </p>
                  <p className="text-sm text-muted-foreground">
                    QC Completion Rate
                  </p>
                </div>

                <div className="rounded-lg bg-accent/10 p-4">
                  <p className="text-2xl font-bold text-accent">
                    {stats
                      ? Math.round(
                          (stats.totalFilesReturned /
                            stats.qcDone) *
                            100
                        )
                      : 0}
                    %
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Return Rate (of QC Done)
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



