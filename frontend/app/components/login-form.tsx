"use client";
import { login } from "@/app/actions/auth";
import { useActionState } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";

const LoginForm = () => {
  const [state, action, pending] = useActionState(login, undefined);

  const hasErrors = state?.errors && Object.keys(state.errors).length > 0;
  const hasMessage = !!state?.message;

  return (
    <form action={action} className="pt-3">
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
          <label htmlFor="exampleInputEmail">Email</label>
          <div className="input-group">
            <div className="input-group-prepend bg-transparent">
              <span className="input-group-text bg-transparent border-right-0">
                <i className="ti-user text-primary"></i>
              </span>
            </div>
            <input type="email" className={`form-control form-control-lg border-left-0 ${state?.errors?.email ? "border-red-500" : ""}`} id="exampleInputEmail"
              placeholder="Email" disabled={pending} name="email"
            />
            {state?.errors?.email && (
              <p className="text-red-600">{state.errors.email[0]}</p>
            )}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword">Password</label>
          <div className="input-group">
            <div className="input-group-prepend bg-transparent">
              <span className="input-group-text bg-transparent border-right-0">
                <i className="ti-lock text-primary"></i>
              </span>
            </div>
            <input type="password" name="password" className={`form-control form-control-lg border-left-0 ${state?.errors?.password ? "border-red-500" : ""}`} id="exampleInputPassword"
              placeholder="Password"
              disabled={pending}
            />
          </div>
          {state?.errors?.password && (
              <p className="text-red-600 text-xs space-y-1">
                <span className="font-semibold mb-1">Password must:</span>
                <ul className="list-disc list-inside space-y-0.5">
                  {state.errors.password.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              </p>
            )}
        </div>
        <div className="my-2 d-flex justify-content-between align-items-center">
          <Link href="/forgot-password" className="auth-link text-primary">Forgot password?</Link>
        </div>
        <div className="my-3 d-grid gap-2">
          <button
            disabled={pending || hasErrors}
            className="btn btn-block btn-primary btn-lg fw-medium auth-form-btn d-flex items-center justify-center"
            type="submit"
          >
            {pending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {pending ? "SIGNING IN..." : "LOGIN"}
          </button>
        </div>
        <div className="text-center mt-4 fw-light">
          Don't have an account? <Link href="/signup" className="text-primary">Create</Link>
        </div>
      </form>
  );
};

export default LoginForm;
