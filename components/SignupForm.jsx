"use client";
import { signup } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useActionState } from "react";

const inputClass =
  "h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-neutral-100 outline-none ring-offset-background transition placeholder:text-neutral-500 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/35";

const SignupForm = () => {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <form className="space-y-4" action={action}>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <label htmlFor="firstName" className="text-sm font-medium">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="John"
            className={inputClass}
          />
          {state?.errors?.firstName && (
            <p className="text-red-500 text-xs mb-0">
              {state.errors.firstName}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="lastName" className="text-sm font-medium">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Doe"
            className={inputClass}
          />
          {state?.errors?.lastName && (
            <p className="text-red-500 text-xs mb-0">{state.errors.lastName}</p>
          )}
        </div>
      </div>

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
        {state?.errors?.email && (
          <p className="text-red-500 text-xs mb-0">{state.errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
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

      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          className={inputClass}
        />
        {state?.errors?.confirmPassword && (
          <p className="text-red-500 text-xs mb-0">
            {state.errors.confirmPassword}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="mt-4 h-10 w-full text-sm"
        disabled={pending}
      >
        Sign Up
        {pending && <Loader className="ml-2 h-4 w-4 animate-spin" />}
      </Button>
    </form>
  );
};

export default SignupForm;
