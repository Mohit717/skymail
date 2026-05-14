"use client";

import { Button } from "./ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

const SMTPCredentials = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-xs text-white/70">SMTP_USERNAME</p>
          <p className="font-mono text-sm break-all">{username}</p>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => copyToClipboard(username, "username")}
          className="ml-2 shrink-0"
        >
          {copiedField === "username" ? (
            <Check className="size-4" />
          ) : (
            <Copy className="size-4" />
          )}
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-xs text-white/70">SMTP_PASSWORD</p>
          <p className="font-mono text-sm break-all">{password}</p>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => copyToClipboard(password, "password")}
          className="ml-2 shrink-0"
        >
          {copiedField === "password" ? (
            <Check className="size-4" />
          ) : (
            <Copy className="size-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default SMTPCredentials;
