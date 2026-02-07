import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import type { UserProfile } from "./types";

// Groupmate components (landing + auth UI)
import Home from "./components/Home";

// Your components (onboarding + voice app)
import ProfileForm from "./components/onboarding/ProfileForm";
import MainApp from "./components/MainApp";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;
  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
}

export default function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  // Load onboarding profile after login
  useEffect(() => {
    if (isAuthenticated) {
      const stored = localStorage.getItem("foodie_profile");
      if (stored) setProfile(JSON.parse(stored));
    }
  }, [isAuthenticated]);

  const handleOnboardingComplete = (profile: UserProfile) => {
    localStorage.setItem("foodie_profile", JSON.stringify(profile));
    setProfile(profile);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        {/* Public landing page */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/app" replace /> : <Home />
          }
        />

        {/* Protected app */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              {!profile ? (
                <ProfileForm onComplete={handleOnboardingComplete} />
              ) : (
                <MainApp profile={profile} />
              )}
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
