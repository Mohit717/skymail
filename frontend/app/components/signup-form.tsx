"use client";

import { signup } from "@/app/actions/auth";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";

const SignupForm = () => {
  const [state, action, pending] = useActionState(signup, undefined);
  const hasErrors = state?.errors && Object.keys(state.errors).length > 0;
  const hasMessage = !!state?.message;
  return (
    <form className="pt-3" action={action}>
      {hasMessage && (
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ${state.message.includes("error") || state.message.includes("failed")
              ? "bg-red-50 text-red-700 border border-red-200"
              : "bg-green-50 text-green-700 border border-green-200"
              }`}
          >
            {state.message.includes("error") ? (
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            )}
            <span>{state.message}</span>
          </div>
        )}
      <div className="form-group">
        <label>Name</label>
        <div className="input-group">
          <div className="input-group-prepend bg-transparent">
            <span className="input-group-text bg-transparent border-right-0">
              <i className="ti-user text-primary"></i>
            </span>
          </div>
          <input type="text" name="name" className="form-control form-control-lg border-left-0" placeholder="Name" />
        </div>
        {state?.errors?.name && <p>{state.errors.name}</p>}
      </div>
      <div className="form-group">
        <label>Email</label>
        <div className="input-group">
          <div className="input-group-prepend bg-transparent">
            <span className="input-group-text bg-transparent border-right-0">
              <i className="ti-email text-primary"></i>
            </span>
          </div>
          <input type="email" name="email" className="form-control form-control-lg border-left-0" placeholder="Email" />
        </div>
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}
      <div className="form-group">
        <label>Password</label>
        <div className="input-group">
          <div className="input-group-prepend bg-transparent">
            <span className="input-group-text bg-transparent border-right-0">
              <i className="ti-lock text-primary"></i>
            </span>
          </div>
          <input type="password" name="password" className="form-control form-control-lg border-left-0" id="exampleInputPassword"
            placeholder="Password" />
        </div>
      </div>
      {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-3 d-grid gap-2">
        <button
          disabled={pending || hasErrors}
          className="btn btn-primary btn-lg fw-medium auth-form-btn d-flex items-center justify-center"
          type="submit"
        >
          {pending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {pending ? "REGISTERING..." : "REGISTER"}
        </button>
      </div>
      <div className="text-center mt-4 fw-light">
        Already have an account? <Link href="/login" className="text-primary">Login</Link>
      </div>
    </form>
  );
};

export default SignupForm;
