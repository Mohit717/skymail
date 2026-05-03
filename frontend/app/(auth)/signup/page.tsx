import SignupForm from "@/app/components/signup-form";
import React from "react";

const page = () => {
  return (
    <div className="auth-form-transparent text-start p-3">
      <div className="brand-logo">
        <img src="logo.png" alt="logo" loading="eager"/>
      </div>
      <h4>New here?</h4>
      <h6 className="fw-light">Join us today! It takes only few steps</h6>
      <SignupForm />
    </div>
  );
};

export default page;
