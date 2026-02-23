"use client";

import { motion } from "framer-motion";
import {
  Droplet,
  Sun,
  Leaf,
  ShieldCheck,
  Sparkles,
  HeartPulse,
  Eye,
  BadgeAlert,
  ArrowRight,
  Beaker,
  Star,
  CheckCircle2,
  Globe2,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import MarketingShell from "@/components/marketing-shell";

type AgeGroup = "child" | "teen" | "adult" | "senior";
type Gender = "female" | "male" | "nonbinary" | "prefer_not";
type Solubility = "fat" | "water";

type Vitamin = {
  id: string;
  name: string;
  solubility: Solubility;
  highlights: string;
  sources: string[];
  cautions: string;
  ageFocus: AgeGroup[];
  genderFocus: Gender[] | "all";
  icon: ReactNode;
};

const vitamins: Vitamin[] = [
  {
    id: "a",
    name: "Vitamin A",
    solubility: "fat",
    highlights: "Vision support and skin integrity.",
    sources: ["Carrots", "Sweet potato", "Egg yolk"],
    cautions: "Can build up in the body if oversupplemented.",
    ageFocus: ["child", "teen", "adult"],
    genderFocus: "all",
    icon: <Eye className="h-5 w-5 text-[var(--coral)]" />,
  },
  {
    id: "d",
    name: "Vitamin D",
    solubility: "fat",
    highlights: "Bone density and immune readiness.",
    sources: ["Sunlight", "Salmon", "Fortified dairy"],
    cautions: "Pair intake with fats for absorption.",
    ageFocus: ["teen", "adult", "senior"],
    genderFocus: "all",
    icon: <Sun className="h-5 w-5 text-[var(--sun)]" />,
  },
  {
    id: "e",
    name: "Vitamin E",
    solubility: "fat",
    highlights: "Cell protection and skin resilience.",
    sources: ["Almonds", "Sunflower seeds", "Avocado"],
    cautions: "High doses can interfere with clotting.",
    ageFocus: ["adult", "senior"],
    genderFocus: "all",
    icon: <Sparkles className="h-5 w-5 text-[var(--leaf)]" />,
  },
  {
    id: "k",
    name: "Vitamin K",
    solubility: "fat",
    highlights: "Blood clotting and bone health.",
    sources: ["Kale", "Broccoli", "Fermented foods"],
    cautions: "Discuss with a clinician if on blood thinners.",
    ageFocus: ["teen", "adult", "senior"],
    genderFocus: "all",
    icon: <Leaf className="h-5 w-5 text-[var(--moss)]" />,
  },
  {
    id: "c",
    name: "Vitamin C",
    solubility: "water",
    highlights: "Immune defense and collagen production.",
    sources: ["Citrus", "Bell pepper", "Kiwi"],
    cautions: "Excess is typically excreted in urine.",
    ageFocus: ["child", "teen", "adult", "senior"],
    genderFocus: "all",
    icon: <ShieldCheck className="h-5 w-5 text-[var(--moss)]" />,
  },
  {
    id: "b12",
    name: "Vitamin B12",
    solubility: "water",
    highlights: "Energy metabolism and nerve support.",
    sources: ["Eggs", "Fish", "Fortified foods"],
    cautions: "Plant-based diets may need extra attention.",
    ageFocus: ["teen", "adult", "senior"],
    genderFocus: "all",
    icon: <HeartPulse className="h-5 w-5 text-[var(--coral)]" />,
  },
  {
    id: "b9",
    name: "Folate (B9)",
    solubility: "water",
    highlights: "Cell growth and red blood cell formation.",
    sources: ["Spinach", "Lentils", "Citrus"],
    cautions: "Key before and during pregnancy.",
    ageFocus: ["teen", "adult"],
    genderFocus: ["female"],
    icon: <Leaf className="h-5 w-5 text-[var(--leaf)]" />,
  },
  {
    id: "b6",
    name: "Vitamin B6",
    solubility: "water",
    highlights: "Mood regulation and protein metabolism.",
    sources: ["Chickpeas", "Banana", "Turkey"],
    cautions: "Balance with other B vitamins.",
    ageFocus: ["adult", "senior"],
    genderFocus: "all",
    icon: <Sparkles className="h-5 w-5 text-[var(--sun)]" />,
  },
  {
    id: "b1",
    name: "Thiamin (B1)",
    solubility: "water",
    highlights: "Energy release from food.",
    sources: ["Whole grains", "Beans", "Pork"],
    cautions: "Needs regular replenishment.",
    ageFocus: ["child", "teen", "adult"],
    genderFocus: "all",
    icon: <Droplet className="h-5 w-5 text-[var(--moss)]" />,
  },
  {
    id: "b2",
    name: "Riboflavin (B2)",
    solubility: "water",
    highlights: "Cellular energy and antioxidant support.",
    sources: ["Dairy", "Mushrooms", "Almonds"],
    cautions: "Short-lived storage in the body.",
    ageFocus: ["child", "teen", "adult"],
    genderFocus: "all",
    icon: <Droplet className="h-5 w-5 text-[var(--moss)]" />,
  },
  {
    id: "b3",
    name: "Niacin (B3)",
    solubility: "water",
    highlights: "Circulation and skin comfort.",
    sources: ["Chicken", "Peanuts", "Brown rice"],
    cautions: "High-dose supplements can cause flushing.",
    ageFocus: ["adult", "senior"],
    genderFocus: "all",
    icon: <Sparkles className="h-5 w-5 text-[var(--sun)]" />,
  },
  {
    id: "b5",
    name: "Pantothenic (B5)",
    solubility: "water",
    highlights: "Stress response and hormone synthesis.",
    sources: ["Avocado", "Mushrooms", "Lentils"],
    cautions: "Often covered by a varied diet.",
    ageFocus: ["teen", "adult"],
    genderFocus: "all",
    icon: <Droplet className="h-5 w-5 text-[var(--moss)]" />,
  },
  {
    id: "b7",
    name: "Biotin (B7)",
    solubility: "water",
    highlights: "Hair, skin, and nail strength.",
    sources: ["Eggs", "Nuts", "Seeds"],
    cautions: "High doses can affect lab tests.",
    ageFocus: ["teen", "adult"],
    genderFocus: "all",
    icon: <Sparkles className="h-5 w-5 text-[var(--coral)]" />,
  },
];

const solubilityMeta = {
  fat: {
    title: "Fat-soluble",
    description:
      "Stored in body tissue. Benefits build over time, but excess can accumulate.",
    accent: "from-[#f2b766]/30 to-[#d37a4a]/15",
  },
  water: {
    title: "Water-soluble",
    description:
      "Circulates freely and is flushed more quickly. Needs frequent replenishment.",
    accent: "from-[#9cab88]/30 to-[#e7efe7]/70",
  },
};

const ageGroupLabel = (age: number): AgeGroup => {
  if (age < 13) return "child";
  if (age < 19) return "teen";
  if (age < 51) return "adult";
  return "senior";
};

const dietOptions = [
  "Balanced",
  "Vegetarian",
  "Vegan",
  "Pescatarian",
  "Gluten-free",
  "Dairy-free",
];

export default function Home() {
  const [age, setAge] = useState(32);
  const [gender, setGender] = useState<Gender>("female");
  const [diet, setDiet] = useState(dietOptions[0]);
  const [allergiesInput, setAllergiesInput] = useState("Nuts, Shellfish");

  const selectedAgeGroup = ageGroupLabel(Number.isFinite(age) ? age : 0);

  const ranked = useMemo(() => {
    const scored = vitamins.map((vit) => {
      const ageScore = vit.ageFocus.includes(selectedAgeGroup) ? 2 : 0;
      const genderScore =
        vit.genderFocus === "all" || vit.genderFocus.includes(gender) ? 1 : 0;
      return { ...vit, score: ageScore + genderScore };
    });

    return scored.sort((a, b) => b.score - a.score);
  }, [gender, selectedAgeGroup]);

  const topPicks = ranked.slice(0, 4);
  const fatSoluble = ranked.filter((vit) => vit.solubility === "fat");
  const waterSoluble = ranked.filter((vit) => vit.solubility === "water");
  const allergyTags = allergiesInput
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  return (
    <MarketingShell>
      <motion.header
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto flex w-full max-w-6xl flex-col gap-6"
      >
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <h1 className="font-display text-4xl leading-tight text-[var(--ink)] sm:text-5xl">
              Clinically inspired vitamin guidance, personalized in minutes.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--slate)]">
              Meet a calmer way to navigate supplements. VitaLens separates
              fat-soluble and water-soluble vitamins, then layers in age, gender,
              diet, and allergy preferences for a clearer starting point.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-white/80 px-4 py-2 text-xs font-semibold text-[var(--moss)] shadow-sm">
                3-minute personalized snapshot
              </span>
              <span className="rounded-full bg-white/80 px-4 py-2 text-xs font-semibold text-[var(--moss)] shadow-sm">
                Food-first guidance
              </span>
              <span className="rounded-full bg-white/80 px-4 py-2 text-xs font-semibold text-[var(--moss)] shadow-sm">
                Clear solubility split
              </span>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#top-picks"
                className="flex items-center gap-2 rounded-full bg-[var(--moss)] px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_50px_rgba(31,59,47,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_30px_60px_rgba(31,59,47,0.3)]"
              >
                Generate my plan
                <ArrowRight className="h-4 w-4" />
              </a>
              <button className="rounded-full border border-[rgba(31,59,47,0.2)] bg-white/80 px-5 py-3 text-sm font-semibold text-[var(--moss)]">
                Save profile
              </button>
            </div>
            <div className="mt-8 grid gap-3 text-xs text-[var(--slate)]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[var(--olive)]" />
                RDA-aware suggestions with food-first defaults.
              </div>
              <div className="flex items-center gap-2">
                <Beaker className="h-4 w-4 text-[var(--olive)]" />
                Built around solubility and nutrient absorption basics.
              </div>
            </div>
          </div>
          <div className="glass rounded-3xl p-6 shadow-[0_25px_60px_rgba(31,59,47,0.16)]">
            <div className="relative overflow-hidden rounded-3xl border border-[rgba(31,59,47,0.1)] bg-gradient-to-br from-[#fbf8f1] to-[#efe7da] p-5">
              <div className="absolute right-6 top-6 h-28 w-28 rounded-full border border-[rgba(75,95,58,0.18)] bg-[radial-gradient(circle_at_30%_30%,rgba(242,183,102,0.6),transparent_60%)]" />
              <div className="absolute bottom-6 left-6 h-16 w-16 rounded-full border border-[rgba(75,95,58,0.2)] bg-[radial-gradient(circle_at_30%_30%,rgba(156,171,136,0.6),transparent_60%)]" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--slate)]">
                    Daily focus
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[var(--ink)]">
                    VitaLens Daily
                  </p>
                </div>
                <div className="rounded-2xl bg-white/70 px-3 py-2 text-xs font-semibold text-[var(--moss)] shadow-sm">
                  Solubility-aware
                </div>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-16 w-28 items-center justify-center rounded-full bg-[var(--moss)]/10">
                  <div className="h-10 w-20 rounded-full border border-[rgba(31,59,47,0.25)] bg-white/80 shadow-inner" />
                </div>
                <div className="text-xs text-[var(--slate)]">
                  A composed view of fats, waters, and dietary nuance.
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--slate)]">
                  Your snapshot
                </p>
                <p className="mt-2 text-lg font-semibold text-[var(--ink)]">
                  Age {age} · {selectedAgeGroup}
                </p>
              </div>
              <div className="rounded-2xl bg-white/70 px-3 py-2 text-xs font-semibold text-[var(--moss)] shadow-sm">
                {gender === "prefer_not" ? "Prefer not to say" : gender}
              </div>
            </div>
            <div className="mt-5 grid gap-4">
              <label className="grid gap-2 text-sm font-semibold text-[var(--slate)]">
                Age
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={age}
                  onChange={(event) => {
                    const value = Number(event.target.value);
                    setAge(Number.isNaN(value) ? 0 : value);
                  }}
                  className="rounded-2xl border border-[rgba(31,59,47,0.2)] bg-white/80 px-4 py-3 text-base text-[var(--ink)] outline-none transition focus:border-[var(--moss)]"
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-[var(--slate)]">
                Gender
                <select
                  value={gender}
                  onChange={(event) => setGender(event.target.value as Gender)}
                  className="rounded-2xl border border-[rgba(31,59,47,0.2)] bg-white/80 px-4 py-3 text-base text-[var(--ink)] outline-none transition focus:border-[var(--moss)]"
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="nonbinary">Nonbinary</option>
                  <option value="prefer_not">Prefer not to say</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm font-semibold text-[var(--slate)]">
                Dietary preference
                <select
                  value={diet}
                  onChange={(event) => setDiet(event.target.value)}
                  className="rounded-2xl border border-[rgba(31,59,47,0.2)] bg-white/80 px-4 py-3 text-base text-[var(--ink)] outline-none transition focus:border-[var(--moss)]"
                >
                  {dietOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-semibold text-[var(--slate)]">
                Allergies or avoid list
                <input
                  type="text"
                  value={allergiesInput}
                  onChange={(event) => setAllergiesInput(event.target.value)}
                  placeholder="Nuts, Shellfish, Soy"
                  className="rounded-2xl border border-[rgba(31,59,47,0.2)] bg-white/80 px-4 py-3 text-base text-[var(--ink)] outline-none transition focus:border-[var(--moss)]"
                />
              </label>
              <div className="flex flex-wrap gap-2">
                {allergyTags.length === 0 ? (
                  <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-[var(--slate)]">
                    No allergies listed
                  </span>
                ) : (
                  allergyTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-[var(--moss)]"
                    >
                      {tag}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <section className="mx-auto mt-12 grid w-full max-w-6xl gap-4 lg:grid-cols-3">
        {[
          {
            title: "Nutrition snapshot",
            description:
              "A quick blend of age, gender, and diet preferences to highlight what matters most.",
          },
          {
            title: "Solubility clarity",
            description:
              "Know which vitamins store in the body and which should be replenished more often.",
          },
          {
            title: "Safer supplementing",
            description:
              "Allergy-aware prompts and a food-first nudge before you add pills.",
          },
        ].map((card) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="glass rounded-3xl p-6"
          >
            <h3 className="font-display text-xl text-[var(--ink)]">
              {card.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--slate)]">
              {card.description}
            </p>
          </motion.div>
        ))}
      </section>

      <main className="mx-auto mt-12 flex w-full max-w-6xl flex-col gap-10">
        <section id="top-picks" className="glass rounded-3xl p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--slate)]">
                Top picks
              </p>
              <h2 className="font-display text-2xl text-[var(--ink)]">
                Most relevant for you right now
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {topPicks.map((vit) => (
                <span
                  key={vit.id}
                  className="flex items-center gap-2 rounded-full border border-[rgba(31,59,47,0.18)] bg-white/80 px-3 py-2 text-xs font-semibold text-[var(--moss)]"
                >
                  {vit.icon}
                  {vit.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-2">
          {[{ title: "fat", data: fatSoluble }, { title: "water", data: waterSoluble }].map(
            (group) => (
              <motion.section
                key={group.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.5 }}
                className="glass rounded-3xl p-6"
              >
                <div
                  className={`rounded-3xl bg-gradient-to-br p-5 ${solubilityMeta[group.title as Solubility].accent}`}
                >
                  <h3 className="font-display text-2xl text-[var(--ink)]">
                    {solubilityMeta[group.title as Solubility].title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--slate)]">
                    {solubilityMeta[group.title as Solubility].description}
                  </p>
                </div>

                <div className="mt-6 grid gap-4">
                  {group.data.map((vit, index) => (
                    <motion.div
                      key={vit.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="rounded-3xl border border-[rgba(31,59,47,0.15)] bg-white/80 p-5"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="rounded-2xl bg-white p-2 shadow-sm">
                            {vit.icon}
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-[var(--ink)]">
                              {vit.name}
                            </h4>
                            <p className="text-sm text-[var(--slate)]">
                              {vit.highlights}
                            </p>
                          </div>
                        </div>
                        <div className="rounded-full bg-[var(--mist)] px-3 py-1 text-xs font-semibold text-[var(--moss)]">
                          Match {vit.score}/3
                        </div>
                      </div>
                      <div className="mt-4 grid gap-3 text-sm text-[var(--slate)]">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--slate)]">
                            Best foods
                          </span>
                          {vit.sources.map((source) => (
                            <span
                              key={source}
                              className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-[var(--ink)]"
                            >
                              {source}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-[var(--slate)]">
                          {vit.cautions}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )
          )}
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="glass rounded-3xl p-6">
            <h3 className="font-display text-2xl text-[var(--ink)]">
              Why solubility matters
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--slate)]">
              Fat-soluble vitamins are stored in body tissue and may accumulate.
              Water-soluble vitamins circulate more freely and need steady
              replenishment. Knowing the difference helps keep your routine
              measured and safe.
            </p>
            <div className="mt-4 grid gap-3 text-sm text-[var(--slate)]">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--olive)]" />
                Fat-soluble: A, D, E, K. Use consistent, measured doses.
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--olive)]" />
                Water-soluble: B-complex and C. Replenish through food.
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--olive)]" />
                Diet and allergies adjust which food sources make sense.
              </div>
            </div>
          </div>
          <div className="glass rounded-3xl p-6">
            <h3 className="font-display text-2xl text-[var(--ink)]">
              Ingredient standards we expect
            </h3>
            <div className="mt-4 grid gap-4 text-sm text-[var(--slate)]">
              {[
                "Third-party tested supplements when possible.",
                "Clear allergen labeling on every bottle.",
                "Form factors matched to absorption (with meals when needed).",
                "Transparent sourcing for vitamins and minerals.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <Star className="mt-0.5 h-4 w-4 text-[var(--sun)]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="glass rounded-3xl p-6">
            <h3 className="font-display text-2xl text-[var(--ink)]">
              How to interpret the suggestions
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--slate)]">
              Fat-soluble vitamins (A, D, E, K) are stored in the body, so
              consistent but measured intake is key. Water-soluble vitamins (the
              B-complex and C) circulate quickly and typically need more regular
              replenishment through food.
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold text-[var(--moss)]">
              <span className="rounded-full bg-white/80 px-3 py-2">
                Stay food-first when possible
              </span>
              <span className="rounded-full bg-white/80 px-3 py-2">
                Match supplements to clinician guidance
              </span>
              <span className="rounded-full bg-white/80 px-3 py-2">
                Recheck needs every 6-12 months
              </span>
            </div>
          </div>
          <div className="glass rounded-3xl p-6">
            <h3 className="font-display text-2xl text-[var(--ink)]">
              Quick reminders
            </h3>
            <ul className="mt-3 flex flex-col gap-3 text-sm text-[var(--slate)]">
              <li className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-[var(--moss)]" />
                Use consistent timing for fat-soluble vitamins with meals.
              </li>
              <li className="flex items-start gap-2">
                <Droplet className="mt-0.5 h-4 w-4 text-[var(--moss)]" />
                Water-soluble vitamins are often better split across the day.
              </li>
              <li className="flex items-start gap-2">
                <HeartPulse className="mt-0.5 h-4 w-4 text-[var(--coral)]" />
                If you have medical conditions, confirm dosage ranges.
              </li>
            </ul>
          </div>
        </section>

        <section className="glass rounded-3xl p-6">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-[var(--mist)] p-3">
              <BadgeAlert className="h-5 w-5 text-[var(--coral)]" />
            </div>
            <div>
              <h3 className="font-display text-2xl text-[var(--ink)]">
                Dosage guidance disclaimer
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--slate)]">
                This experience provides general wellness guidance, not medical
                advice. Vitamin needs and safe dosage ranges vary by condition,
                medications, pregnancy, and lab results. Always confirm any
                supplement plan with a licensed clinician, and prioritize
                nutrient-dense foods first.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold text-[var(--moss)]">
                <span className="rounded-full bg-white/80 px-3 py-2">
                  Avoid mega-dosing without supervision
                </span>
                <span className="rounded-full bg-white/80 px-3 py-2">
                  Review interactions with medications
                </span>
                <span className="rounded-full bg-white/80 px-3 py-2">
                  Check labels for allergens
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Global nutrition baselines",
              description:
                "We map recommendations across age groups and refine the view with your diet choices.",
              icon: <Globe2 className="h-5 w-5 text-[var(--moss)]" />,
            },
            {
              title: "Ingredient intelligence",
              description:
                "Formulations and food lists highlight nutrient density and typical absorption.",
              icon: <Beaker className="h-5 w-5 text-[var(--moss)]" />,
            },
            {
              title: "Progress you can revisit",
              description:
                "Save a profile and compare changes as your routine evolves.",
              icon: <ShieldCheck className="h-5 w-5 text-[var(--moss)]" />,
            },
          ].map((item) => (
            <div key={item.title} className="glass rounded-3xl p-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--moss)]">
                {item.icon}
                {item.title}
              </div>
              <p className="mt-3 text-sm text-[var(--slate)]">
                {item.description}
              </p>
            </div>
          ))}
        </section>

        <section className="glass rounded-3xl p-6">
          <h3 className="font-display text-2xl text-[var(--ink)]">
            What people are saying
          </h3>
          <p className="mt-2 text-sm text-[var(--slate)]">
            Gentle guidance, clearer routines, and more confidence in daily
            choices.
          </p>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {[
              {
                quote:
                  "The solubility breakdown made it click. I stopped overbuying supplements.",
                name: "Maya S.",
                role: "Wellness coach",
              },
              {
                quote:
                  "Simple, calm, and actually helpful. I finally understood what to prioritize.",
                name: "Jordan K.",
                role: "Product designer",
              },
              {
                quote:
                  "The allergy cues and food-first tips feel responsible and grounded.",
                name: "Avery R.",
                role: "Parent of two",
              },
            ].map((item) => (
              <div
                key={item.name}
                className="rounded-3xl border border-[rgba(31,59,47,0.12)] bg-white/80 p-5"
              >
                <div className="flex items-center gap-1 text-[var(--sun)]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={`${item.name}-${index}`} className="h-4 w-4" />
                  ))}
                </div>
                <p className="mt-4 text-sm text-[var(--slate)]">
                  “{item.quote}”
                </p>
                <div className="mt-4 text-xs font-semibold text-[var(--moss)]">
                  {item.name}
                </div>
                <div className="text-xs text-[var(--slate)]">{item.role}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
