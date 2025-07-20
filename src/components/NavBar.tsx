/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { Account } from "./SignUp";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase/app";
import { toast } from "react-toastify";

const auth = getAuth(app);

interface UserData {
  email: string;
  username: string;
  userLoggedIn: boolean;
  uid: string;
}

const UserMenu = ({
  userData,
  onLogout,
}: {
  userData: UserData;
  onLogout: () => void;
}) => {
  return (
    <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg border border-gray-200 py-2 w-64 z-50">
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#1AB9F4] rounded-full flex items-center justify-center text-white font-semibold">
            {userData.username
              ? userData.username[0].toUpperCase()
              : userData.email[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {userData.username || "User"}
            </p>
            <p className="text-sm text-gray-500 truncate">{userData.email}</p>
          </div>
        </div>
      </div>

      <div className="py-1">
        <button
          onClick={onLogout}
          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition duration-200"
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signUp">("login");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("userData");
      }
    }
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const newUserData: UserData = {
          email: user.email || "",
          username: user.displayName || "",
          userLoggedIn: true,
          uid: user.uid,
        };
        setUserData(newUserData);
        localStorage.setItem("userData", JSON.stringify(newUserData));
      } else {
        setUserData(null);
        localStorage.removeItem("userData");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAuthClick = (mode: "login" | "signUp") => {
    setAuthMode(mode);
    setShowModal(true);
    setShowMobileMenu(false);
  };

  const closeModal = (show: boolean) => {
    setShowModal(show);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserData(null);
      setShowUserMenu(false);
      setShowMobileMenu(false);
      localStorage.removeItem("userData");

      toast.success("Successfully logged out", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } catch (error: any) {
      toast.error("Error logging out: " + error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".user-menu-container")) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [showUserMenu]);

  return (
    <>
      <nav className="bg-white/50 shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <div className="w-[96px] h-[96px] rounded-lg flex items-center justify-center">
                  <img src="./images/logo.png" alt="Logo" />
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <span className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium cursor-pointer">
                  <a href="/"> Home</a>
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

            <div className="flex items-center space-x-3">
              {userData && userData.userLoggedIn ? (
                <div className="relative  max-md:hidden user-menu-container">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
                  >
                    <div className="w-8 h-8 bg-[#1AB9F4] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {userData.username
                        ? userData.username[0].toUpperCase()
                        : userData.email[0].toUpperCase()}
                    </div>
                    <span className="text-sm font-medium hidden md:block">
                      {userData.username || userData.email.split("@")[0]}
                    </span>
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        showUserMenu ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {showUserMenu && (
                    <UserMenu userData={userData} onLogout={handleLogout} />
                  )}
                </div>
              ) : (
                <div className=" max-md:hidden space-x-4">
                  <button
                    onClick={() => handleAuthClick("login")}
                    className="text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-gray-400 font-medium py-2 px-4 rounded-md text-sm transition duration-200 ease-in-out transform hover:scale-105"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleAuthClick("signUp")}
                    className="bg-[#1AB9F4] hover:bg-[#0da6e0] text-white font-medium py-2 px-4 rounded-md text-sm transition duration-200 ease-in-out transform hover:scale-105"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>

            <div className="md:hidden ml-3">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900 p-2"
              >
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
                    d={
                      showMobileMenu
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {showMobileMenu && (
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

              {userData && userData.userLoggedIn ? (
                <div className="px-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-[#1AB9F4] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {userData.username
                        ? userData.username[0].toUpperCase()
                        : userData.email[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {userData.username || "User"}
                      </p>
                      <p className="text-xs text-gray-500">{userData.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition duration-200"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="flex space-x-3 px-3 pt-3">
                  <button
                    onClick={() => handleAuthClick("login")}
                    className="flex-1 text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-gray-400 font-medium py-2 px-4 rounded-md text-sm transition duration-200"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleAuthClick("signUp")}
                    className="flex-1 bg-[#1AB9F4] hover:bg-[#0da6e0] text-white font-medium py-2 px-4 rounded-md text-sm transition duration-200"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {showModal && <Account param={authMode} showModalSignUp={closeModal} />}
    </>
  );
};

export default Navbar;
