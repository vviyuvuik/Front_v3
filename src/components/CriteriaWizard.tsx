import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MapPin,
  Briefcase,
  Calendar,
  Clock,
} from "lucide-react";

interface CriteriaWizardProps {
  onComplete?: (criteria: JobCriteria) => void;
  initialCriteria?: JobCriteria;
}

interface JobCriteria {
  jobType: string;
  location: string;
  distance: number;
  contractType: string;
  workSchedule: string;
  experience: string;
  keywords: string[];
  remoteWork: boolean;
}

const CriteriaWizard: React.FC<CriteriaWizardProps> = ({
  onComplete = () => {},
  initialCriteria = {
    jobType: "",
    location: "",
    distance: 10,
    contractType: "",
    workSchedule: "",
    experience: "",
    keywords: [],
    remoteWork: false,
  },
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [criteria, setCriteria] = useState<JobCriteria>(initialCriteria);
  const [keyword, setKeyword] = useState("");

  const steps = [
    {
      title: "Type de métier",
      description: "Sélectionnez votre domaine professionnel",
    },
    { title: "Localisation", description: "Où souhaitez-vous travailler?" },
    {
      title: "Type de contrat",
      description: "Quel type de contrat recherchez-vous?",
    },
    { title: "Autres préférences", description: "Affinez votre recherche" },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(criteria);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateCriteria = (key: keyof JobCriteria, value: any) => {
    setCriteria((prev) => ({ ...prev, [key]: value }));
  };

  const addKeyword = () => {
    if (keyword && !criteria.keywords.includes(keyword)) {
      updateCriteria("keywords", [...criteria.keywords, keyword]);
      setKeyword("");
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    updateCriteria(
      "keywords",
      criteria.keywords.filter((k) => k !== keywordToRemove),
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Job Type
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-6">
              <Briefcase className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-medium">
                Sélectionnez votre domaine professionnel
              </h3>
            </div>

            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="jobType">Métier ou domaine</Label>
                <Input
                  id="jobType"
                  placeholder="Ex: Développeur web, Marketing, Comptabilité..."
                  value={criteria.jobType}
                  onChange={(e) => updateCriteria("jobType", e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label>Mots-clés</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Ajouter un mot-clé"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addKeyword()}
                  />
                  <Button type="button" onClick={addKeyword}>
                    Ajouter
                  </Button>
                </div>

                {criteria.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {criteria.keywords.map((kw, i) => (
                      <div
                        key={i}
                        className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full flex items-center gap-2"
                      >
                        {kw}
                        <button
                          onClick={() => removeKeyword(kw)}
                          className="text-secondary-foreground/70 hover:text-secondary-foreground"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 1: // Location
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-6">
              <MapPin className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-medium">
                Où souhaitez-vous travailler?
              </h3>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="location">Ville ou code postal</Label>
                <Input
                  id="location"
                  placeholder="Ex: Paris, 75001, Lyon..."
                  value={criteria.location}
                  onChange={(e) => updateCriteria("location", e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="distance">Distance maximale</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="distance"
                    type="range"
                    min="0"
                    max="100"
                    value={criteria.distance}
                    onChange={(e) =>
                      updateCriteria("distance", parseInt(e.target.value))
                    }
                    className="w-full"
                  />
                  <span className="w-16 text-right">
                    {criteria.distance} km
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="remoteWork"
                  checked={criteria.remoteWork}
                  onCheckedChange={(checked) =>
                    updateCriteria("remoteWork", checked)
                  }
                />
                <Label htmlFor="remoteWork">Télétravail possible</Label>
              </div>
            </div>
          </div>
        );

      case 2: // Contract Type
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-6">
              <Calendar className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-medium">
                Quel type de contrat recherchez-vous?
              </h3>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="contractType">Type de contrat</Label>
                <Select
                  value={criteria.contractType}
                  onValueChange={(value) =>
                    updateCriteria("contractType", value)
                  }
                >
                  <SelectTrigger id="contractType">
                    <SelectValue placeholder="Sélectionnez un type de contrat" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cdi">CDI</SelectItem>
                    <SelectItem value="cdd">CDD</SelectItem>
                    <SelectItem value="interim">Intérim</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                    <SelectItem value="apprentissage">
                      Apprentissage / Alternance
                    </SelectItem>
                    <SelectItem value="stage">Stage</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="workSchedule">Horaires de travail</Label>
                <RadioGroup
                  value={criteria.workSchedule}
                  onValueChange={(value) =>
                    updateCriteria("workSchedule", value)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fulltime" id="fulltime" />
                    <Label htmlFor="fulltime">Temps plein</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="parttime" id="parttime" />
                    <Label htmlFor="parttime">Temps partiel</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="flexible" id="flexible" />
                    <Label htmlFor="flexible">Horaires flexibles</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="any" id="any" />
                    <Label htmlFor="any">Peu importe</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 3: // Other Preferences
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-6">
              <Clock className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-medium">Affinez votre recherche</h3>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="experience">Niveau d'expérience</Label>
                <Select
                  value={criteria.experience}
                  onValueChange={(value) => updateCriteria("experience", value)}
                >
                  <SelectTrigger id="experience">
                    <SelectValue placeholder="Sélectionnez un niveau d'expérience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="debutant">Débutant</SelectItem>
                    <SelectItem value="junior">Junior (1-3 ans)</SelectItem>
                    <SelectItem value="intermediaire">
                      Intermédiaire (3-5 ans)
                    </SelectItem>
                    <SelectItem value="senior">Senior (5-10 ans)</SelectItem>
                    <SelectItem value="expert">Expert (10+ ans)</SelectItem>
                    <SelectItem value="any">Tous niveaux</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4">
                <h4 className="text-sm font-medium mb-2">
                  Récapitulatif de vos critères
                </h4>
                <div className="bg-muted p-4 rounded-md space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Métier:</span>
                    <span className="font-medium">
                      {criteria.jobType || "Non spécifié"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Localisation:</span>
                    <span className="font-medium">
                      {criteria.location || "Non spécifié"} ({criteria.distance}{" "}
                      km)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Type de contrat:
                    </span>
                    <span className="font-medium">
                      {criteria.contractType
                        ? criteria.contractType.toUpperCase()
                        : "Non spécifié"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Horaires:</span>
                    <span className="font-medium">
                      {criteria.workSchedule || "Non spécifié"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Expérience:</span>
                    <span className="font-medium">
                      {criteria.experience || "Non spécifié"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Télétravail:</span>
                    <span className="font-medium">
                      {criteria.remoteWork ? "Oui" : "Non"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-background">
      <CardHeader>
        <CardTitle>Configuration des critères de recherche</CardTitle>
        <CardDescription>
          Définissez vos préférences pour la recherche automatique d'emploi
        </CardDescription>
        <Progress
          value={((currentStep + 1) / steps.length) * 100}
          className="mt-2"
        />
      </CardHeader>

      <CardContent>
        <div className="flex justify-between mb-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col items-center ${index <= currentStep ? "text-primary" : "text-muted-foreground"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${index <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                {index < currentStep ? (
                  <Check className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
              <span className="text-xs text-center">{step.title}</span>
            </div>
          ))}
        </div>

        <Separator className="mb-6" />

        {renderStepContent()}
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Précédent
        </Button>

        <Button onClick={handleNext}>
          {currentStep < steps.length - 1 ? (
            <>
              Suivant <ArrowRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            "Terminer"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CriteriaWizard;
