import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface ClassifySymptomRequest {
  symptom: string;
}

export interface ClassifySymptomResponse {
  answer: string;
  category: string;
  hospital: string;
  recommendation: string;
  status: string;
  symptom: string;
  urgency: string;
}

export interface HealthCheckResponse {
  status: string;
  service: string;
  hospital: string;
}

export interface ApiError {
  error: string;
  status: string;
}

class MedicalApiHandler {
  async classifySymptom(symptom: string): Promise<ClassifySymptomResponse> {
    try {
      const requestData: ClassifySymptomRequest = {
        symptom: symptom.trim(),
      };

      const response = await apiClient.post<ClassifySymptomResponse>(
        "/classify-symptom",
        requestData
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const apiError = error.response.data as ApiError;
          throw new Error(
            `API Error: ${apiError.error || "Unknown server error"}`
          );
        } else if (error.request) {
          throw new Error(
            "Network Error: Unable to connect to the medical API. Please check if the server is running."
          );
        } else {
          throw new Error(`Request Error: ${error.message}`);
        }
      }

      throw new Error(
        `Unexpected Error: ${
          error instanceof Error ? error.message : "Unknown error occurred"
        }`
      );
    }
  }
}

export const medicalApi = new MedicalApiHandler();

export const classifySymptom = (symptom: string) =>
  medicalApi.classifySymptom(symptom);
