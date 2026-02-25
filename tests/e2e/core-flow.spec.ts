import { test, expect } from "@playwright/test";

const demoEmail = "demo@vitalens.app";
const demoPassword = "DemoPass123!";

const profileData = {
  ageRange: "30-39",
  dietStyle: "Balanced",
  budget: "$15-$35",
};

test("core flow: login → profile → generate plan → history", async ({ page }) => {
  await page.goto("/login");

  await page.fill('input[placeholder="Email"]', demoEmail);
  await page.fill('input[placeholder="Password"]', demoPassword);
  await page.click('button:has-text("Sign in")');

  await page.waitForURL("**/dashboard");
  await page.goto("/profile");

  await page.getByLabel("Age range").selectOption(profileData.ageRange);
  await page.getByLabel("Diet style").selectOption(profileData.dietStyle);
  await page.getByLabel("Budget range").selectOption(profileData.budget);

  await page.click('button:has-text("Save & generate plan")');
  await page.waitForTimeout(1000);

  await page.goto("/plan");
  await expect(page.locator("text=Your plan")).toBeVisible();

  await page.goto("/history");
  await expect(page.locator("text=Plan history")).toBeVisible();
});
