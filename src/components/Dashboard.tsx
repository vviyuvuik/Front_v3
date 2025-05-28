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
  Send,
  Briefcase,
  MapPin,
  FileText,
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
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="w-full bg-gradient-to-r from-[#0A1F38] to-[#1A3A5F] text-white p-6 rounded-t-2xl">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-semibold">Dashboard</h1>
                  <p className="text-white/80">Bienvenue, {userName}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">
                    Automatisation
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
                  className="rounded-full border-white/20 hover:bg-white/10 text-white"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-xl">Votre emploi, notre IA</p>
              <p className="text-white/80 text-sm mt-1">
                Des milliers d'offres d'emploi dans tous les secteurs, partout
                en France.
              </p>
            </div>
          </div>
          <div className="p-4 border-b border-[#E5E5E5] bg-white">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-[#1D1D1F]">
                <span className="font-medium">Suivi des Candidatures</span>
                <Badge className="bg-[#0071E3] text-white">
                  {statistics.totalApplications}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6 bg-white p-1 rounded-xl shadow-sm border border-[#E5E5E5]">
            <TabsTrigger
              value="overview"
              className="rounded-lg data-[state=active]:bg-[#F5F5F7] data-[state=active]:shadow-sm data-[state=active]:text-[#0071E3]"
            >
              Aperçu
            </TabsTrigger>
            <TabsTrigger
              value="statistics"
              className="rounded-lg data-[state=active]:bg-[#F5F5F7] data-[state=active]:shadow-sm data-[state=active]:text-[#0071E3]"
            >
              Statistiques
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="border-none rounded-2xl shadow-sm overflow-hidden bg-white">
                <CardHeader className="pb-2 bg-gradient-to-r from-[#0071E3] to-[#40AAFF] text-white rounded-t-xl">
                  <CardTitle className="text-lg font-medium">
                    Critères actifs
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2 flex items-center gap-3 p-3 bg-[#F5F5F7] rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-[#E3F2FD] flex items-center justify-center">
                        <Briefcase className="h-5 w-5 text-[#0071E3]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#1D1D1F]">
                          {activeCriteria.jobType}
                        </p>
                        <span className="text-xs text-[#86868B]">
                          Type de poste
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-[#F5F5F7] rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-[#E3F2FD] flex items-center justify-center">
                        <Target className="h-5 w-5 text-[#5E5CE6]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#1D1D1F]">
                          {activeCriteria.location}
                        </p>
                        <span className="text-xs text-[#86868B]">
                          Localisation
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-[#F5F5F7] rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-[#E3F2FD] flex items-center justify-center">
                        <Target className="h-5 w-5 text-[#5E5CE6]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#1D1D1F]">
                          {activeCriteria.contractType}
                        </p>
                        <span className="text-xs text-[#86868B]">
                          Type de contrat
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
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
                </CardContent>
                <CardFooter className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full rounded-xl border-[#E5E5E5] hover:bg-[#F5F5F7] text-[#0071E3]"
                  >
                    Modifier les critères
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-none rounded-2xl shadow-sm overflow-hidden bg-white">
                <CardHeader className="pb-2 bg-gradient-to-r from-[#0071E3] to-[#40AAFF] text-white rounded-t-xl">
                  <CardTitle className="text-lg font-medium flex items-center justify-between">
                    <span>Automatisation</span>
                    <Switch
                      checked={isAutomationEnabled}
                      onCheckedChange={setIsAutomationEnabled}
                      className="data-[state=checked]:bg-white"
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <Badge
                      variant={isAutomationEnabled ? "default" : "outline"}
                      className={
                        isAutomationEnabled
                          ? "bg-[#34C759] hover:bg-[#34C759]/90 text-white"
                          : "text-[#86868B] border-[#E5E5E5]"
                      }
                    >
                      {isAutomationEnabled ? "Actif" : "Inactif"}
                    </Badge>
                    <span className="text-sm text-[#86868B]">
                      Prochaine: Aujourd'hui, 18:00
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col items-center justify-center p-4 bg-[#F5F5F7] rounded-xl">
                      <span className="text-2xl font-bold text-[#1D1D1F]">
                        {automationSettings.maxApplicationsPerDay}
                      </span>
                      <span className="text-xs text-[#86868B]">
                        Max candidatures/jour
                      </span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 bg-[#F5F5F7] rounded-xl">
                      <span className="text-2xl font-bold text-[#1D1D1F]">
                        {automationSettings.frequency}
                      </span>
                      <span className="text-xs text-[#86868B]">Fréquence</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full rounded-xl border-[#E5E5E5] hover:bg-[#F5F5F7] text-[#0071E3]"
                  >
                    Configurer les paramètres
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="bg-white border-none rounded-2xl p-6 shadow-sm mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E3F2FD] flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-[#0071E3]" />
                  </div>
                  <div>
                    <span className="text-[#1D1D1F] font-medium block">
                      3 nouveaux matchs d'emploi
                    </span>
                    <span className="text-[#86868B] text-sm">
                      Correspondant à vos critères de recherche
                    </span>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-[#0071E3] hover:bg-[#0071E3]/90 text-white rounded-xl"
                >
                  Voir les matchs
                </Button>
              </div>

              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#E5E5E5]">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#0071E3] hover:bg-[#F5F5F7] rounded-full flex items-center gap-1"
                >
                  <Send className="h-3.5 w-3.5" />
                  Envoyer CV auto
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#0071E3] hover:bg-[#F5F5F7] rounded-full"
                >
                  Favoris
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#0071E3] hover:bg-[#F5F5F7] rounded-full"
                >
                  Bons matchs
                </Button>
              </div>
            </div>

            <Card className="border-none rounded-2xl shadow-sm overflow-hidden bg-white">
              <CardHeader className="pb-2 bg-gradient-to-r from-[#0071E3] to-[#40AAFF] text-white">
                <CardTitle className="text-lg font-medium">
                  Candidatures récentes
                </CardTitle>
                <CardDescription className="text-white/80">
                  Suivez vos candidatures récentes
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <Tabs defaultValue="all">
                  <TabsList className="mb-6 bg-[#F5F5F7] p-1 rounded-xl border border-[#E5E5E5]">
                    <TabsTrigger
                      value="all"
                      className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#0071E3]"
                    >
                      Toutes
                    </TabsTrigger>
                    <TabsTrigger
                      value="successful"
                      className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#0071E3]"
                    >
                      Acceptées
                    </TabsTrigger>
                    <TabsTrigger
                      value="pending"
                      className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#0071E3]"
                    >
                      En attente
                    </TabsTrigger>
                    <TabsTrigger
                      value="failed"
                      className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#0071E3]"
                    >
                      Refusées
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="all">
                    <ApplicationsList
                      massApplicationStatus={{
                        active: true,
                        totalToSend: 25,
                        sent: 12,
                        status: "sending",
                        lastSentTime: new Date().toISOString(),
                      }}
                    />
                  </TabsContent>

                  <TabsContent value="successful">
                    <ApplicationsList
                      filter="successful"
                      massApplicationStatus={{
                        active: true,
                        totalToSend: 25,
                        sent: 25,
                        status: "completed",
                        lastSentTime: new Date().toISOString(),
                      }}
                    />
                  </TabsContent>

                  <TabsContent value="pending">
                    <ApplicationsList
                      filter="pending"
                      massApplicationStatus={{
                        active: true,
                        totalToSend: 25,
                        sent: 0,
                        status: "idle",
                      }}
                    />
                  </TabsContent>

                  <TabsContent value="failed">
                    <ApplicationsList
                      filter="failed"
                      massApplicationStatus={{
                        active: true,
                        totalToSend: 25,
                        sent: 10,
                        status: "error",
                        errorMessage:
                          "Erreur de connexion à France Travail. Veuillez vérifier vos identifiants.",
                      }}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statistics" className="mt-0">
            <Card className="border-none rounded-2xl shadow-sm overflow-hidden bg-white">
              <CardHeader className="pb-2 bg-gradient-to-r from-[#0071E3] to-[#40AAFF] text-white">
                <CardTitle className="text-lg font-medium">
                  Statistiques des candidatures
                </CardTitle>
                <CardDescription className="text-white/80">
                  Votre activité de candidature
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[#1D1D1F]">
                        Taux de réussite
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
                        <div className="w-8 h-8 rounded-full bg-[#E3F2FD] flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-[#0071E3]" />
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-[#1D1D1F]">
                        {statistics.successfulApplications}
                      </span>
                      <span className="text-xs text-[#86868B]">Acceptées</span>
                    </div>

                    <div className="flex flex-col items-center p-4 bg-[#F5F5F7] rounded-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-full bg-[#E3F2FD] flex items-center justify-center">
                          <Clock className="h-4 w-4 text-[#0071E3]" />
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-[#1D1D1F]">
                        {statistics.pendingApplications}
                      </span>
                      <span className="text-xs text-[#86868B]">En attente</span>
                    </div>

                    <div className="flex flex-col items-center p-4 bg-[#F5F5F7] rounded-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 rounded-full bg-[#E3F2FD] flex items-center justify-center">
                          <XCircle className="h-4 w-4 text-[#0071E3]" />
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-[#1D1D1F]">
                        {statistics.failedApplications}
                      </span>
                      <span className="text-xs text-[#86868B]">Refusées</span>
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
