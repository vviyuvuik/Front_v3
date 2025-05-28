import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  FileUp,
  CheckCircle,
  AlertCircle,
  File,
  FilePlus,
  Trash2,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface DocumentUploadProps {
  onUpload?: (type: string, file: File) => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  onUpload = () => {},
}) => {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [coverLetterFile, setCoverLetterFile] = useState<File | null>(null);
  const [uploadingCV, setUploadingCV] = useState(false);
  const [uploadingCL, setUploadingCL] = useState(false);
  const { toast } = useToast();

  const handleCVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCvFile(file);
      setUploadingCV(true);

      // Simulate upload process
      setTimeout(() => {
        setUploadingCV(false);
        onUpload("cv", file);
        toast({
          title: "CV téléchargé avec succès",
          description: `${file.name} a été ajouté à votre profil`,
        });
      }, 1500);
    }
  };

  const handleCoverLetterUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverLetterFile(file);
      setUploadingCL(true);

      // Simulate upload process
      setTimeout(() => {
        setUploadingCL(false);
        onUpload("coverLetter", file);
        toast({
          title: "Lettre de motivation téléchargée",
          description: `${file.name} a été ajoutée à votre profil`,
        });
      }, 1500);
    }
  };

  const handleRemoveCV = () => {
    setCvFile(null);
    toast({
      title: "CV supprimé",
      description: "Votre CV a été supprimé de votre profil",
    });
  };

  const handleRemoveCoverLetter = () => {
    setCoverLetterFile(null);
    toast({
      title: "Lettre de motivation supprimée",
      description: "Votre lettre de motivation a été supprimée de votre profil",
    });
  };

  return (
    <div className="bg-[#F5F5F7] min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="w-full bg-[#0A1F38] text-white p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                <FileUp className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold">Mes Documents</h1>
                <p className="text-white/80">
                  Gérez vos CV et lettres de motivation
                </p>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="cv" className="w-full">
          <TabsList className="mb-6 bg-white p-1 rounded-xl shadow-sm border border-[#F5F5F7]">
            <TabsTrigger
              value="cv"
              className="rounded-lg data-[state=active]:bg-[#F5F5F7] data-[state=active]:shadow-sm data-[state=active]:text-[#0071E3]"
            >
              CV
            </TabsTrigger>
            <TabsTrigger
              value="coverLetter"
              className="rounded-lg data-[state=active]:bg-[#F5F5F7] data-[state=active]:shadow-sm data-[state=active]:text-[#0071E3]"
            >
              Lettres de motivation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cv" className="mt-0">
            <Card className="border-none rounded-2xl shadow-sm overflow-hidden bg-white">
              <CardHeader className="pb-2 bg-gradient-to-r from-[#0071E3] to-[#40AAFF] text-white">
                <CardTitle className="text-lg font-medium">Mon CV</CardTitle>
                <CardDescription className="text-white/80">
                  Téléchargez votre CV pour postuler automatiquement
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {!cvFile ? (
                  <div className="border-2 border-dashed border-[#E5E5E5] rounded-xl p-8 text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-[#F5F5F7] flex items-center justify-center mb-4">
                      <FilePlus className="h-6 w-6 text-[#0071E3]" />
                    </div>
                    <h3 className="text-lg font-medium text-[#1D1D1F] mb-2">
                      Déposez votre CV ici
                    </h3>
                    <p className="text-[#86868B] mb-6">
                      Formats acceptés: PDF, DOCX, RTF (max 5MB)
                    </p>
                    <div className="flex justify-center">
                      <Label htmlFor="cv-upload" className="cursor-pointer">
                        <div className="bg-[#0071E3] text-white px-4 py-2 rounded-full hover:bg-[#0071E3]/90 transition-colors flex items-center gap-2">
                          <FileUp className="h-4 w-4" />
                          Parcourir les fichiers
                        </div>
                        <Input
                          id="cv-upload"
                          type="file"
                          accept=".pdf,.docx,.rtf"
                          className="hidden"
                          onChange={handleCVUpload}
                        />
                      </Label>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#F5F5F7] rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#E3F2FD] flex items-center justify-center">
                          <File className="h-5 w-5 text-[#0071E3]" />
                        </div>
                        <div>
                          <p className="font-medium text-[#1D1D1F]">
                            {cvFile.name}
                          </p>
                          <p className="text-sm text-[#86868B]">
                            {(cvFile.size / 1024 / 1024).toFixed(2)} MB •{" "}
                            {new Date().toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      {uploadingCV ? (
                        <div className="flex items-center gap-2 text-[#0071E3]">
                          <div className="animate-spin h-4 w-4 border-2 border-[#0071E3] border-t-transparent rounded-full"></div>
                          <span>Téléchargement...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-[#FF3B30] hover:bg-[#FF3B30]/10 hover:text-[#FF3B30] rounded-full"
                            onClick={handleRemoveCV}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Supprimer
                          </Button>
                          <div className="flex items-center gap-1 text-[#34C759]">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-sm">Téléchargé</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <h4 className="font-medium text-[#1D1D1F] mb-2">
                    Conseils pour votre CV
                  </h4>
                  <ul className="space-y-2 text-sm text-[#86868B]">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#34C759] mt-0.5" />
                      <span>Utilisez un format clair et lisible</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#34C759] mt-0.5" />
                      <span>Mettez en avant vos compétences techniques</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#34C759] mt-0.5" />
                      <span>
                        Incluez des mots-clés pertinents pour votre secteur
                      </span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="coverLetter" className="mt-0">
            <Card className="border-none rounded-2xl shadow-sm overflow-hidden bg-white">
              <CardHeader className="pb-2 bg-gradient-to-r from-[#5E5CE6] to-[#9198E5] text-white">
                <CardTitle className="text-lg font-medium">
                  Mes lettres de motivation
                </CardTitle>
                <CardDescription className="text-white/80">
                  Personnalisez vos candidatures avec une lettre de motivation
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {!coverLetterFile ? (
                  <div className="border-2 border-dashed border-[#E5E5E5] rounded-xl p-8 text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-[#F5F5F7] flex items-center justify-center mb-4">
                      <FilePlus className="h-6 w-6 text-[#5E5CE6]" />
                    </div>
                    <h3 className="text-lg font-medium text-[#1D1D1F] mb-2">
                      Déposez votre lettre de motivation
                    </h3>
                    <p className="text-[#86868B] mb-6">
                      Formats acceptés: PDF, DOCX, RTF (max 5MB)
                    </p>
                    <div className="flex justify-center">
                      <Label htmlFor="cl-upload" className="cursor-pointer">
                        <div className="bg-[#5E5CE6] text-white px-4 py-2 rounded-full hover:bg-[#5E5CE6]/90 transition-colors flex items-center gap-2">
                          <FileUp className="h-4 w-4" />
                          Parcourir les fichiers
                        </div>
                        <Input
                          id="cl-upload"
                          type="file"
                          accept=".pdf,.docx,.rtf"
                          className="hidden"
                          onChange={handleCoverLetterUpload}
                        />
                      </Label>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#F5F5F7] rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#EDE7F6] flex items-center justify-center">
                          <File className="h-5 w-5 text-[#5E5CE6]" />
                        </div>
                        <div>
                          <p className="font-medium text-[#1D1D1F]">
                            {coverLetterFile.name}
                          </p>
                          <p className="text-sm text-[#86868B]">
                            {(coverLetterFile.size / 1024 / 1024).toFixed(2)} MB
                            • {new Date().toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      {uploadingCL ? (
                        <div className="flex items-center gap-2 text-[#5E5CE6]">
                          <div className="animate-spin h-4 w-4 border-2 border-[#5E5CE6] border-t-transparent rounded-full"></div>
                          <span>Téléchargement...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-[#FF3B30] hover:bg-[#FF3B30]/10 hover:text-[#FF3B30] rounded-full"
                            onClick={handleRemoveCoverLetter}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Supprimer
                          </Button>
                          <div className="flex items-center gap-1 text-[#34C759]">
                            <CheckCircle className="h-4 w-4" />
                            <span className="text-sm">Téléchargé</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <h4 className="font-medium text-[#1D1D1F] mb-2">
                    Conseils pour votre lettre de motivation
                  </h4>
                  <ul className="space-y-2 text-sm text-[#86868B]">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#34C759] mt-0.5" />
                      <span>
                        Personnalisez votre lettre pour chaque entreprise
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#34C759] mt-0.5" />
                      <span>
                        Expliquez pourquoi vous êtes le candidat idéal
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#34C759] mt-0.5" />
                      <span>Montrez votre connaissance de l'entreprise</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DocumentUpload;
