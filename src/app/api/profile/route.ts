import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { profileSchema } from "@/lib/validators";

export async function GET() {
  const session = await requireSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { profile: true },
  });

  if (!user?.profile) {
    return NextResponse.json({ profile: null });
  }

  return NextResponse.json({
    profile: {
      ...user.profile,
      goals: JSON.parse(user.profile.goals || "[]"),
      healthFlags: JSON.parse(user.profile.healthFlags || "{}"),
    },
  });
}

export async function POST(request: Request) {
  const session = await requireSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = profileSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid profile data." }, { status: 400 });
  }
  const { ageRange, sex, dietStyle, goals, allergies, budget, healthFlags } = parsed.data;

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

  return NextResponse.json({
    profile: {
      ...profile,
      goals: JSON.parse(profile.goals || "[]"),
      healthFlags: JSON.parse(profile.healthFlags || "{}"),
    },
  });
}
