import LoginForm from '@/components/LoginForm'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
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
  )
}

export default page