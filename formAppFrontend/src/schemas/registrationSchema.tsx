import { z } from "zod";

export const registrationSchema = z
    .object({
        fullName: z.string().min(1, "Full Name is required"),
        email: z.string().email("Invalid email address"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            .regex(/\d/, "Password must contain at least one number")
            .regex(/[\W_]/, "Password must contain at least one special character"), // Special character regex
        confirmPassword: z.string().min(1, "Confirm Password is required"), // Added confirm password
        gender: z.enum(["MALE", "FEMALE", "OTHER"], {
            errorMap: () => ({ message: "Invalid gender" }),
        }),
        country: z.string().min(1, "Country is required"),
        termsAccepted: z.boolean().refine((val) => val, "You must accept the terms and conditions"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"], // Error will be attached to confirmPassword
    });

export type RegistrationFormData = z.infer<typeof registrationSchema>;
