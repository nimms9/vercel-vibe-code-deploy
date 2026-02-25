import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { generatePlan } from "@/lib/plan";
import { generatePlanSchema } from "@/lib/validators";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const session = await requireSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ip = getClientIp(request.headers);
  const limiter = rateLimit(`plan-generate:${ip}`, { windowMs: 5 * 60_000, max: 20 });
  if (!limiter.allowed) {
    return NextResponse.json({ error: "Too many requests. Try again shortly." }, { status: 429 });
  }

  const body = await request.json().catch(() => ({}));
  const parsed = generatePlanSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { profile: true },
  });

  if (!user?.profile) {
    return NextResponse.json({ error: "Profile required" }, { status: 400 });
  }

  const profileSnapshot = {
    ageRange: user.profile.ageRange,
    sex: user.profile.sex ?? undefined,
    dietStyle: user.profile.dietStyle,
    goals: JSON.parse(user.profile.goals || "[]"),
    allergies: user.profile.allergies,
    budget: user.profile.budget,
    healthFlags: JSON.parse(user.profile.healthFlags || "{}"),
  };

  const plan = generatePlan(profileSnapshot);

  const saved = await prisma.plan.create({
    data: {
      userId: user.id,
      profileSnapshot: JSON.stringify(profileSnapshot),
      recommendations: JSON.stringify(plan),
      safetyNotes: "Not medical advice. Confirm dosing with a licensed clinician.",
      estimatedCost: plan.estimatedMonthlyCost,
    },
  });

  return NextResponse.json({
    plan: {
      ...saved,
      recommendations: plan,
      profileSnapshot,
    },
  });
}
