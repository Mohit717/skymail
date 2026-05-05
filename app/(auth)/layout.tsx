import Image from "next/image";
import SwitchMode from "@/components/SwitchMode";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full flex flex-col">
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-950 px-4 py-10 text-neutral-100">
        <div className="pointer-events-none absolute -top-28 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-36 right-0 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />

        <div className="absolute right-4 top-4 z-20 sm:right-6 sm:top-6">
          <SwitchMode />
        </div>

        <section className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-neutral-900/85 p-6 shadow-2xl backdrop-blur sm:p-8">
          <div className="flex flex-col items-center text-center">
            <Image
              src="/logo.png"
              alt="SkyMail logo"
              width={240}
              height={68}
              className="h-14 w-auto object-contain"
              priority
            />
          </div>
          {children}
        </section>
      </main>
    </div>
  );
}
