import CreateProject from "@/components/CreateProject";
import SMTPCredentials from "@/components/SMTPCredentials";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { verifySession } from "@/lib/dal/dal";
import { getProjects } from "@/lib/dal/projectDAL";
import { getUserById } from "@/lib/dal/userDAL";
import { ProjectType } from "@/types/project";
import Link from "next/link";

export default async function DashboardPage() {
  const { userId } = await verifySession();
  const user = await getUserById(userId as string);
  const projects = await getProjects({ userId: userId as string });
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          Welcome {user?.firstName} {user?.lastName}
        </h1>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 auto-rows-fr">
        {projects.length > 0 && (
          <>
            {projects.map((project: ProjectType) => (
              <Card key={project._id.toString()}
                className={`relative flex h-full flex-col overflow-hidden border-0 p-4 shadow-lg bg-linear-to-br from-violet-600 to-purple-500`}
              >
                {/* Blurred blob at top */}
                <div>
                  <h3 className="text-xl font-bold">{project.name}</h3>
                  <p className="mb-0">{project.description}</p>
                </div>
                <div className="mt-auto">
                  <SMTPCredentials
                    username={project.smtpUsername}
                    password={project.smtpPassword}
                  />
                </div>
                <Button asChild className="w-full">
                  <Link href={`/project/${project._id}`} className="w-full">
                    View Details
                  </Link>
                </Button>
              </Card>
            ))}
          </>
        )}
        <CreateProject />
      </section>
    </>
  );
}
