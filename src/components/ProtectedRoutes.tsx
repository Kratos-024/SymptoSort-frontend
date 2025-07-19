import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { app } from "../firebase/app";

const auth = getAuth(app);

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean; // true for protected routes, false for public routes
}

const ProtectedRoute = ({
  children,
  requireAuth = true,
}: ProtectedRouteProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1AB9F4] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // For protected routes (requireAuth = true)
  if (requireAuth) {
    // If user is not authenticated, redirect to home page
    if (!user) {
      return <Navigate to="/" replace />;
    }
    // If user is authenticated, show the protected content
    return <>{children}</>;
  }

  // For public routes (requireAuth = false)
  else {
    // If user is authenticated, redirect to chat page
    if (user) {
      return <Navigate to="/chat" replace />;
    }
    // If user is not authenticated, show the public content
    return <>{children}</>;
  }
};

export default ProtectedRoute;
