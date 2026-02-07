import { useState } from "react";
import type {
  UserProfile,
  DietGoal,
  ActivityLevel,
  CookingAccess,
} from "../../types";

interface Props {
  onComplete: (profile: UserProfile) => void;
}

type ArrayKeys =
  | "dietaryPreferences"
  | "dietaryRestrictions"
  | "preferredCuisines";

export default function ProfileForm({ onComplete }: Props) {
  const [profile, setProfile] = useState<UserProfile>({
    dietaryPreferences: [],
    dietaryRestrictions: [],
    preferredCuisines: [],
    otherAllergies: "",
    onDiet: false,
  });

  const [otherCuisines, setOtherCuisines] = useState("");

  const toggleArrayValue = (key: ArrayKeys, value: string) => {
    setProfile(prev => {
      const arr = prev[key] ?? [];
      return {
        ...prev,
        [key]: arr.includes(value)
          ? arr.filter(v => v !== value)
          : [...arr, value],
      };
    });
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
      <h2>Set up your food profile</h2>

      {/* ======================
          SECTION 1 — DIET & SAFETY
         ====================== */}

      <h3>Dietary Preferences</h3>
      {["Vegan", "Vegetarian", "Pescatarian", "Halal", "Kosher"].map(p => (
        <label key={p} style={{ display: "block" }}>
          <input
            type="checkbox"
            onChange={() => toggleArrayValue("dietaryPreferences", p)}
          />{" "}
          {p}
        </label>
      ))}

      <h3>Dietary Restrictions / Allergies</h3>
      {["Gluten-free", "Dairy-free", "Nut-free"].map(r => (
        <label key={r} style={{ display: "block" }}>
          <input
            type="checkbox"
            onChange={() => toggleArrayValue("dietaryRestrictions", r)}
          />{" "}
          {r}
        </label>
      ))}

      <input
        placeholder="Other allergies (optional)"
        value={profile.otherAllergies}
        onChange={e =>
          setProfile(prev => ({ ...prev, otherAllergies: e.target.value }))
        }
        style={{ width: "100%", marginTop: "1rem", padding: "0.5rem" }}
      />

      {/* ======================
          SECTION 2 — GOALS & LIFESTYLE
         ====================== */}

      <h3>Diet Goal</h3>
      {(["cut", "maintain", "bulk"] as DietGoal[]).map(goal => (
        <label key={goal} style={{ display: "block" }}>
          <input
            type="radio"
            name="dietGoal"
            checked={profile.dietGoal === goal}
            onChange={() =>
              setProfile(prev => ({
                ...prev,
                onDiet: true,
                dietGoal: goal,
              }))
            }
          />{" "}
          {goal}
        </label>
      ))}

      <h3>Activity Level</h3>
      {(
        ["sedentary", "light", "active", "very_active"] as ActivityLevel[]
      ).map(level => (
        <label key={level} style={{ display: "block" }}>
          <input
            type="radio"
            name="activityLevel"
            checked={profile.activityLevel === level}
            onChange={() =>
              setProfile(prev => ({ ...prev, activityLevel: level }))
            }
          />{" "}
          {level.replace("_", " ")}
        </label>
      ))}

      {/* ======================
          SECTION 3 — TASTE & PRACTICALITY
         ====================== */}

      <h3>Preferred Cuisines</h3>
      {[
        "Italian",
        "Chinese",
        "Japanese",
        "Korean",
        "Indian",
        "Middle Eastern",
        "Mexican",
        "Western",
      ].map(cuisine => (
        <label key={cuisine} style={{ display: "block" }}>
          <input
            type="checkbox"
            checked={profile.preferredCuisines?.includes(cuisine)}
            onChange={() =>
              toggleArrayValue("preferredCuisines", cuisine)
            }
          />{" "}
          {cuisine}
        </label>
      ))}

      <input
        placeholder="Other cuisines (comma separated)"
        value={otherCuisines}
        onChange={e => setOtherCuisines(e.target.value)}
        onBlur={() => {
          if (!otherCuisines.trim()) return;

          const extras = otherCuisines
            .split(",")
            .map(c => c.trim())
            .filter(Boolean);

          setProfile(prev => ({
            ...prev,
            preferredCuisines: Array.from(
              new Set([...(prev.preferredCuisines ?? []), ...extras])
            ),
          }));

          setOtherCuisines("");
        }}
        style={{
          width: "100%",
          marginTop: "0.75rem",
          padding: "0.5rem",
        }}
      />

      <h3>Cooking Access</h3>
      {(
        ["none", "microwave", "full_kitchen"] as CookingAccess[]
      ).map(access => (
        <label key={access} style={{ display: "block" }}>
          <input
            type="radio"
            name="cookingAccess"
            checked={profile.cookingAccess === access}
            onChange={() =>
              setProfile(prev => ({ ...prev, cookingAccess: access }))
            }
          />{" "}
          {access.replace("_", " ")}
        </label>
      ))}

      {/* ======================
          SUBMIT
         ====================== */}

      <button
        onClick={() => onComplete(profile)}
        style={{
          marginTop: "2rem",
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          borderRadius: "8px",
          background: "#1f2937",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Continue
      </button>
    </div>
  );
}
