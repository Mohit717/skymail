import { fetchEmails } from "@/app/actions/email";
import EmailViewer from "@/app/components/EmailViewer";

interface ProjectViewerPageProps {
  params: Promise<{ projectId: string }>;
}

const page = async ({
  params
}: ProjectViewerPageProps) => {
  const { projectId } = await params;
  const emails = (await fetchEmails(projectId)) as any;

  return <EmailViewer emails={emails} />
};

export default page;
