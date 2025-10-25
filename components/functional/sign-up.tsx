"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Image from "next/image";
import { Languages, Loader2, X } from "lucide-react";
import { signIn, signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { signupSchema, type SignupSchema } from "@/lib/zschemas/sign-up-schema";
import { useHookFormActionState } from "@/lib/hooks/useHookFormActionState";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { submitSignUp } from "@/lib/actions/auth";
import { Instrument_Sans } from "next/font/google";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

export default function SignUp() {

  const defaultValues: SignupSchema = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  }
  const { formRef, form, runAction, state, isPending } = useHookFormActionState(submitSignUp, signupSchema, defaultValues);
  const { control, formState: { errors } } = form;
  const [oAuthLoading, setOAuthLoading] = useState(false);


  const formFields = [
    { name: "firstName", label: "First Name", type: "text" },
    { name: "lastName", label: "Last Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
    { name: "confirmPassword", label: "Confirm Password", type: "password" },
  ] as const;


  return (
    <>
      <div className="flex justify-start gap-x-4 items-center mb-6">
        <p className={`text-4xl font-[600] tracking-wide ${instrumentSans.className}`}>Literaid</p>
        <Languages className='h-10 w-10 ml-2 mr-4 font-semibold' />
      </div>
      <Card className="z-50   max-w-md">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">Sign Up</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form ref={formRef} onSubmit={runAction} className="space-y-3">
              {formFields.map((formField) => (
                <FormField
                  key={formField.name}
                  control={control}
                  name={formField.name}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-left gap-2">
                        <FormLabel>{formField.label}</FormLabel>
                        <FormMessage />
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          type={formField.type}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
              <div className="text-xs text-muted-foreground underline text-right">
                Already have an account? <Link href="/signin" className="text-primary hover:underline">Sign in</Link>
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending || oAuthLoading ? <Loader2 className="animate-spin" /> : "Sign Up"}
              </Button>

            </form>
          </Form>

          <div className={cn(
            "w-full gap-2 flex items-center mt-3",
            "justify-between flex-col"
          )}>

            <Button
              variant="outline"
              className={cn(
                "w-full gap-2"
              )}
              disabled={isPending || oAuthLoading}
              onClick={async () => {
                await signIn.social({
                  provider: "google",
                  callbackURL: "/app/dashboard"
                },
                  {
                    onRequest: (ctx) => {
                      setOAuthLoading(true);
                    },
                    onResponse: (ctx) => {
                      setOAuthLoading(false);
                    },
                    onError: (ctx) => {
                      console.log(ctx);
                    },

                  },
                );
              }}

            >
              <svg xmlns="http://www.w3.org/2000/svg" width="0.98em" height="1em" viewBox="0 0 256 262">
                <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"></path>
                <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
              </svg>
              Sign in with Google
            </Button>
            <Button
              variant="outline"
              className={cn(
                "w-full gap-2"
              )}
              disabled={isPending}

            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
                ></path>
              </svg>
              Sign in with Github
            </Button>
          </div>

        </CardContent>

      </Card>
    </>
  );
}

async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}