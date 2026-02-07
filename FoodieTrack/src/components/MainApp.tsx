import VoiceRecorder from "./VoiceRecorder";
import type { UserProfile } from "../types";

interface Props {
  profile: UserProfile;
}

export default function MainApp({ profile }: Props) {
  return (
    <div style={{ padding: "2rem", maxWidth: "600px" }}>
      <h2>Daily Check-in 👋</h2>

      {/* Context reminder (optional, but nice UX) */}
      <p style={{ color: "#6b7280", marginBottom: "1rem" }}>
        Your preferences are saved. Just speak naturally — we’ll take care of the rest.
      </p>

      <VoiceRecorder />

      {/* 
        🔮 Future:
        - Send audio + profile to backend
        - Get AI guidance
        - Render response here
      */}
    </div>
  );
}
