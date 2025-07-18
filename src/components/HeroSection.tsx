export const HeroSection = () => {
  return (
    <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-8 leading-tight">
          Chatbots built exclusively for healthcare
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Engage, inform, and guide patients to start their 5-star experience.
          Improve the support experience of new and existing patients while
          reducing call center load & wait times.
        </p>

        {/* Features Tags */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-10 text-sm font-medium text-coral-500">
          <span className="text-red-400">INTEGRATION SUPPORT</span>
          <span className="text-gray-400">|</span>
          <span className="text-red-400">FREE CONSULTATION</span>
          <span className="text-gray-400">|</span>
          <span className="text-red-400">TRY FOR 30 DAYS</span>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col sm:flex-row items-center gap-3 max-w-md w-full">
            <input
              type="email"
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-full text-gray-700 placeholder-gray-500 focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-200 transition duration-200 w-full sm:w-auto"
              placeholder="Enter your email"
            />
            <button className="bg-red-400 hover:bg-red-500 text-white font-semibold py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
