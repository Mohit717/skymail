import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getEmailsByProjectId } from "@/lib/dal/emailDAL";
import { Paperclip, Reply, Star } from "lucide-react";
import Link from "next/link";

type Attachment = {
  filename?: string;
  contentType?: string;
  size?: number;
  path?: string;
};

type EmailType = {
  _id: { toString(): string };
  from?: string;
  to?: string;
  subject?: string;
  text?: string;
  html?: string;
  attachments?: Attachment[];
  createdAt: Date | string;
};

function getInitials(from: string | undefined) {
  const name = from?.split("<")[0]?.trim() || from || "?";
  const words = name.trim().split(/\s+/);
  return words
    .slice(0, 2)
    .map((w: string) => w[0]?.toUpperCase())
    .join("");
}

function formatTime(date: Date | string) {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatFileSize(bytes: number) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(0)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${bytes} B`;
}

function getSenderName(from: string | undefined) {
  return from?.split("<")[0]?.trim() || from || "Unknown";
}

function getSenderEmail(from: string | undefined) {
  return from?.match(/<(.+)>/)?.[1] || from || "";
}

export default async function ProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ emailId?: string }>;
}) {
  const { id } = await params;
  const { emailId } = await searchParams;

  const emails: EmailType[] = await getEmailsByProjectId(id);

  const selectedEmail: EmailType | null =
    (emailId
      ? emails.find((e: EmailType) => e._id.toString() === emailId)
      : emails[0]) ?? null;

  return (
    <div className="flex h-[calc(100vh-10rem)] overflow-hidden rounded-xl border border-border bg-background">
      {/* Left panel: email list */}
      <aside className="w-72 shrink-0 overflow-y-auto border-r border-border">
        {emails.length === 0 && (
          <div className="flex h-full items-center justify-center p-8 text-sm text-muted-foreground">
            No emails yet
          </div>
        )}
        {emails.map((email: EmailType) => {
          const isSelected =
            selectedEmail?._id.toString() === email._id.toString();
          const initials = getInitials(email.from || "");
          return (
            <Link
              key={email._id.toString()}
              href={`/project/${id}?emailId=${email._id}`}
              className={`flex gap-3 border-b border-border px-4 py-3 transition-colors hover:bg-muted ${
                isSelected ? "bg-muted" : ""
              }`}
            >
              <Avatar className="size-9 shrink-0 text-xs">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-semibold">
                    {getSenderName(email.from)}
                  </span>
                  <span className="shrink-0 text-[11px] text-muted-foreground">
                    {formatTime(email.createdAt)}
                  </span>
                </div>
                <p className="truncate text-xs text-muted-foreground">
                  {getSenderEmail(email.from)}
                </p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {email.subject || email.text?.slice(0, 60)}
                </p>
              </div>
            </Link>
          );
        })}
      </aside>

      {/* Right panel: email detail */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {selectedEmail ? (
          <>
            {/* Detail header */}
            <div className="flex items-center gap-3 border-b border-border px-6 py-4">
              <Avatar className="size-10 shrink-0 text-sm">
                <AvatarFallback>
                  {getInitials(selectedEmail.from || "")}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">
                  {getSenderName(selectedEmail.from)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {getSenderEmail(selectedEmail.from)}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="text-xs text-muted-foreground">
                  {formatTime(selectedEmail.createdAt)}
                </span>
                <button className="text-muted-foreground transition-colors hover:text-foreground">
                  <Reply className="size-4" />
                </button>
                <button className="text-muted-foreground transition-colors hover:text-foreground">
                  <Star className="size-4" />
                </button>
              </div>
            </div>

            {/* Detail body */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <h1 className="mb-6 text-2xl font-bold">
                {selectedEmail.subject}
              </h1>

              {selectedEmail.html ? (
                <div
                  className="prose dark:prose-invert max-w-none text-sm"
                  dangerouslySetInnerHTML={{ __html: selectedEmail.html }}
                />
              ) : (
                <p className="whitespace-pre-wrap text-sm leading-relaxed">
                  {selectedEmail.text}
                </p>
              )}

              {/* Attachments */}
              {(selectedEmail.attachments?.length ?? 0) > 0 && (
                <div className="mt-8">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-sm font-semibold">Attachment</span>
                    <span className="text-xs text-muted-foreground">
                      Secured by secdata.ai
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {(selectedEmail.attachments ?? []).map(
                      (att: Attachment, i: number) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 rounded-lg border border-border px-3 py-2"
                        >
                          <Paperclip className="size-4 text-muted-foreground" />
                          <span className="text-sm">{att.filename}</span>
                          <span className="text-xs text-muted-foreground">
                            {formatFileSize(att.size ?? 0)}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
            Select an email to read
          </div>
        )}
      </div>
    </div>
  );
}
