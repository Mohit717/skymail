export interface ProjectType {
    _id: string;
    name: string;
    description: string;
    userId: string;
    smtpUsername: string;
    smtpPassword: string;
    status: boolean;
}

export type Attachment = {
    filename?: string;
    orgfilename?: string;
    contentType?: string;
    size?: number;
    path?: string;
};

export type EmailType = {
    _id: { toString(): string };
    from?: string;
    to?: string;
    subject?: string;
    text?: string;
    html?: string;
    attachments?: Attachment[];
    createdAt: Date | string;
};
