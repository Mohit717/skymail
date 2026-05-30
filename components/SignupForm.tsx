"use client";
import { signup } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader, Eye, EyeOff } from "lucide-react";
import { useActionState, useState } from "react";

const SignupForm = () => {
  const [state, action, pending] = useActionState(signup, undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form className="space-y-4" action={action}>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="firstName">
            First Name
          </Label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="John"
          />
          {state?.errors?.firstName && (
            <p className="text-red-500 text-xs mb-0">
              {state.errors.firstName}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">
            Last Name
          </Label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Doe"
          />
          {state?.errors?.lastName && (
            <p className="text-red-500 text-xs mb-0">{state.errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="you@example.com"
        />
        {state?.errors?.email && (
          <p className="text-red-500 text-xs mb-0">{state.errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
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
        <Label htmlFor="confirmPassword">
          Confirm Password
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm your password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
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
