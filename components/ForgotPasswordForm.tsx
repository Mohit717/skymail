import { Button } from "./ui/button";

const ForgotPasswordForm = () => {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          className="h-10 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-neutral-100 outline-none ring-offset-background transition placeholder:text-neutral-500 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/35"
        />
      </div>

      <Button type="submit" className="mt-4 h-10 w-full text-sm">
        Reset Password
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
