"use client";

import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <div className="mt-3 mb-6 text-center">
        <h1 className="text-lg font-semibold tracking-tight">Welcome Back</h1>
        <p className="text-sm text-neutral-400">
          Sign in to continue to SkyMail.
        </p>
      </div>
      <LoginForm />
      <p className="mt-5 text-center text-sm text-neutral-400">
        New to SkyMail?{" "}
        <Link
          href="/signup"
          className="font-medium text-primary hover:underline"
        >
          Create an account
        </Link>
      </p>
    </>
  );
}
