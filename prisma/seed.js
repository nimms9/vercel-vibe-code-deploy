const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const email = "demo@vitalens.app";
  const password = "DemoPass123!";
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });

  await prisma.profile.upsert({
    where: { userId: user.id },
    update: {
      ageRange: "30-39",
      sex: "female",
      dietStyle: "Balanced",
      goals: JSON.stringify(["energy", "immunity"]),
      allergies: "Nuts",
      budget: "$15-$35",
      healthFlags: JSON.stringify({ pregnancy: false, anticoagulants: false, thyroidMeds: false }),
    },
    create: {
      userId: user.id,
      ageRange: "30-39",
      sex: "female",
      dietStyle: "Balanced",
      goals: JSON.stringify(["energy", "immunity"]),
      allergies: "Nuts",
      budget: "$15-$35",
      healthFlags: JSON.stringify({ pregnancy: false, anticoagulants: false, thyroidMeds: false }),
    },
  });

  await prisma.plan.create({
    data: {
      userId: user.id,
      profileSnapshot: JSON.stringify({ ageRange: "30-39", dietStyle: "Balanced" }),
      recommendations: JSON.stringify({
        items: [
          {
            name: "Vitamin D3",
            dose: "1000–2000 IU daily",
            timing: "With food (morning or lunch)",
            why: "Supports immune function and bone health",
            cautions: ["Discuss with clinician if on blood thinners"],
          },
        ],
        estimatedMonthlyCost: "$15–$35",
      }),
      safetyNotes: "Not medical advice. Confirm dosing with a licensed clinician.",
      estimatedCost: "$15–$35",
    },
  });

  console.log("Seed complete. Demo user:", email, password);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
