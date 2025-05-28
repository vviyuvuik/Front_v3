import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import AuthForms from "./AuthForms";
import CriteriaWizard from "./CriteriaWizard";
import Dashboard from "./Dashboard";
import DocumentUpload from "./DocumentUpload";
import { ArrowRight, CheckCircle } from "lucide-react";

const Home = () => {
  const [currentStep, setCurrentStep] = useState<
    "auth" | "criteria" | "dashboard"
  >("auth");
  const [currentView, setCurrentView] = useState<"dashboard" | "documents">(
    "dashboard",
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFranceTravailConnected, setIsFranceTravailConnected] =
    useState(false);
  const [criteriaCompleted, setCriteriaCompleted] = useState(false);

  // Handle successful authentication
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setTimeout(() => {
      setCurrentStep("criteria");
    }, 500); // Petit délai pour montrer la transition
  };

  // Handle France Travail connection
  const handleFranceTravailConnect = () => {
    setIsFranceTravailConnected(true);
  };

  // Handle criteria completion
  const handleCriteriaComplete = () => {
    setCriteriaCompleted(true);
    setCurrentStep("dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-[#E5E5E5] py-4 px-6 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold text-[#1D1D1F] tracking-tight mr-8">
              JobAutomate
            </h1>
            {isAuthenticated && currentStep === "dashboard" && (
              <nav className="hidden md:flex items-center space-x-6">
                <a
                  href="#"
                  className="text-[#1D1D1F] hover:text-[#0071E3] font-medium"
                >
                  Accueil
                </a>
                <a
                  href="#"
                  className="text-[#1D1D1F] hover:text-[#0071E3] font-medium"
                >
                  Recherche
                </a>
                <a
                  href="#"
                  onClick={() => setCurrentView("documents")}
                  className="text-[#1D1D1F] hover:text-[#0071E3] font-medium"
                >
                  Mes Documents
                </a>
                <a
                  href="#"
                  className="text-[#1D1D1F] hover:text-[#0071E3] font-medium"
                >
                  Paramètres
                </a>
              </nav>
            )}
          </div>
          {isAuthenticated && (
            <Button
              variant="ghost"
              className="rounded-full text-[#0071E3] hover:bg-[#F5F5F7] hover:text-[#0071E3]/90"
              onClick={() => {
                setIsAuthenticated(false);
                setIsFranceTravailConnected(false);
                setCriteriaCompleted(false);
                setCurrentStep("auth");
              }}
            >
              Déconnexion
            </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto py-8 px-4">
        {/* Progress Steps (visible only during onboarding) */}
        {currentStep !== "dashboard" && (
          <div className="mb-12">
            <div className="flex items-center justify-center max-w-3xl mx-auto">
              <div
                className={`flex flex-col items-center ${isAuthenticated ? "text-[#0071E3]" : "text-[#86868B]"}`}
              >
                <div
                  className={`rounded-full w-12 h-12 flex items-center justify-center shadow-sm ${isAuthenticated ? "bg-[#0071E3] text-white" : "bg-white border border-[#E5E5E5]"}`}
                >
                  {isAuthenticated ? <CheckCircle size={20} /> : "1"}
                </div>
                <span className="mt-2 text-sm font-medium tracking-tight">
                  Authentification
                </span>
              </div>

              <div className="w-24 h-[2px] mx-4 bg-[#E5E5E5] relative">
                {isAuthenticated && (
                  <div className="h-full bg-[#0071E3] absolute top-0 left-0 right-0" />
                )}
              </div>

              <div
                className={`flex flex-col items-center ${isFranceTravailConnected ? "text-[#0071E3]" : "text-[#86868B]"}`}
              >
                <div
                  className={`rounded-full w-12 h-12 flex items-center justify-center shadow-sm ${currentStep === "criteria" || isFranceTravailConnected ? "bg-[#0071E3] text-white" : "bg-white border border-[#E5E5E5]"}`}
                >
                  {isFranceTravailConnected ? <CheckCircle size={20} /> : "2"}
                </div>
                <span className="mt-2 text-sm font-medium tracking-tight">
                  Connexion France Travail
                </span>
              </div>

              <div className="w-24 h-[2px] mx-4 bg-[#E5E5E5] relative">
                {isFranceTravailConnected && (
                  <div className="h-full bg-[#0071E3] absolute top-0 left-0 right-0" />
                )}
              </div>

              <div
                className={`flex flex-col items-center ${criteriaCompleted ? "text-[#0071E3]" : "text-[#86868B]"}`}
              >
                <div
                  className={`rounded-full w-12 h-12 flex items-center justify-center shadow-sm ${criteriaCompleted ? "bg-[#0071E3] text-white" : "bg-white border border-[#E5E5E5]"}`}
                >
                  {criteriaCompleted ? <CheckCircle size={20} /> : "3"}
                </div>
                <span className="mt-2 text-sm font-medium tracking-tight">
                  Critères de recherche
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Content based on current step */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentStep === "auth" && (
            <Card className="max-w-md mx-auto border-none rounded-2xl shadow-sm overflow-hidden">
              <CardHeader className="pb-2 bg-gradient-to-r from-[#0071E3] to-[#40AAFF] text-white">
                <CardTitle className="text-xl font-medium tracking-tight">
                  Bienvenue sur JobAutomate
                </CardTitle>
                <CardDescription className="text-white/90 font-light">
                  Automatisez vos candidatures sur France Travail
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <AuthForms
                  onLogin={() => handleAuthSuccess()}
                  onRegister={() => handleAuthSuccess()}
                />
              </CardContent>
            </Card>
          )}

          {currentStep === "criteria" && (
            <Card className="max-w-3xl mx-auto border-none rounded-2xl shadow-sm overflow-hidden">
              <CardHeader className="pb-2 bg-gradient-to-r from-[#5E5CE6] to-[#9198E5] text-white">
                <CardTitle className="text-xl font-medium tracking-tight">
                  Configuration de votre recherche
                </CardTitle>
                <CardDescription className="text-white/90 font-light">
                  {!isFranceTravailConnected
                    ? "Connectez votre compte France Travail pour commencer"
                    : "Définissez vos critères de recherche d'emploi"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {!isFranceTravailConnected ? (
                  <div className="space-y-6">
                    <p className="text-[#1D1D1F] leading-relaxed">
                      Pour automatiser vos candidatures, nous avons besoin de
                      nous connecter à votre compte France Travail.
                    </p>
                    <Button
                      onClick={handleFranceTravailConnect}
                      className="w-full rounded-full bg-[#0071E3] hover:bg-[#0071E3]/90 text-white py-6"
                    >
                      Connecter mon compte France Travail
                      <ArrowRight className="ml-2" size={16} />
                    </Button>
                  </div>
                ) : (
                  <CriteriaWizard onComplete={handleCriteriaComplete} />
                )}
              </CardContent>
            </Card>
          )}

          {currentStep === "dashboard" && currentView === "dashboard" && (
            <Dashboard />
          )}
          {currentStep === "dashboard" && currentView === "documents" && (
            <DocumentUpload />
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#E5E5E5] py-4 px-6 mt-auto shadow-sm">
        <div className="container mx-auto text-center text-sm text-[#86868B]">
          &copy; {new Date().getFullYear()} JobAutomate - Tous droits réservés
        </div>
      </footer>
    </div>
  );
};

export default Home;
