const Navbar = () => {
  return (
    <nav className="bg-/50 shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <div className="w-[96px]  h-[96px] ue-600 rounded-lg flex items-center justify-center">
                <img src="./images/logo.png" />
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <span className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                Home
              </span>
              <span className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                About
              </span>
              <span className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                Services
              </span>
              <span className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                Contact
              </span>
            </div>
          </div>

          {/* Sign Up Button - Right */}
          <div className="flex items-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md text-sm transition duration-200 ease-in-out transform hover:scale-105">
              Sign Up
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900 p-2">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu (you can add state to toggle this) */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
          <span className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">
            Home
          </span>
          <span className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">
            About
          </span>
          <span className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">
            Services
          </span>
          <span className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">
            Contact
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
