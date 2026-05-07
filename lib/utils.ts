import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const MAX_LIMIT = 10;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getInitials = (from: string | undefined) => {
  const name = from?.split("<")[0]?.trim() || from || "?";
  const words = name.trim().split(/\s+/);
  return words
    .slice(0, 2)
    .map((w: string) => w[0]?.toUpperCase())
    .join("");
}

export const formatTime = (date: Date | string) => {
  const inputDate = new Date(date);
  const today = new Date();

  const isToday =
    inputDate.getDate() === today.getDate() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getFullYear() === today.getFullYear();

  if (isToday) {
    return inputDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return inputDate.toLocaleDateString([], {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatFileSize = (bytes: number) => {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(0)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${bytes} B`;
}

export const getSenderName = (from: string | undefined) => {
  return from?.split("<")[0]?.trim() || from || "Unknown";
};

export const getSenderEmail = (from: string | undefined) => {
  return from?.match(/<(.+)>/)?.[1] || from || "";
}