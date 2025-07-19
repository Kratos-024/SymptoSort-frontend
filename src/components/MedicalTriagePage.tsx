/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  Stethoscope,
  AlertCircle,
  Brain,
  Loader2,
  Download,
} from "lucide-react";
import { classifySymptom, type ClassifySymptomResponse } from "../api/modelApi";

interface TriageResult {
  category: string;
  message: string;
  recommendation: string;
  urgency: string;
  hospital: string;
  icon: React.ComponentType<any>;
  color: string;
}

export default function MedicalTriagePage() {
  const [symptom, setSymptom] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<TriageResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!symptom.trim()) {
      alert("Please enter your symptom");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const apiResponse: ClassifySymptomResponse = await classifySymptom(
        symptom
      );

      const triageResult: TriageResult = {
        category: apiResponse.category,
        message: apiResponse.answer,
        recommendation: apiResponse.recommendation,
        urgency: apiResponse.urgency,
        hospital: apiResponse.hospital,
        ...getResultDisplay(apiResponse.category),
      };

      setResult(triageResult);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      console.error("Error classifying symptom:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const getResultDisplay = (category: string) => {
    const lowerCategory = category.toLowerCase();

    if (lowerCategory.includes("emergency")) {
      return {
        icon: AlertCircle,
        color: "red",
      };
    } else if (lowerCategory.includes("mental")) {
      return {
        icon: Brain,
        color: "purple",
      };
    } else {
      return {
        icon: Stethoscope,
        color: "blue",
      };
    }
  };

  const resetForm = () => {
    setSymptom("");
    setResult(null);
    setError(null);
  };

  const downloadReport = () => {
    if (!result) return;

    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const reportContent = `
                                    SymptoSort REPORT
                                   
${result.message}

Classification: ${result.category}
Recommendation: ${result.recommendation}
Urgency Level: ${result.urgency}
Hospital: ${result.hospital}
Date of Assessment: ${currentDate}
Symptom Reported: ${symptom}

This is an automated triage assessment. Please consult with medical professionals for proper diagnosis and treatment.

---
SymptoSort Medical System
Powered by Agentic AI
    `.trim();

    const element = document.createElement("a");
    const file = new Blob([reportContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `Medical_Report_${
      new Date().toISOString().split("T")[0]
    }.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getResultStyles = (color: string) => {
    const styles = {
      red: "bg-red-50 border-red-200 text-red-800",
      purple: "bg-purple-50 border-purple-200 text-purple-800",
      blue: "bg-blue-50 border-blue-200 text-blue-800",
    };
    return styles[color as keyof typeof styles] || styles.blue;
  };

  const getUrgencyColor = (urgency: string) => {
    const lower = urgency.toLowerCase();
    if (lower.includes("critical") || lower.includes("high"))
      return "text-red-600";
    if (lower.includes("medium")) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <img className="w-[30%]" src="./images/logo.png" alt="Logo" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">SymptoSort</h1>
          <p className="text-xl text-gray-600">Medical Triage System</p>
          <p className="text-gray-500 mt-2">
            Describe your symptoms to get directed to the right care
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {!result ? (
            <div className="rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Welcome! Please describe your symptoms
              </h2>

              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="symptom"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    What symptoms are you experiencing?
                  </label>
                  <textarea
                    id="symptom"
                    value={symptom}
                    onChange={(e) => setSymptom(e.target.value)}
                    placeholder="Please describe your symptoms in detail..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={4}
                    disabled={isProcessing}
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <span className="text-red-800 font-medium">Error</span>
                    </div>
                    <p className="text-red-700 mt-1">{error}</p>
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="w-full cursor-pointer bg-gray-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing symptoms...
                    </>
                  ) : (
                    <>Submit Symptoms</>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div
                className={`rounded-xl border-2 p-8 ${getResultStyles(
                  result.color
                )}`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`p-3 rounded-full ${
                      result.color === "red"
                        ? "bg-red-100"
                        : result.color === "purple"
                        ? "bg-purple-100"
                        : "bg-blue-100"
                    }`}
                  >
                    <result.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{result.category}</h3>
                    <p className="text-sm opacity-75">Classification Result</p>
                  </div>
                </div>

                <p className="text-lg leading-relaxed mb-4">{result.message}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-current border-opacity-20">
                  <div>
                    <span className="font-semibold">Recommendation:</span>
                    <p className="text-sm mt-1">{result.recommendation}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Urgency Level:</span>
                    <p
                      className={`text-sm mt-1 font-medium ${getUrgencyColor(
                        result.urgency
                      )}`}
                    >
                      {result.urgency}
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold">Hospital:</span>
                    <p className="text-sm mt-1">{result.hospital}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={resetForm}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Enter New Symptoms
                </button>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={downloadReport}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Medical Report
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          <div className="p-6 rounded-lg text-center">
            <Stethoscope className="w-12 h-12 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Smart Escalation</h3>
            <p className="text-sm">
              Sends urgent symptoms to real doctors or emergency lines when
              needed.
            </p>
          </div>

          <div className="flex items-center flex-col gap-4 p-6 rounded-lg text-center">
            <svg
              className="w-8 h-8 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <h3 className="font-semibold mb-2">Fast Symptom Sorting</h3>
            <p className="text-sm">
              Quickly sorts your symptoms into General, Emergency, or Mental
              Health.
            </p>
          </div>

          <div className="flex items-center flex-col gap-4 p-6 rounded-lg text-center">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <h3 className="font-semibold mb-2">Your Info Stays Private</h3>
            <p className="text-sm">
              We keep your health details safe and only use them to help you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
