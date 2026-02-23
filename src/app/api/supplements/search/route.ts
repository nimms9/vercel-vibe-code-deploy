import { NextResponse } from "next/server";

const catalog = [
  "Vitamin D3",
  "Vitamin C",
  "Magnesium Glycinate",
  "Omega-3",
  "Vitamin B12",
  "Folate",
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") || "").toLowerCase();
  const results = catalog.filter((item) => item.toLowerCase().includes(query));
  return NextResponse.json({ results });
}
