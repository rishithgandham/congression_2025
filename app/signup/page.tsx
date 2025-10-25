import SignUp from "@/components/functional/sign-up";
import { getSession } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignUpPage() {

    const session = await getSession({
        headers: await headers(),
    });

    // If user is already authenticated, redirect to dashboard
    if (session) {
        redirect("/app/dashboard");
    }   
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <SignUp />
            </div>
        </div>
    );
}