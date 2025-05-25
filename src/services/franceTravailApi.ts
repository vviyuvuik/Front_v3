/**
 * France Travail API Service
 * Handles authentication, job search, and application submission functionality
 */
import { toast } from "@/components/ui/use-toast";

// API endpoints
const AUTH_URL =
  "https://francetravail.io/connexion/oauth2/access_token?realm=%2Fpartenaire";
const SEARCH_URL =
  "https://api.francetravail.io/partenaire/offresdemploi/v2/offres/search";

// Credentials
const CLIENT_ID = "PAR_cv_99475f5...";
const CLIENT_SECRET = "a05639aa90c3...";

// Types
export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export interface JobOffer {
  id: string;
  intitule: string;
  description?: string;
  dateCreation: string;
  lieuTravail: {
    libelle: string;
    commune?: string;
    codePostal?: string;
  };
  entreprise?: {
    nom: string;
  };
  typeContrat: string;
  salaire?: {
    libelle: string;
  };
  contact?: any;
  urlPostulation?: string;
}

export interface JobSearchResponse {
  resultats: JobOffer[];
  filtresPossibles?: any[];
  codeResultat?: string;
  nbResultats?: number;
}

export interface JobSearchParams {
  motsCles?: string;
  commune?: string;
  distance?: number;
  typeContrat?: string;
  experience?: string;
  qualification?: string;
  tempsPlein?: boolean;
  page?: number;
  range?: number;
}

export interface ApplicationSubmissionParams {
  offerId: string;
  candidateId: string;
  cv?: File;
  coverLetter?: string;
}

/**
 * Get an access token from France Travail API
 */
export async function getAccessToken(): Promise<string> {
  const payload = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: "client_credentials",
    scope: "o2dsoffre api_offresdemploiv2",
  });

  try {
    const response = await fetch(AUTH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload,
    });

    if (!response.ok) {
      const errorMsg = `Échec d'authentification: ${response.status}`;
      toast({
        title: "Erreur d'authentification",
        description: errorMsg,
        variant: "destructive",
      });
      throw new Error(errorMsg);
    }

    toast({
      title: "Authentification réussie",
      description: "Connexion à France Travail établie",
    });

    const data: AuthResponse = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Error getting access token:", error);
    throw error;
  }
}

/**
 * Search for job offers
 */
export async function searchJobOffers(
  params: JobSearchParams = {},
): Promise<JobSearchResponse> {
  try {
    const token = await getAccessToken();

    // Build query parameters
    const queryParams = new URLSearchParams();

    if (params.motsCles) queryParams.append("motsCles", params.motsCles);
    if (params.commune) queryParams.append("commune", params.commune);
    if (params.distance)
      queryParams.append("distance", params.distance.toString());
    if (params.typeContrat)
      queryParams.append("typeContrat", params.typeContrat);
    if (params.experience) queryParams.append("experience", params.experience);
    if (params.qualification)
      queryParams.append("qualification", params.qualification);
    if (params.tempsPlein !== undefined)
      queryParams.append("tempsPlein", params.tempsPlein.toString());
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.range) queryParams.append("range", params.range.toString());

    const url = `${SEARCH_URL}?${queryParams.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok && response.status !== 206) {
      const errorMsg = `Échec de la recherche d'emploi: ${response.status}`;
      toast({
        title: "Erreur de recherche",
        description: errorMsg,
        variant: "destructive",
      });
      throw new Error(errorMsg);
    }

    toast({
      title: "Recherche réussie",
      description: "Offres d'emploi récupérées avec succès",
    });

    return await response.json();
  } catch (error) {
    console.error("Error searching job offers:", error);
    throw error;
  }
}

/**
 * Submit an application for a job offer
 * Note: This is a placeholder implementation as the actual endpoint wasn't provided
 */
export async function submitApplication(
  params: ApplicationSubmissionParams,
): Promise<any> {
  try {
    const token = await getAccessToken();

    // This is a placeholder URL - you'll need to replace with the actual endpoint
    const applicationUrl = `https://api.francetravail.io/partenaire/offresdemploi/v2/offres/${params.offerId}/candidatures`;

    // Create form data for file upload
    const formData = new FormData();
    formData.append("candidateId", params.candidateId);

    if (params.cv) {
      formData.append("cv", params.cv);
    }

    if (params.coverLetter) {
      formData.append("coverLetter", params.coverLetter);
    }

    const response = await fetch(applicationUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // Note: Don't set Content-Type when using FormData, browser will set it automatically
      },
      body: formData,
    });

    if (!response.ok) {
      const errorMsg = `Échec de l'envoi de candidature: ${response.status}`;
      toast({
        title: "Erreur de candidature",
        description: errorMsg,
        variant: "destructive",
      });
      throw new Error(errorMsg);
    }

    toast({
      title: "Candidature envoyée",
      description: "Votre candidature a été soumise avec succès",
    });

    return await response.json();
  } catch (error) {
    console.error("Error submitting application:", error);
    throw error;
  }
}

/**
 * Get details for a specific job offer
 */
export async function getJobOfferDetails(offerId: string): Promise<JobOffer> {
  try {
    const token = await getAccessToken();

    const url = `https://api.francetravail.io/partenaire/offresdemploi/v2/offres/${offerId}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorMsg = `Échec de récupération des détails de l'offre: ${response.status}`;
      toast({
        title: "Erreur de récupération",
        description: errorMsg,
        variant: "destructive",
      });
      throw new Error(errorMsg);
    }

    toast({
      title: "Détails récupérés",
      description: "Détails de l'offre d'emploi récupérés avec succès",
    });

    return await response.json();
  } catch (error) {
    console.error("Error getting job offer details:", error);
    throw error;
  }
}
