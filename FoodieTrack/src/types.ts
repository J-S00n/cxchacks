export type DietGoal = "cut" | "maintain" | "bulk";
export type ActivityLevel = "sedentary" | "light" | "active" | "very_active";
export type CookingAccess = "none" | "microwave" | "full_kitchen";

export interface UserProfile {
  dietaryPreferences: string[];
  dietaryRestrictions: string[];
  otherAllergies?: string;

  heightCm?: number;
  weightKg?: number;

  onDiet?: boolean;
  dietGoal?: DietGoal;

  activityLevel?: ActivityLevel;
  cookingAccess?: CookingAccess;
  preferredCuisines?: string[];
}
