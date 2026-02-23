import { NextResponse } from "next/server";

const vitamins = [
  { name: "Vitamin A", solubility: "fat", focus: "vision, skin" },
  { name: "Vitamin D", solubility: "fat", focus: "bone, immunity" },
  { name: "Vitamin E", solubility: "fat", focus: "cell protection" },
  { name: "Vitamin K", solubility: "fat", focus: "clotting" },
  { name: "Vitamin C", solubility: "water", focus: "immune" },
  { name: "B-Complex", solubility: "water", focus: "energy" },
];

export async function GET() {
  return NextResponse.json({ vitamins });
}
