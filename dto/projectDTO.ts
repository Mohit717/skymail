import { ProjectType } from "@/types/project";

// dto/userDTO.ts
export function toUserDTO(project: ProjectType) {
    return {
        id: project._id.toString(),
        name: project.name,
        description: project.description,
        userId: project.userId,
        smtpUsername: project.smtpUsername,
        smtpPassword: project.smtpPassword,
        status: project.status,
    };
}