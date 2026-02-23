import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireSession } from "@/lib/session";

export async function GET() {
  const session = await requireSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { profile: true },
  });

  return NextResponse.json({ profile: user?.profile ?? null });
}

export async function POST(request: Request) {
  const session = await requireSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { ageRange, sex, dietStyle, goals, allergies, budget, healthFlags } = body;

  if (!ageRange || !dietStyle || !goals || !budget) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const profile = await prisma.profile.upsert({
    where: { userId: user.id },
    update: {
      ageRange,
      sex,
      dietStyle,
      goals: JSON.stringify(goals),
      allergies: allergies ?? "",
      budget,
      healthFlags: JSON.stringify(healthFlags ?? {}),
    },
    create: {
      userId: user.id,
      ageRange,
      sex,
      dietStyle,
      goals: JSON.stringify(goals),
      allergies: allergies ?? "",
      budget,
      healthFlags: JSON.stringify(healthFlags ?? {}),
    },
  });

  return NextResponse.json({ profile });
}
