import CreateProject from "@/components/CreateProject";
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

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {projects.length > 0 && (
          <>
            {projects.map((project: ProjectType) => (
              <Link key={project._id} href={`/project/${project._id}`}>
                <Card
                  className={`relative flex flex-col overflow-hidden border-0 p-4 shadow-lg bg-linear-to-br from-violet-600 to-purple-500`}
                >
                  {/* Blurred blob at top */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold">{project.name}</h3>
                    <p className="mb-0">{project.description}</p>
                  </div>

                  {/* SMTP credentials */}
                  <div className="mt-auto space-y-0.5 text-xs text-white/90">
                    <p>
                      <span className="font-semibold">SMTP_USERNAME:</span>{" "}
                      {project.smtpUsername}
                    </p>
                    <p>
                      <span className="font-semibold">SMTP_PASSWORD:</span>{" "}
                      {project.smtpPassword}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </>
        )}
        <CreateProject />
      </section>
    </>
  );
}
