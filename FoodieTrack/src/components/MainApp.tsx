import { useAuth0 } from "@auth0/auth0-react";
import VoiceRecorder from "./VoiceRecorder";
import LogoutButton from "./LogoutButton";
import type { UserProfile } from "../types";

interface Props {
  profile: UserProfile;
}

export default function MainApp({ profile }: Props) {
  const { logout } = useAuth0();

  const handleLogout = () => {
    // Clear onboarding/profile state
    localStorage.removeItem("foodie_profile");

    // Log out of Auth0 and return home
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px" }}>
      {/* Header row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h2>Daily Check-in 👋</h2>

        {/* 🔴 Sign out button (RECOVERED) */}
        <button onClick={handleLogout} className="button logout">
          Log out
        </button>
        {/* or replace with <LogoutButton /> if you prefer */}
      </div>

      <p style={{ color: "#6b7280", marginBottom: "1rem" }}>
        Your preferences are saved. Just speak naturally — we’ll take care of the rest.
      </p>

      <VoiceRecorder />
    </div>
  );
}
