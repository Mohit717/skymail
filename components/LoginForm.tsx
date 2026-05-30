'use client'
import React, { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { login } from "@/app/actions/auth";
import { Loader, Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
  const [state, action, pending] = useActionState(login, undefined);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="space-y-4" action={action}>
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
        {state?.errors?.email && <p className="text-red-500 text-xs mb-0">{state.errors.email}</p>}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">
            Password
          </Label>
          <Link href="/forgot-password" className="text-xs text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
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
      
      <Button type="submit" className="mt-4 h-10 w-full text-sm" disabled={pending}>
        Sign In
        {pending && <Loader className="ml-2 h-4 w-4 animate-spin" />}
      </Button>
    </form>
  );
};

export default LoginForm;
