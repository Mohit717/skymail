import React from 'react'
import SignupForm from "@/components/SignupForm";
import Link from 'next/link';

const Signup = () => {
  return (
    <>
      <div className="mt-3 mb-6 text-center">
        <h1 className="text-lg font-semibold tracking-tight">Create an Account</h1>
        <p className="text-sm text-neutral-400">
          Sign up to get started with SkyMail.
        </p>
      </div>
      <SignupForm />
      <p className="mt-5 text-center text-sm text-neutral-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline"
        >
          Login
        </Link>
      </p>
    </>
  )
}

export default Signup