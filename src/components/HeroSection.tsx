import { useState } from "react";
import { toast } from "react-toastify";

export const HeroSection = () => {
  const [symptomInput, setSymptomInput] = useState("");

  const handleCheckNow = () => {
    if (!symptomInput.trim()) {
      toast.error("Please describe your symptom first");
      return;
    }

    try {
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      localStorage.setItem("symptomInput", symptomInput);
      if (!userData.email) {
        toast.error("Please login to continue");
        return;
      }

      localStorage.setItem("initialSymptom", symptomInput);

      window.location.href = "/chat";
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error);
      }
      toast.error("Please login to continue");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCheckNow();
    }
  };

  return (
    <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-8 leading-tight">
          AI-Powered Symptom Checker for Smarter Healthcare Triage
        </h1>

        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Understand your symptoms instantly. Our smart assistant guides
          patients to the right care path — General, Emergency, or Mental Health
          — reducing confusion, delays, and hospital overload.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-2 mb-10 text-sm font-medium text-coral-500">
          <span className="text-red-400">24/7 SUPPORT</span>
          <span className="text-gray-400">|</span>
          <span className="text-red-400">FREE CONSULTATION</span>
        </div>

        <div className="flex justify-center">
          <div className="flex flex-col sm:flex-row items-center gap-4 max-w-lg w-full">
            <div className="flex flex-col sm:flex-row items-center gap-3 flex-1">
              <input
                type="text"
                value={symptomInput}
                onChange={(e) => setSymptomInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-full text-gray-700 placeholder-gray-500 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-200 transition duration-200 w-full sm:w-auto"
                placeholder="Describe your symptom (e.g. chest pain, anxiety)"
              />
              <button
                onClick={handleCheckNow}
                className="bg-red-400 hover:bg-red-500 text-white font-semibold py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap"
              >
                Check Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
