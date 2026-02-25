import { describe, expect, it, vi, beforeEach } from "vitest";
import { GET, POST } from "@/app/api/profile/route";

const prismaMock = vi.hoisted(() => ({
  user: {
    findUnique: vi.fn(),
  },
  profile: {
    upsert: vi.fn(),
  },
}));

vi.mock("@/lib/prisma", () => ({
  default: prismaMock,
}));

const requireSession = vi.hoisted(() => vi.fn());
vi.mock("@/lib/session", () => ({
  requireSession,
}));

const createRequest = (body: unknown) =>
  new Request("http://localhost/api/profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

describe("/api/profile", () => {
  beforeEach(() => {
    prismaMock.user.findUnique.mockReset();
    prismaMock.profile.upsert.mockReset();
    requireSession.mockReset();
  });

  it("returns 401 when unauthenticated", async () => {
    requireSession.mockResolvedValue(null);
    const res = await GET();
    expect(res.status).toBe(401);
  });

  it("returns 400 for invalid profile payload", async () => {
    requireSession.mockResolvedValue({ user: { email: "a@b.com" } });
    prismaMock.user.findUnique.mockResolvedValue({ id: "1" });
    const res = await POST(createRequest({ ageRange: "" }));
    expect(res.status).toBe(400);
  });

  it("saves profile on valid input", async () => {
    requireSession.mockResolvedValue({ user: { email: "a@b.com" } });
    prismaMock.user.findUnique.mockResolvedValue({ id: "1" });
    prismaMock.profile.upsert.mockResolvedValue({
      id: "p1",
      userId: "1",
      ageRange: "30-39",
      sex: "female",
      dietStyle: "Balanced",
      goals: JSON.stringify(["energy"]),
      allergies: "",
      budget: "$15-$35",
      healthFlags: JSON.stringify({}),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const res = await POST(
      createRequest({
        ageRange: "30-39",
        sex: "female",
        dietStyle: "Balanced",
        goals: ["energy"],
        allergies: "",
        budget: "$15-$35",
        healthFlags: {},
      })
    );

    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.profile.goals).toEqual(["energy"]);
  });
});
