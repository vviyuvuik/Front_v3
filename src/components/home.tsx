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
import { ArrowRight, CheckCircle } from "lucide-react";

const Home = () => {
  const [currentStep, setCurrentStep] = useState<
    "auth" | "criteria" | "dashboard"
  >("auth");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFranceTravailConnected, setIsFranceTravailConnected] =
    useState(false);
  const [criteriaCompleted, setCriteriaCompleted] = useState(false);

  // Handle successful authentication
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setCurrentStep("criteria");
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
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">JobAutomate</h1>
          {isAuthenticated && (
            <Button
              variant="ghost"
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
          <div className="mb-8">
            <div className="flex items-center justify-center max-w-3xl mx-auto">
              <div
                className={`flex items-center ${isAuthenticated ? "text-primary" : "text-slate-600"}`}
              >
                <div className="rounded-full bg-primary text-white w-8 h-8 flex items-center justify-center">
                  {isAuthenticated ? <CheckCircle size={16} /> : "1"}
                </div>
                <span className="ml-2 font-medium">Authentification</span>
              </div>

              <div className="w-16 h-1 mx-2 bg-slate-200">
                {isAuthenticated && <div className="h-full bg-primary" />}
              </div>

              <div
                className={`flex items-center ${isFranceTravailConnected ? "text-primary" : "text-slate-600"}`}
              >
                <div
                  className={`rounded-full w-8 h-8 flex items-center justify-center ${currentStep === "criteria" ? "bg-primary text-white" : "bg-slate-200"}`}
                >
                  {isFranceTravailConnected ? <CheckCircle size={16} /> : "2"}
                </div>
                <span className="ml-2 font-medium">
                  Connexion France Travail
                </span>
              </div>

              <div className="w-16 h-1 mx-2 bg-slate-200">
                {isFranceTravailConnected && (
                  <div className="h-full bg-primary" />
                )}
              </div>

              <div
                className={`flex items-center ${criteriaCompleted ? "text-primary" : "text-slate-600"}`}
              >
                <div
                  className={`rounded-full w-8 h-8 flex items-center justify-center ${criteriaCompleted ? "bg-primary text-white" : "bg-slate-200"}`}
                >
                  {criteriaCompleted ? <CheckCircle size={16} /> : "3"}
                </div>
                <span className="ml-2 font-medium">Critères de recherche</span>
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
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle>Bienvenue sur JobAutomate</CardTitle>
                <CardDescription>
                  Automatisez vos candidatures sur France Travail
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AuthForms onAuthSuccess={handleAuthSuccess} />
              </CardContent>
            </Card>
          )}

          {currentStep === "criteria" && (
            <Card className="max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle>Configuration de votre recherche</CardTitle>
                <CardDescription>
                  {!isFranceTravailConnected
                    ? "Connectez votre compte France Travail pour commencer"
                    : "Définissez vos critères de recherche d'emploi"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!isFranceTravailConnected ? (
                  <div className="space-y-4">
                    <p className="text-sm text-slate-600">
                      Pour automatiser vos candidatures, nous avons besoin de
                      nous connecter à votre compte France Travail.
                    </p>
                    <Button
                      onClick={handleFranceTravailConnect}
                      className="w-full"
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

          {currentStep === "dashboard" && <Dashboard />}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 px-6 mt-auto">
        <div className="container mx-auto text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} JobAutomate - Tous droits réservés
        </div>
      </footer>
    </div>
  );
};

export default Home;
