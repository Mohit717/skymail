import EmailListAside from "@/components/EmailListAside";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getEmailById } from "@/lib/dal/emailDAL";
import { formatFileSize, formatTime, getInitials, getSenderEmail, getSenderName } from "@/lib/utils";
import { Attachment } from "@/types/project";
import { Paperclip, Reply, Star } from "lucide-react";

export default async function ProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ emailId?: string, page?: number }>;
}) {
  const { id } = await params;
  const { emailId, page } = await searchParams;
  const email = emailId ? await getEmailById(emailId) : null;

  return (
    <div className="flex h-[calc(100vh-10rem)] overflow-hidden rounded-xl border border-border bg-background">
      <EmailListAside id={id} emailId={emailId} page={page}/>

      {/* Right panel: email detail */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {email ? (
          <>
            {/* Detail Header */}
            <div className="flex items-center gap-3 border-b border-border px-6 py-4">
              <Avatar className="size-10 shrink-0 text-sm">
                <AvatarFallback>
                  {getInitials(email.from || "")}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">
                  From: {getSenderName(email.from)}
                </p>
                <p className="text-xs text-muted-foreground">
                  To: {getSenderEmail(email.to)}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="text-xs text-muted-foreground">
                  {formatTime(email.createdAt)}
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
                {email.subject}
              </h1>

              {email.html ? (
                <div
                  className="prose dark:prose-invert max-w-none text-sm"
                  dangerouslySetInnerHTML={{ __html: email.html }}
                />
              ) : (
                <p className="whitespace-pre-wrap text-sm leading-relaxed">
                  {email.text}
                </p>
              )}

              {/* Attachments */}
              {(email.attachments?.length ?? 0) > 0 && (
                <div className="mt-8">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-sm font-semibold">Attachment</span>
                    <span className="text-xs text-muted-foreground">
                      Secured by secdata.ai
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {(email.attachments ?? []).map(
                      (att: Attachment, i: number) => (
                        <a
                          key={i}
                          href={`/api/attachments/${att.filename}`}
                          download
                          className="flex items-center gap-2 rounded-lg border border-border px-3 py-2"
                        >
                          <Paperclip className="size-4 text-muted-foreground" />
                          <span className="text-sm">{att.orgfilename}</span>
                          <span className="text-xs text-muted-foreground">
                            {formatFileSize(att.size ?? 0)}
                          </span>
                        </a>
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
