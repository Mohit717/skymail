import { fetchProfile } from "@/app/actions/main";
import { fetchProjects } from "@/app/actions/project";
import CreateProjectForm from "@/app/components/CreateProjectForm";
import { getRandomCard } from "@/app/lib/helper";
import Link from "next/link";

const page = async () => {
  const projects = await fetchProjects();
  const profile = await fetchProfile();

  return (
    <>
      <div className="row">
        <div className="col-md-12 grid-margin">
          <div className="row">
            <div className="col-12 col-xl-6 mb-4 mb-xl-0">
              <h3 className="fw-bold">Welcome {profile.name || profile.username}</h3>
            </div>
            <div className="col-12 col-xl-6 text-end">
              <CreateProjectForm />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {projects.length > 0 && (
          <>
            {projects.map((project: any, i: number) => (
              <div className="col-md-3 mb-4 stretch-card transparent" key={i}>
                <Link href={`/project/${project._id}`} className="text-decoration-none text-dark w-100">
                <div className={`card ${getRandomCard()}`}>
                  <div className="card-body">
                    <p className="fs-30 mb-2">{project.name}</p>
                    <p className="mb-4">{project.description}</p>
                    <p>
                      SMTP_USERNAME: {project.smtpUsername}
                      <br />
                      SMTP_PASSWORD: {project.smtpPassword}
                    </p>
                  </div>
                </div>
                </Link>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default page;
