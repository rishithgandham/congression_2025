'use server';
import { headers } from "next/headers";
import { signinSchema, type SigninSchema } from "@/lib/zschemas/sign-in-schema";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";



const { APIError } = await import("better-auth/api")



type SigninState = {
    values: SigninSchema;
    errors: Partial<Record<keyof SigninSchema, string>>;
    success: boolean;
    message?: string;
};

export async function submitSignIn(
    prev: SigninState,
    formData: FormData
): Promise<SigninState> {

    // Validate the form data
    const values = Object.fromEntries(formData.entries()) as SigninSchema;
    const result = signinSchema.safeParse(values);

    if (!result.success) {
        const errs: SigninState["errors"] = {};
        for (const issue of result.error.issues) {
            errs[issue.path[0] as keyof SigninSchema] = issue.message;
        }
        return { values, errors: errs, success: false };
    }

    // Sign in the user
    try {
        const response = await auth.api.signInEmail({
            body: {
                email: values.email,
                password: values.password,
            },
            headers: await headers(),
        })
    } catch (error) {
        if (error instanceof APIError) {
            if (error.body?.code == "USER_NOT_FOUND") {
                return { values, errors: { email: "Email not found" }, success: false };
            }
            else if (error.body?.code == "INVALID_EMAIL_OR_PASSWORD") {
                return { values, errors: { email: "Invalid email or password", password: "Invalid email or password" }, success: false };
            }
        }
        else return { values, message: "An error occurred", errors: {}, success: false };
    }

    // Redirect to the dashboard
    redirect("/app/dashboard")

    return { values, errors: {}, success: true, message: "Signed in!" };
}