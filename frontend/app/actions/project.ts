'use server'
import { redirect } from "next/navigation";
import { NewProjectFormSchema, ProjectState, SessionPayload } from "../lib/definitions";
import { getSession } from "../lib/session";
import { revalidatePath } from 'next/cache';

export async function createProject(state: ProjectState, formData: FormData) {
    const session = await getSession() as SessionPayload;

    if (!session || !session.userId) {
        redirect('/login')
    }
    try {
        // 1. Validate form fields
        const validatedFields = NewProjectFormSchema.safeParse({
            name: formData.get('name'),
            description: formData.get('description'),
        })

        // If any form fields are invalid, return early
        if (!validatedFields.success) {
            console.log('Validation failed', validatedFields.error.flatten().fieldErrors)
            return {
                errors: validatedFields.error.flatten().fieldErrors,
            }
        }

        // 2. Call API with timeout and error handling
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.userId}`,
            },
            body: JSON.stringify(validatedFields.data)
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project`, requestOptions) as any;
        const json = await res.json().catch(() => null)
        console.log('API response', { res, json })
        if (!res.ok) {
            return {
                message: json?.message || `Server error: ${res.status}`,
            }
        }
        revalidatePath('/dashboard');
        return { message: json.message || 'Project created successfully!' };
    } catch (error) {
        console.error('Create project error:', error)
        return {
            message: 'An error occurred. Please try again.',
        }
    }
    // redirect('/dashboard')
}

export async function fetchProjects() {
    const session = await getSession() as SessionPayload;

    if (!session || !session.userId) {
        redirect('/login')
    }
    try {
        // Call API with timeout and error handling
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.userId}`,
            },
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project`, requestOptions) as any;
        const json = await res.json().catch(() => null)

        if (!res.ok) {
            return {
                message: json?.message || `Server error: ${res.status}`,
            }
        }
        return json;
    } catch (error) {
        console.error('Fetch projects error:', error)
        return {
            message: 'An error occurred. Please try again.',
        }
    }
}