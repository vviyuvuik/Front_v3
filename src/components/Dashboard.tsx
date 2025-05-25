import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  BarChart2,
  CheckCircle,
  Clock,
  Settings,
  Target,
  XCircle,
  ChevronRight,
} from "lucide-react";
import ApplicationsList from "./ApplicationsList";

interface DashboardProps {
  userName?: string;
  statistics?: {
    totalApplications: number;
    successfulApplications: number;
    pendingApplications: number;
    failedApplications: number;
  };
  activeCriteria?: {
    jobType: string;
    location: string;
    contractType: string;
    otherPreferences: string[];
  };
  automationSettings?: {
    isEnabled: boolean;
    frequency: string;
    maxApplicationsPerDay: number;
  };
}

const Dashboard = ({
  userName = "User",
  statistics = {
    totalApplications: 45,
    successfulApplications: 28,
    pendingApplications: 12,
    failedApplications: 5,
  },
  activeCriteria = {
    jobType: "Software Developer",
    location: "Paris, France",
    contractType: "Full-time",
    otherPreferences: ["Remote", "Tech Industry", "Startup"],
  },
  automationSettings = {
    isEnabled: true,
    frequency: "Daily",
    maxApplicationsPerDay: 10,
  },
}: DashboardProps) => {
  const [isAutomationEnabled, setIsAutomationEnabled] = useState(
    automationSettings.isEnabled,
  );
  const successRate = Math.round(
    (statistics.successfulApplications / statistics.totalApplications) * 100,
  );

  return (
    <div className="bg-[#F5F5F7] min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between bg-white rounded-2xl p-6 shadow-sm">
          <div>
            <h1 className="text-3xl font-semibold text-[#1D1D1F]">Dashboard</h1>
            <p className="text-[#86868B]">Welcome back, {userName}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[#1D1D1F]">
                Automation
              </span>
              <Switch
                checked={isAutomationEnabled}
                onCheckedChange={setIsAutomationEnabled}
                className="data-[state=checked]:bg-[#0071E3]"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-[#E5E5E5] hover:bg-[#F5F5F7]"
            >
              <Settings className="h-4 w-4 text-[#1D1D1F]" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6 bg-white p-1 rounded-xl shadow-sm border border-[#F5F5F7]">
            <TabsTrigger
              value="overview"
              className="rounded-lg data-[state=active]:bg-[#F5F5F7] data-[state=active]:shadow-sm data-[state=active]:text-[#0071E3]"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="statistics"
              className="rounded-lg data-[state=active]:bg-[#F5F5F7] data-[state=active]:shadow-sm data-[state=active]:text-[#0071E3]"
            >
              Statistics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="border-none rounded-2xl shadow-sm overflow-hidden bg-white">
                <CardHeader className="pb-2 bg-gradient-to-r from-[#5E5CE6] to-[#9198E5] text-white">
                  <CardTitle className="text-lg font-medium">
                    Active Criteria
                  </CardTitle>
                  <CardDescription className="text-white/80">
                    Your job search preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-[#F5F5F7] rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#E3F2FD] flex items-center justify-center">
                          <Target className="h-4 w-4 text-[#5E5CE6]" />
                        </div>
                        <div>
                          <span className="text-xs text-[#86868B]">
                            Job Type
                          </span>
                          <p className="text-sm font-medium text-[#1D1D1F]">
                            {activeCriteria.jobType}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-[#86868B]" />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-[#F5F5F7] rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#E3F2FD] flex items-center justify-center">
                          <Target className="h-4 w-4 text-[#5E5CE6]" />
                        </div>
                        <div>
                          <span className="text-xs text-[#86868B]">
                            Location
                          </span>
                          <p className="text-sm font-medium text-[#1D1D1F]">
                            {activeCriteria.location}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-[#86868B]" />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-[#F5F5F7] rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#E3F2FD] flex items-center justify-center">
                          <Target className="h-4 w-4 text-[#5E5CE6]" />
                        </div>
                        <div>
                          <span className="text-xs text-[#86868B]">
                            Contract Type
                          </span>
                          <p className="text-sm font-medium text-[#1D1D1F]">
                            {activeCriteria.contractType}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-[#86868B]" />
                    </div>

                    <div>
                      <span className="text-xs text-[#86868B] mb-2 block">
                        Other Preferences
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {activeCriteria.otherPreferences.map(
                          (preference, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-[#F5F5F7] text-[#1D1D1F] hover:bg-[#E5E5E5] border-none"
                            >
                              {preference}
                            </Badge>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full rounded-xl border-[#E5E5E5] hover:bg-[#F5F5F7] text-[#0071E3]"
                  >
                    Edit Criteria
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-none rounded-2xl shadow-sm overflow-hidden bg-white">
                <CardHeader className="pb-2 bg-gradient-to-r from-[#30B0C7] to-[#8BD7E5] text-white">
                  <CardTitle className="text-lg font-medium">
                    Automation Settings
                  </CardTitle>
                  <CardDescription className="text-white/80">
                    Configure your job application automation
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-[#F5F5F7] rounded-xl">
                      <span className="text-sm font-medium text-[#1D1D1F]">
                        Status
                      </span>
                      <Badge
                        variant={isAutomationEnabled ? "default" : "outline"}
                        className={
                          isAutomationEnabled
                            ? "bg-[#34C759] hover:bg-[#34C759]/90 text-white"
                            : "text-[#86868B] border-[#E5E5E5]"
                        }
                      >
                        {isAutomationEnabled ? "Active" : "Inactive"}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-[#F5F5F7] rounded-xl">
                      <span className="text-sm font-medium text-[#1D1D1F]">
                        Check Frequency
                      </span>
                      <span className="text-sm text-[#86868B]">
                        {automationSettings.frequency}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-[#F5F5F7] rounded-xl">
                      <span className="text-sm font-medium text-[#1D1D1F]">
                        Max Applications/Day
                      </span>
                      <span className="text-sm text-[#86868B]">
                        {automationSettings.maxApplicationsPerDay}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-[#F5F5F7] rounded-xl">
                      <span className="text-sm font-medium text-[#1D1D1F]">
                        Next Check
                      </span>
                      <span className="text-sm text-[#86868B]">
                        Today, 18:00
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full rounded-xl border-[#E5E5E5] hover:bg-[#F5F5F7] text-[#0071E3]"
                  >
                    Configure Settings
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="bg-white border-none rounded-2xl p-6 flex items-center justify-between shadow-sm mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FFF8E1] flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-[#FF9500]" />
                </div>
                <span className="text-[#1D1D1F]">
                  You have 3 new job matches based on your criteria.
                </span>
              </div>
              <Button
                size="sm"
                className="bg-[#0071E3] hover:bg-[#0071E3]/90 text-white rounded-xl"
              >
                View Matches
              </Button>
            </div>

            <Card className="border-none rounded-2xl shadow-sm overflow-hidden bg-white">
              <CardHeader className="pb-2 bg-gradient-to-r from-[#0071E3] to-[#40AAFF] text-white">
                <CardTitle className="text-lg font-medium">
                  Recent Applications
                </CardTitle>
                <CardDescription className="text-white/80">
                  Track your recent job applications
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Tabs defaultValue="all">
                  <TabsList className="mb-6 bg-[#F5F5F7] p-1 rounded-xl">
                    <TabsTrigger
                      value="all"
                      className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#0071E3]"
                    >
                      All
                    </TabsTrigger>
                    <TabsTrigger
                      value="successful"
                      className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#0071E3]"
                    >
                      Successful
                    </TabsTrigger>
                    <TabsTrigger
                      value="pending"
                      className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#0071E3]"
                    >
                      Pending
                    </TabsTrigger>
                    <TabsTrigger
                      value="failed"
                      className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#0071E3]"
                    >
                      Failed
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="all">
                    <ApplicationsList />
                  </TabsContent>

                  <TabsContent value="successful">
                    <ApplicationsList filter="successful" />
                  </TabsContent>

                  <TabsContent value="pending">
                    <ApplicationsList filter="pending" />
                  </TabsContent>

                  <TabsContent value="failed">
                    <ApplicationsList filter="failed" />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statistics" className="mt-0">
            <Card className="border-none rounded-2xl shadow-sm overflow-hidden bg-white">
              <CardHeader className="pb-2 bg-gradient-to-r from-[#0071E3] to-[#40AAFF] text-white">
                <CardTitle className="text-lg font-medium">
                  Application Statistics
                </CardTitle>
                <CardDescription className="text-white/80">
                  Your job application activity
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[#1D1D1F]">
                        Success Rate
                      </span>
                      <span className="text-sm font-medium text-[#1D1D1F]">
                        {successRate}%
                      </span>
                    </div>
                    <Progress
                      value={successRate}
                      className="h-2 bg-[#E5E5E5]"
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center p-4 bg-[#F5F5F7] rounded-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-full bg-[#E8F5E9] flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-[#34C759]" />
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-[#1D1D1F]">
                        {statistics.successfulApplications}
                      </span>
                      <span className="text-xs text-[#86868B]">Successful</span>
                    </div>

                    <div className="flex flex-col items-center p-4 bg-[#F5F5F7] rounded-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-full bg-[#FFF8E1] flex items-center justify-center">
                          <Clock className="h-4 w-4 text-[#FF9500]" />
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-[#1D1D1F]">
                        {statistics.pendingApplications}
                      </span>
                      <span className="text-xs text-[#86868B]">Pending</span>
                    </div>

                    <div className="flex flex-col items-center p-4 bg-[#F5F5F7] rounded-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-full bg-[#FEEBEE] flex items-center justify-center">
                          <XCircle className="h-4 w-4 text-[#FF3B30]" />
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-[#1D1D1F]">
                        {statistics.failedApplications}
                      </span>
                      <span className="text-xs text-[#86868B]">Failed</span>
                    </div>

                    <div className="flex flex-col items-center p-4 bg-[#F5F5F7] rounded-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-full bg-[#E3F2FD] flex items-center justify-center">
                          <BarChart2 className="h-4 w-4 text-[#0071E3]" />
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-[#1D1D1F]">
                        {statistics.totalApplications}
                      </span>
                      <span className="text-xs text-[#86868B]">Total</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
