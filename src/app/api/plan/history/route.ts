import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireSession } from "@/lib/session";

export async function GET() {
  const session = await requireSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

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
