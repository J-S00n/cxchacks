import { useState } from "react";
import type { UserProfile } from "./types";

import ProfileForm from "./components/onboarding/ProfileForm";
import MainApp from "./components/MainApp";

export default function App() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  return (
    <div>
      {!profile ? (
        <ProfileForm onComplete={setProfile} />
      ) : (
        <MainApp profile={profile} />
      )}
    </div>
  );
}
