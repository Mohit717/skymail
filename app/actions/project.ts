'use server'
import { createProject, getProject } from "@/lib/dal/projectDAL"
import { ProjectFormSchema, ProjectFormState } from "@/lib/definitions"
import { redirect } from "next/navigation"
import * as crypto from 'crypto';
import { verifySession } from "@/lib/dal/dal"

const generateUniqueCredentials = async () => {
    // Generate a random base string
    const smtpUsername = "smtp_" + crypto.randomBytes(6).toString("hex");
    const smtpPassword = crypto.randomBytes(12).toString("base64url");

    // Ensure username uniqueness in DB
    const exists = await getProject({ smtpUsername });
    if (exists) {
        // retry if smtpUsername already exists (extremely unlikely)
        return generateUniqueCredentials();
    }

    return { smtpUsername, smtpPassword };
};

export async function addProject(state: ProjectFormState, formData: FormData) {
    // 1. Validate form fields
    const validatedFields = ProjectFormSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // 2. Prepare data for insertion into database
    const name = formData.get('name')?.toString().trim() || '';
    const description = formData.get('description')?.toString().trim() || '';

    const { userId } = await verifySession();

    const { smtpUsername, smtpPassword } = await generateUniqueCredentials();
    const project = await createProject({
        userId: userId.toString(),
        name,
        description,
        smtpUsername,
        smtpPassword,
    });

    if (!project) {
        return {
            message: 'An error occurred while creating new project.',
        }
    }

    redirect('/dashboard');
}