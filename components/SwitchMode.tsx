"use client";
import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Switch } from "radix-ui";

function getPreferredTheme() {
  if (typeof window === "undefined") return true;

  const stored = window.localStorage.getItem("theme");
  if (stored === "dark") return true;
  if (stored === "light") return false;

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

const SwitchMode = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setIsDark(getPreferredTheme());
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    window.localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 backdrop-blur">
      {isDark ? (
        <Moon className="size-4 text-neutral-300" />
      ) : (
        <Sun className="size-4 text-neutral-300" />
      )}
      <Switch.Root
        checked={isDark}
        onCheckedChange={setIsDark}
        aria-label="Toggle dark mode"
        className="relative h-5 w-9 rounded-full bg-neutral-600/70 transition data-[state=checked]:bg-primary"
      >
        <Switch.Thumb className="block size-4 translate-x-0.5 rounded-full bg-white shadow transition-transform data-[state=checked]:translate-x-4.5" />
      </Switch.Root>
    </div>
  );
};

export default SwitchMode;
