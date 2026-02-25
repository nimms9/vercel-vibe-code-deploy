import { z } from "zod";

export const signupSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const profileSchema = z.object({
  ageRange: z.string().min(1),
  sex: z.string().optional().nullable(),
  dietStyle: z.string().min(1),
  goals: z.array(z.string()).min(1),
  allergies: z.string().optional().default(""),
  budget: z.string().min(1),
  healthFlags: z
    .object({
      pregnancy: z.boolean().optional(),
      anticoagulants: z.boolean().optional(),
      thyroidMeds: z.boolean().optional(),
    })
    .optional()
    .default({}),
});

export const generatePlanSchema = z.object({
  profileId: z.string().optional(),
});
