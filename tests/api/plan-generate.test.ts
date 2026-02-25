import { describe, expect, it, vi, beforeEach } from "vitest";
import { POST } from "@/app/api/plan/generate/route";

const prismaMock = vi.hoisted(() => ({
  user: {
    findUnique: vi.fn(),
  },
  plan: {
    create: vi.fn(),
  },
}));

vi.mock("@/lib/prisma", () => ({
  default: prismaMock,
}));

const requireSession = vi.hoisted(() => vi.fn());
vi.mock("@/lib/session", () => ({
  requireSession,
}));

vi.mock("@/lib/plan", () => ({
  generatePlan: vi.fn(() => ({ items: [], estimatedMonthlyCost: "$15–$35" })),
}));

const createRequest = (body: unknown) =>
  new Request("http://localhost/api/plan/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

describe("POST /api/plan/generate", () => {
  beforeEach(() => {
    prismaMock.user.findUnique.mockReset();
    prismaMock.plan.create.mockReset();
    requireSession.mockReset();
  });

  it("returns 401 when unauthenticated", async () => {
    requireSession.mockResolvedValue(null);
    const res = await POST(createRequest({}));
    expect(res.status).toBe(401);
  });

  it("returns 400 when profile missing", async () => {
    requireSession.mockResolvedValue({ user: { email: "a@b.com" } });
    prismaMock.user.findUnique.mockResolvedValue({ id: "1", profile: null });
    const res = await POST(createRequest({}));
    expect(res.status).toBe(400);
  });

  it("creates plan on valid profile", async () => {
    requireSession.mockResolvedValue({ user: { email: "a@b.com" } });
    prismaMock.user.findUnique.mockResolvedValue({
      id: "1",
      profile: {
        ageRange: "30-39",
        sex: "female",
        dietStyle: "Balanced",
        goals: JSON.stringify(["energy"]),
        allergies: "",
        budget: "$15-$35",
        healthFlags: JSON.stringify({}),
      },
    });
    prismaMock.plan.create.mockResolvedValue({
      id: "p1",
      userId: "1",
      recommendations: JSON.stringify({}),
      profileSnapshot: JSON.stringify({}),
      safetyNotes: "Not medical advice.",
      estimatedCost: "$15-$35",
      createdAt: new Date(),
    });

    const res = await POST(createRequest({}));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.plan).toBeTruthy();
  });
});
