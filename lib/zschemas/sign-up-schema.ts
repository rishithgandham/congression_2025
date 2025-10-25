import { z } from "zod" ;

export const signupSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Must be at least 8 characters long"),
    confirmPassword: z.string().min(8, " "),
}).refine((data) => data.password == data.confirmPassword,
    {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

export type SignupSchema = z.infer<typeof signupSchema>;