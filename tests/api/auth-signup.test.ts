import { describe, expect, it, vi, beforeEach } from "vitest";
import { POST } from "@/app/api/auth/signup/route";

const createRequest = (body: unknown) =>
  new Request("http://localhost/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

const prismaMock = vi.hoisted(() => ({
  user: {
    findUnique: vi.fn(),
    create: vi.fn(),
  },
}));

vi.mock("@/lib/prisma", () => ({
  default: prismaMock,
}));

const bcryptMock = vi.hoisted(() => ({
  hash: vi.fn(async () => "hashed"),
}));

vi.mock("bcryptjs", () => ({
  default: bcryptMock,
  hash: bcryptMock.hash,
}));

describe("POST /api/auth/signup", () => {
  beforeEach(() => {
    prismaMock.user.findUnique.mockReset();
    prismaMock.user.create.mockReset();
  });

  it("returns 400 for invalid input", async () => {
    const res = await POST(createRequest({ email: "bad", password: "123" }));
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBeTruthy();
  });

  it("returns 409 if email already exists", async () => {
    prismaMock.user.findUnique.mockResolvedValue({ id: "1" });
    const res = await POST(createRequest({ email: "a@b.com", password: "password123" }));
    expect(res.status).toBe(409);
  });

  it("creates a user on valid input", async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);
    prismaMock.user.create.mockResolvedValue({ id: "1", email: "a@b.com" });
    const res = await POST(createRequest({ email: "a@b.com", password: "password123" }));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.email).toBe("a@b.com");
  });
});
