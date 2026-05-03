import LoginForm from "@/app/components/login-form";
import React from "react";

const page = () => {
  return (
    <div className="auth-form-transparent text-start p-3">
      <div className="brand-logo">
        <img src="logo.png" alt="logo" loading="eager"/>
      </div>
      <h4>Welcome back!</h4>
      <h6 className="fw-light">Happy to see you again!</h6>
      <LoginForm />
    </div>
  );
};

export default page;
