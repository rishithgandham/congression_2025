'use client';
import { useActionState } from "react";
import { z } from "zod";
import { useRef, useEffect, startTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodType } from "zod";

type FormState<T> = {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  success: boolean;
  message?: string;
};

export function useHookFormActionState<T extends ZodType<any, any, any>>(
  action: (prev: FormState<z.infer<T>>, formData: FormData) => Promise<FormState<z.infer<T>>>,
  schema: T,
  defaultValues: z.infer<T>,
) {
  const formRef = useRef<HTMLFormElement>(null);
  const initial: FormState<z.infer<T>> = {
    values: defaultValues,
    errors: {},
    success: false,
    message: undefined,
  };
  const [state, actionInvoker, isPending] = useActionState(action, initial);
  const form = useForm<z.input<T>, any, z.output<T>>({
    resolver: zodResolver(schema),
    defaultValues: state.values,
    mode: "onBlur",
  });


  useEffect(() => {
    for (const key in state.errors) {
      console.log("Setting error for key:", key, "with message:", state.errors[key as any]);
      form.setError(key as any, { message: state.errors[key as any]! });
    }
  }, [state.errors, form]);

  const runAction = form.handleSubmit(() =>
    startTransition(() => {
      actionInvoker(new FormData(formRef.current!));
    })
  );

  return { formRef, form, state, isPending, runAction };
}
