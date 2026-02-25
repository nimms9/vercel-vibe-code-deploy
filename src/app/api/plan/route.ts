import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireSession } from "@/lib/session";

export async function GET(request: Request) {
  const session = await requireSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const history = searchParams.get("history") === "1";

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  if (history) {
    const plans = await prisma.plan.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });
    const normalized = plans.map((item) => ({
      ...item,
      recommendations: JSON.parse(item.recommendations || "{}"),
      profileSnapshot: JSON.parse(item.profileSnapshot || "{}"),
    }));
    return NextResponse.json({ plans: normalized });
  }

  const plan = await prisma.plan.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  if (!plan) {
    return NextResponse.json({ plan: null });
  }

  return NextResponse.json({
    plan: {
      ...plan,
      recommendations: JSON.parse(plan.recommendations || "{}"),
      profileSnapshot: JSON.parse(plan.profileSnapshot || "{}"),
    },
  });
}
