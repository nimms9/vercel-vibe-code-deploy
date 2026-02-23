export type ProfileInput = {
  ageRange: string;
  sex?: string;
  dietStyle: string;
  goals: string[];
  allergies: string;
  budget: string;
  healthFlags: {
    pregnancy?: boolean;
    anticoagulants?: boolean;
    thyroidMeds?: boolean;
  };
};

type Recommendation = {
  name: string;
  dose: string;
  timing: string;
  why: string;
  cautions: string[];
};

export type PlanOutput = {
  items: Recommendation[];
  estimatedMonthlyCost: string;
};

const baseRecommendations: Recommendation[] = [
  {
    name: "Vitamin D3",
    dose: "1000–2000 IU daily",
    timing: "With food (morning or lunch)",
    why: "Supports immune function and bone health",
    cautions: ["Discuss with clinician if on blood thinners"],
  },
  {
    name: "Omega-3 (EPA/DHA)",
    dose: "500–1000 mg daily",
    timing: "With meals",
    why: "Supports heart, brain, and inflammation balance",
    cautions: ["Use caution with anticoagulants"],
  },
  {
    name: "Magnesium Glycinate",
    dose: "200–400 mg daily",
    timing: "Evening",
    why: "Supports relaxation and sleep quality",
    cautions: ["Start low if sensitive to GI changes"],
  },
];

export function generatePlan(profile: ProfileInput): PlanOutput {
  const items = [...baseRecommendations];

  if (profile.goals.includes("energy")) {
    items.push({
      name: "Vitamin B12",
      dose: "500–1000 mcg weekly",
      timing: "Morning",
      why: "Supports energy metabolism and red blood cell production",
      cautions: ["Absorption can decline with age"],
    });
  }

  if (profile.goals.includes("immunity")) {
    items.push({
      name: "Vitamin C",
      dose: "250–500 mg daily",
      timing: "Split AM/PM",
      why: "Supports immune defense and collagen synthesis",
      cautions: ["Higher doses may cause GI upset"],
    });
  }

  if (profile.dietStyle.toLowerCase().includes("vegan")) {
    items.push({
      name: "Vitamin B12 (Vegan)",
      dose: "1000 mcg weekly",
      timing: "Morning",
      why: "Plant-based diets may need additional B12",
      cautions: ["Check fortified foods first"],
    });
  }

  if (profile.healthFlags.pregnancy) {
    items.push({
      name: "Folate (B9)",
      dose: "400–800 mcg daily",
      timing: "With meals",
      why: "Supports fetal development",
      cautions: ["Confirm prenatal dosage with clinician"],
    });
  }

  const estimatedMonthlyCost = profile.budget || "$15–$35";

  return { items, estimatedMonthlyCost };
}
