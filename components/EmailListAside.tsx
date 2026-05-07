import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  formatTime,
  getInitials,
  getSenderEmail,
  getSenderName,
} from "@/lib/utils";
import { getEmailsByProjectId } from "@/lib/dal/emailDAL";
import { EmailType } from "@/types/project";
import Link from "next/link";
import { ArrowLeftSquare, ArrowRightSquare } from "lucide-react";

type EmailListAsideProps = {
  id: string;
  emailId?: string;
  page?: number;
};

type EmailListResponse = {
  data: EmailType[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
};

const EmailListAside = async ({ id, emailId, page }: EmailListAsideProps) => {
  const { data: emails, pagination }: EmailListResponse = await getEmailsByProjectId(id, page || 1);

  return (
    <aside className="w-87 shrink-0 overflow-y-auto border-r border-border">
      {emails.length === 0 ? (
        <div className="flex h-full items-center justify-center p-8 text-sm text-muted-foreground">
          No emails yet
        </div>
      ) : (
        <>
          {emails.map((email: EmailType) => (
            <Link
              key={email._id.toString()}
              href={`/project/${id}?emailId=${email._id}&page=${page || 1}`}
              className={`flex gap-3 border-b border-border px-4 py-3 transition-colors hover:bg-muted ${emailId === email._id.toString() ? "bg-muted" : ""
                }`}
            >
              <Avatar className="size-9 shrink-0 text-xs">
                <AvatarFallback>{getInitials(email.from || "")}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-semibold">
                    {getSenderName(email.subject)}
                  </span>
                  {/* <span className="shrink-0 text-[11px] text-muted-foreground">
                    {formatTime(email.createdAt)}
                  </span> */}
                </div>
                <p className="truncate text-xs text-muted-foreground">
                  {getSenderEmail(email.from)}
                </p>
                <p className="shrink-0 text-[11px] text-muted-foreground">
                  {formatTime(email.createdAt)}
                </p>
              </div>
            </Link>
          ))}

          <div className="flex items-center justify-center p-4">
            {pagination.hasPrevPage && (
              <Link
                className="text-sm text-muted-foreground transition-colors hover:text-foreground mr-4"
                href={`/project/${id}?emailId=${emailId}&page=${pagination.page - 1}`}
              >
                <ArrowLeftSquare />
              </Link>
            )}
            {pagination.page} / {pagination.totalPages}
            {pagination.hasNextPage && (
              <Link
                className="text-sm text-muted-foreground transition-colors hover:text-foreground ml-4"
                // disabled={!pagination.hasNextPage}
                href={`/project/${id}?emailId=${emailId || ""}&page=${pagination.page + 1}`}
              >
                <ArrowRightSquare />
              </Link>
            )}
          </div>
        </>
      )}
    </aside>
  );
};

export default EmailListAside;
