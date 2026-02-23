import { NextResponse } from "next/server";

const sources = [
  { nutrient: "Vitamin D", foods: ["Salmon", "Fortified dairy", "Egg yolk"] },
  { nutrient: "Vitamin C", foods: ["Citrus", "Kiwi", "Bell pepper"] },
  { nutrient: "Vitamin B12", foods: ["Fish", "Eggs", "Fortified foods"] },
];

export async function GET() {
  return NextResponse.json({ sources });
}
