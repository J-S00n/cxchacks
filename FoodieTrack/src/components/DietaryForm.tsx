import { useState } from "react";

export default function DietaryForm() {
  const [preferences, setPreferences] = useState<string[]>([]);
  const [restrictions, setRestrictions] = useState<string[]>([]);
  const [contains, setContains] = useState<string[]>([]);
  const [otherAllergies, setOtherAllergies] = useState("");
  const [goal, setGoal] = useState("");

  const toggle = (
    value: string,
    list: string[],
    setter: (v: string[]) => void
  ) => {
    setter(
      list.includes(value)
        ? list.filter(v => v !== value)
        : [...list, value]
    );
  };

  return (
    <div style={{ marginTop: "2rem", maxWidth: "600px" }}>
      <h2>🥗 Dietary Preferences & Restrictions</h2>
      <p style={{ fontSize: "0.9rem", color: "#555" }}>
        Leave preferences unselected if you have no specific dietary preference.
      </p>

      <h3>Dietary Preferences</h3>
      {["Vegan", "Vegetarian", "Pescatarian", "Halal", "Kosher"].map(p => (
        <label key={p} style={{ display: "block" }}>
          <input
            type="checkbox"
            onChange={() => toggle(p, preferences, setPreferences)}
          />{" "}
          {p}
        </label>
      ))}

      <h3 style={{ marginTop: "1rem" }}>Dietary Restrictions / Allergies</h3>
      {["Gluten-free", "Dairy-free", "Nut-free"].map(r => (
        <label key={r} style={{ display: "block" }}>
          <input
            type="checkbox"
            onChange={() => toggle(r, restrictions, setRestrictions)}
          />{" "}
          {r}
        </label>
      ))}

      <label style={{ display: "block", marginTop: "0.5rem" }}>
        Other allergies (optional):
        <input
          type="text"
          value={otherAllergies}
          onChange={e => setOtherAllergies(e.target.value)}
          placeholder="e.g. sesame, shellfish"
          style={{ width: "100%", marginTop: "0.25rem" }}
        />
      </label>

      <h3 style={{ marginTop: "1rem" }}>Contains / May Contain</h3>
      {["Contains mustard", "May contain peanuts", "May contain tree nuts"].map(c => (
        <label key={c} style={{ display: "block" }}>
          <input
            type="checkbox"
            onChange={() => toggle(c, contains, setContains)}
          />{" "}
          {c}
        </label>
      ))}

      <h3 style={{ marginTop: "1rem" }}>Goal</h3>
      {["Comfort", "High protein", "Energy boost", "Light / healthy"].map(g => (
        <label key={g} style={{ display: "block" }}>
          <input
            type="radio"
            name="goal"
            onChange={() => setGoal(g)}
          />{" "}
          {g}
        </label>
      ))}

      <button
        style={{ marginTop: "1.5rem", padding: "0.5rem 1rem" }}
        onClick={() => {
          console.log({
            preferences,
            restrictions,
            contains,
            otherAllergies,
            goal
          });
        }}
      >
        Get Recommendation
      </button>
    </div>
  );
}
