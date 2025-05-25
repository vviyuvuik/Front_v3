import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Eye,
  ExternalLink,
  Calendar,
  Building,
  Briefcase,
  Clock,
  ChevronDown,
  ChevronUp,
  MapPin,
  Filter,
  X,
  Search,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Application {
  id: string;
  companyName: string;
  position: string;
  date: string;
  status: "success" | "failure" | "pending";
  logoUrl?: string;
  location: string;
  matchPercentage?: number;
}

interface ApplicationsListProps {
  applications?: Application[];
  onViewDetails?: (applicationId: string) => void;
  onOpenExternal?: (applicationId: string) => void;
}

const ApplicationsList = ({
  applications = [
    {
      id: "1",
      companyName: "Tech Solutions",
      position: "Frontend Developer",
      date: "2023-06-15",
      status: "success",
      logoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=tech",
      location: "Paris, France",
      matchPercentage: 95,
    },
    {
      id: "2",
      companyName: "Digital Innovations",
      position: "UX Designer",
      date: "2023-06-14",
      status: "pending",
      logoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=digital",
      location: "Lyon, France",
      matchPercentage: 75,
    },
    {
      id: "3",
      companyName: "Data Systems",
      position: "Backend Engineer",
      date: "2023-06-13",
      status: "failure",
      logoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=data",
      location: "Marseille, France",
      matchPercentage: 45,
    },
    {
      id: "4",
      companyName: "Cloud Services",
      position: "DevOps Engineer",
      date: "2023-06-12",
      status: "success",
      logoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=cloud",
      location: "Toulouse, France",
      matchPercentage: 88,
    },
    {
      id: "5",
      companyName: "Mobile Apps Inc",
      position: "React Native Developer",
      date: "2023-06-11",
      status: "pending",
      logoUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=mobile",
      location: "Bordeaux, France",
      matchPercentage: 62,
    },
  ],
  onViewDetails = () => {},
  onOpenExternal = () => {},
}: ApplicationsListProps) => {
  const [filteredApplications, setFilteredApplications] = useState<
    Application[]
  >([]);
  const [activeFilters, setActiveFilters] = useState<{
    matchLevel: string | null;
    contractType: string | null;
    location: string | null;
  }>({
    matchLevel: null,
    contractType: null,
    location: null,
  });

  useEffect(() => {
    let result = [...applications];

    if (activeFilters.matchLevel) {
      if (activeFilters.matchLevel === "high") {
        result = result.filter(
          (app) => app.matchPercentage && app.matchPercentage >= 80,
        );
      } else if (activeFilters.matchLevel === "medium") {
        result = result.filter(
          (app) =>
            app.matchPercentage &&
            app.matchPercentage >= 60 &&
            app.matchPercentage < 80,
        );
      } else if (activeFilters.matchLevel === "low") {
        result = result.filter(
          (app) => app.matchPercentage && app.matchPercentage < 60,
        );
      }
    }

    if (activeFilters.contractType) {
      result = result.filter(
        (app) => getContractType(app.id) === activeFilters.contractType,
      );
    }

    if (activeFilters.location) {
      result = result.filter((app) =>
        app.location.includes(activeFilters.location as string),
      );
    }

    setFilteredApplications(result);
  }, [applications, activeFilters]);

  const toggleMatchFilter = (level: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      matchLevel: prev.matchLevel === level ? null : level,
    }));
  };

  const toggleContractFilter = (type: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      contractType: prev.contractType === type ? null : type,
    }));
  };

  const toggleLocationFilter = (location: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      location: prev.location === location ? null : location,
    }));
  };

  const clearFilters = () => {
    setActiveFilters({
      matchLevel: null,
      contractType: null,
      location: null,
    });
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  const getStatusBadge = (status: Application["status"]) => {
    switch (status) {
      case "success":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
          >
            Réussi
          </Badge>
        );
      case "failure":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
          >
            Échoué
          </Badge>
        );
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
          >
            En attente
          </Badge>
        );
      default:
        return null;
    }
  };

  const getMatchingIndicator = (percentage?: number) => {
    if (percentage === undefined) return null;

    let bgColor = "";
    let textColor = "";
    let label = "";
    let matchLevel = "";
    let ringColor = "";

    if (percentage >= 80) {
      bgColor = "bg-gradient-to-r from-green-400 to-green-500";
      textColor = "text-white";
      label = "Excellent";
      matchLevel = "high";
      ringColor = "ring-green-200";
    } else if (percentage >= 60) {
      bgColor = "bg-gradient-to-r from-amber-400 to-amber-500";
      textColor = "text-white";
      label = "Bon";
      matchLevel = "medium";
      ringColor = "ring-amber-200";
    } else {
      bgColor = "bg-gradient-to-r from-red-400 to-red-500";
      textColor = "text-white";
      label = "Faible";
      matchLevel = "low";
      ringColor = "ring-red-200";
    }

    return (
      <div
        className={`inline-flex items-center justify-center w-9 h-9 rounded-full ${bgColor} ${textColor} font-semibold text-sm cursor-pointer hover:opacity-90 shadow-sm ring-2 ${ringColor}`}
        onClick={(e) => {
          e.stopPropagation();
          toggleMatchFilter(matchLevel);
        }}
        title={`Filtre par correspondance ${label}`}
      >
        {percentage}%
      </div>
    );
  };

  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCardClick = (application: Application) => {
    setSelectedApplication(application);
    setIsDialogOpen(true);
  };

  const getSkillTags = (position: string) => {
    const skillsMap: Record<string, string[]> = {
      "Frontend Developer": ["REACT", "TYPESCRIPT", "HTML", "CSS"],
      "UX Designer": ["FIGMA", "SKETCH", "ADOBE XD", "UI/UX"],
      "Backend Engineer": ["PYTHON", "NODE.JS", "SQL", "DOCKER"],
      "DevOps Engineer": ["KUBERNETES", "AWS", "TERRAFORM", "CI/CD"],
      "React Native Developer": ["REACT NATIVE", "JAVASCRIPT", "MOBILE", "API"],
    };

    return skillsMap[position] || ["JAVASCRIPT", "HTML", "CSS", "REACT"];
  };

  const getContractType = (id: string) => {
    const types = ["CDI", "CDD", "Freelance", "Stage", "Alternance"];
    return types[parseInt(id) % types.length];
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 7) {
      return `il y a ${diffDays} jour${diffDays > 1 ? "s" : ""}`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `il y a ${weeks} semaine${weeks > 1 ? "s" : ""}`;
    } else {
      const months = Math.floor(diffDays / 30);
      return `il y a ${months} mois`;
    }
  };

  return (
    <div className="w-full bg-[#f5f5f7] p-6 rounded-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#1d1d1f]">
          Candidatures récentes
        </h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10 bg-white/80 border-0 rounded-full h-9 text-sm shadow-sm backdrop-blur-sm focus-visible:ring-1 focus-visible:ring-blue-500"
              placeholder="Rechercher une candidature..."
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleMatchFilter("high")}
            className={`rounded-full px-4 border-0 shadow-sm ${activeFilters.matchLevel === "high" ? "bg-green-50 text-green-700" : "bg-white/80 backdrop-blur-sm"}`}
          >
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            Excellents matchs
          </Button>
          {Object.values(activeFilters).some((filter) => filter !== null) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="rounded-full text-gray-500 hover:bg-white/50 hover:text-gray-700"
            >
              <X className="h-4 w-4 mr-1" />
              Effacer les filtres
            </Button>
          )}
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        <Badge
          variant="outline"
          className="cursor-pointer bg-white/80 backdrop-blur-sm border-0 shadow-sm hover:bg-white rounded-full px-3 py-1"
          onClick={() => toggleContractFilter("CDI")}
        >
          <Filter className="h-3 w-3 mr-1" />
          Type: CDI
        </Badge>
        <Badge
          variant="outline"
          className="cursor-pointer bg-white/80 backdrop-blur-sm border-0 shadow-sm hover:bg-white rounded-full px-3 py-1"
          onClick={() => toggleContractFilter("CDD")}
        >
          <Filter className="h-3 w-3 mr-1" />
          Type: CDD
        </Badge>
        <Badge
          variant="outline"
          className="cursor-pointer bg-white/80 backdrop-blur-sm border-0 shadow-sm hover:bg-white rounded-full px-3 py-1"
          onClick={() => toggleLocationFilter("Paris")}
        >
          <MapPin className="h-3 w-3 mr-1" />
          Paris
        </Badge>
        <Badge
          variant="outline"
          className="cursor-pointer bg-white/80 backdrop-blur-sm border-0 shadow-sm hover:bg-white rounded-full px-3 py-1"
          onClick={() => toggleLocationFilter("Lyon")}
        >
          <MapPin className="h-3 w-3 mr-1" />
          Lyon
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {(filteredApplications.length > 0
          ? filteredApplications
          : applications
        ).map((application) => {
          const skills = getSkillTags(application.position);
          const contractType = getContractType(application.id);

          return (
            <div
              key={application.id}
              onClick={() => handleCardClick(application)}
              className="bg-white rounded-2xl p-5 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="font-semibold text-lg text-[#1d1d1f]">
                  {application.position}
                </div>
                {getMatchingIndicator(application.matchPercentage)}
              </div>
              <div className="flex items-center gap-2 text-gray-500 mb-2 text-sm">
                <Avatar className="h-6 w-6 border border-gray-100">
                  <AvatarImage
                    src={application.logoUrl}
                    alt={application.companyName}
                  />
                  <AvatarFallback className="bg-blue-50 text-blue-600 text-xs">
                    {application.companyName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-[#1d1d1f]">
                  {application.companyName}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 mb-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>{application.location}</span>
                <span className="mx-1">•</span>
                <span className="font-medium">{contractType}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 mb-4 text-sm">
                <Calendar className="h-4 w-4" />
                <span>Publié {getTimeAgo(application.date)}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="text-xs font-medium bg-gray-50 text-gray-600 px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              {application.status === "success" && (
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <Badge className="bg-green-50 text-green-700 border-0 hover:bg-green-100">
                    Candidature acceptée
                  </Badge>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedApplication && (
          <DialogContent className="sm:max-w-xl rounded-2xl border-0 shadow-xl overflow-hidden p-0">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-semibold text-[#1d1d1f] flex items-center gap-2">
                  {selectedApplication.position}
                  <span className="ml-2">
                    {getMatchingIndicator(selectedApplication.matchPercentage)}
                  </span>
                </DialogTitle>
                <DialogDescription className="text-base font-medium flex items-center gap-2 mt-2">
                  <Avatar className="h-6 w-6 border border-gray-100">
                    <AvatarImage
                      src={selectedApplication.logoUrl}
                      alt={selectedApplication.companyName}
                    />
                    <AvatarFallback className="bg-blue-50 text-blue-600 text-xs">
                      {selectedApplication.companyName
                        .substring(0, 2)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {selectedApplication.companyName}
                </DialogDescription>
              </DialogHeader>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-xl p-3 flex flex-col items-center justify-center">
                  <MapPin className="h-5 w-5 text-gray-500 mb-1" />
                  <span className="text-sm text-center">
                    {selectedApplication.location}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-xl p-3 flex flex-col items-center justify-center">
                  <Briefcase className="h-5 w-5 text-gray-500 mb-1" />
                  <span className="text-sm text-center">
                    {getContractType(selectedApplication.id)}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-xl p-3 flex flex-col items-center justify-center">
                  <Clock className="h-5 w-5 text-gray-500 mb-1" />
                  <span className="text-sm text-center">
                    {getTimeAgo(selectedApplication.date)}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3 text-[#1d1d1f]">
                  Compétences requises
                </h3>
                <div className="flex flex-wrap gap-2">
                  {getSkillTags(selectedApplication.position).map(
                    (skill, index) => (
                      <span
                        key={index}
                        className="text-sm font-medium bg-gray-50 text-gray-600 px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ),
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3 text-[#1d1d1f]">
                  Description du poste
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Nous recherchons un {selectedApplication.position} expérimenté
                  pour rejoindre notre équipe. Le candidat idéal aura une solide
                  expérience en développement et sera passionné par les
                  nouvelles technologies.
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => onViewDetails(selectedApplication.id)}
                  className="rounded-full border-0 bg-gray-100 hover:bg-gray-200 text-gray-700"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Voir détails
                </Button>
                <Button
                  onClick={() => onOpenExternal(selectedApplication.id)}
                  className="rounded-full bg-blue-600 hover:bg-blue-700"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Postuler
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default ApplicationsList;
