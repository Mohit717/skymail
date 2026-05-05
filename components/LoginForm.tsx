'use client'
import React, { useActionState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { login } from "@/app/actions/auth";
import { Loader } from "lucide-react";

const inputClass = "h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-neutral-100 outline-none ring-offset-background transition placeholder:text-neutral-500 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/35"

const LoginForm = () => {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <form className="space-y-4" action={action}>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="you@example.com"
          className={inputClass}
        />
        {state?.errors?.email && <p className="text-red-500 text-xs mb-0">{state.errors.email}</p>}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <Link href="/forgot-password" className="text-xs text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Enter your password"
          className={inputClass}
        />
        {state?.errors?.password && (
          <div className="text-red-500 text-xs mb-0"> 
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <Button type="submit" className="mt-4 h-10 w-full text-sm" disabled={pending}>
        Sign In
        {pending && <Loader className="ml-2 h-4 w-4 animate-spin" />}
      </Button>
    </form>
  );
};

export default LoginForm;
