/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { MdEmail, MdOutlineCancel, MdLock, MdPerson } from "react-icons/md";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  updateProfile,
  getAuth,
  type User,
} from "firebase/auth";
import { app } from "../firebase/app";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export const Account = ({
  param,
  showModalSignUp,
}: {
  param: string;
  showModalSignUp: (show: boolean) => void;
}) => {
  const [action, setAction] = useState(param);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (action === "signUp" && !email) {
      toast.error("Email is required");
      return false;
    }
    if (action === "signUp" && !username) {
      toast.error("Username is required");
      return false;
    }
    if (!password) {
      toast.error("Password is required");
      return false;
    }
    if (action === "signUp" && password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleUserSuccess = (user: User) => {
    // Store user info in localStorage for persistence
    const userData = {
      email: user.email || "",
      username: user.displayName || username,
      userLoggedIn: true,
      uid: user.uid,
    };
    console.log(userData);
    // Note: localStorage is handled by the Firebase auth state listener in Navbar
    // This ensures consistency across the app

    toast.success("Successfully logged in", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });

    setTimeout(() => showModalSignUp(false), 2000);
  };

  const accountLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (action === "signUp") {
        // Create account with Firebase
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // Update user profile with username
        await updateProfile(user, {
          displayName: username,
        });

        toast.success("Account created successfully! Logging you in...", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });

        // Automatically log in the user after successful signup
        handleUserSuccess(user);
      } else {
        // Sign in with Firebase
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        handleUserSuccess(userCredential.user);
      }
    } catch (error: any) {
      let errorMessage = "An error occurred. Please try again.";

      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage =
            "This email is already registered. Please use a different email or try logging in.";
          break;
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email address.";
          break;
        case "auth/operation-not-allowed":
          errorMessage = "Email/password accounts are not enabled.";
          break;
        case "auth/weak-password":
          errorMessage = "Password should be at least 6 characters long.";
          break;
        case "auth/user-disabled":
          errorMessage = "This account has been disabled.";
          break;
        case "auth/user-not-found":
          errorMessage =
            "No account found with this email. Please check your email or sign up.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password. Please try again.";
          break;
        case "auth/invalid-credential":
          errorMessage =
            "Invalid email or password. Please check your credentials.";
          break;
        default:
          errorMessage = error.message || errorMessage;
      }

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      handleUserSuccess(result.user);
    } catch (error: any) {
      toast.error(error.message || "Google sign-in failed", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      handleUserSuccess(result.user);
    } catch (error: any) {
      toast.error(error.message || "Facebook sign-in failed", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setAction(action === "login" ? "signUp" : "login");
    setPassword("");
    setEmail("");
    setUsername("");
  };

  return (
    <section className="w-full fixed inset-0 bg-black/50 z-40 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg relative flex mx-auto py-4 w-[900px] max-lg:w-[500px] max-md:w-[90%]">
        <div className="w-3/5 max-lg:hidden">
          <div className="relative h-full">
            <img
              src="/images/imgShuttStock.jpg"
              alt="Account illustration"
              className="object-cover rounded-l-lg w-full h-full"
            />
          </div>
        </div>

        <div className="w-2/5 max-lg:w-full px-6 relative">
          <button
            onClick={() => showModalSignUp(false)}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <MdOutlineCancel className="cursor-pointer w-7 h-7" />
          </button>

          <div className="mt-4 mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {action === "signUp" ? "Create an Account" : "Welcome Back"}
            </h1>

            <div className="flex gap-4 mt-4">
              <button
                className={`pb-2 px-1 font-medium ${
                  action === "login"
                    ? "border-b-2 border-[#1AB9F4] text-[#1AB9F4]"
                    : "text-gray-500"
                }`}
                onClick={() => setAction("login")}
              >
                Login
              </button>
              <span className="text-gray-400">or</span>
              <button
                className={`pb-2 px-1 font-medium ${
                  action === "signUp"
                    ? "border-b-2 border-[#1AB9F4] text-[#1AB9F4]"
                    : "text-gray-500"
                }`}
                onClick={() => setAction("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>

          <form className="space-y-4" onSubmit={accountLogin}>
            {action === "signUp" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <div className="bg-[#FBFBFB] border border-[#e6e6e6] rounded-md hover:shadow-md flex items-center">
                    <span className="pl-3 pr-2">
                      <MdPerson className="text-gray-500 w-5 h-5" />
                    </span>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full p-3 outline-none bg-transparent"
                      placeholder="Enter your username"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="bg-[#FBFBFB] border border-[#e6e6e6] rounded-md hover:shadow-md flex items-center">
                    <span className="pl-3 pr-2">
                      <MdEmail className="text-gray-500 w-5 h-5" />
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 outline-none bg-transparent"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {action === "login" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="bg-[#FBFBFB] border border-[#e6e6e6] rounded-md hover:shadow-md flex items-center">
                  <span className="pl-3 pr-2">
                    <MdEmail className="text-gray-500 w-5 h-5" />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 outline-none bg-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="bg-[#FBFBFB] border border-[#e6e6e6] rounded-md hover:shadow-md flex items-center">
                <span className="pl-3 pr-2">
                  <MdLock className="text-gray-500 w-5 h-5" />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 outline-none bg-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#1AB9F4] w-full py-3 px-4 rounded-md text-white font-medium
                hover:bg-[#0da6e0] transition-colors duration-200 flex justify-center items-center disabled:opacity-50"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : action === "signUp" ? (
                "CREATE ACCOUNT"
              ) : (
                "LOGIN"
              )}
            </button>

            {action === "login" && (
              <div className="text-right">
                <a href="#" className="text-sm text-[#1AB9F4] hover:underline">
                  Forgot password?
                </a>
              </div>
            )}
          </form>

          <p className="mt-4 text-sm text-gray-600 text-center">
            {action === "signUp"
              ? "Already have an account? "
              : "Don't have an account yet? "}
            <button
              onClick={switchMode}
              className="text-[#1AB9F4] hover:underline font-medium"
            >
              {action === "signUp" ? "Login" : "Sign up"}
            </button>
          </p>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="mx-4 text-sm text-gray-500">or continue with</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 bg-[#4285F4] text-white py-3 px-4 rounded-md hover:bg-[#3367d6] transition-colors disabled:opacity-50"
            >
              <FaGoogle className="w-4 h-4" />
              <span className="text-sm">Google</span>
            </button>

            <button
              type="button"
              onClick={handleFacebookSignIn}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 bg-[#3b5998] text-white py-3 px-4 rounded-md hover:bg-[#2d4373] transition-colors disabled:opacity-50"
            >
              <FaFacebook className="w-4 h-4" />
              <span className="text-sm">Facebook</span>
            </button>
          </div>

          <p className="mt-6 text-xs text-center text-gray-500">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </section>
  );
};
