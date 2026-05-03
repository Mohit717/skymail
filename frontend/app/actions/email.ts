'use server'
import { redirect } from "next/navigation";
import { SessionPayload } from "../lib/definitions";
import { getSession } from "../lib/session";
import { revalidatePath } from 'next/cache';

export async function fetchEmails(projectId: string) {
    const session = await getSession() as SessionPayload;

    if (!session || !session.userId) {
        redirect('/login')
    }
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.userId}`,
            },
        }
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/email/emails?projectId=${projectId}`, requestOptions) as any;
        const json = await res.json().catch(() => null)

        if (!res.ok) {
            return {
                message: json?.message || `Server error: ${res.status}`,
            }
        }
        return json;
    } catch (error) {
        console.error('Fetch emails error:', error)
        return {
            message: 'An error occurred. Please try again.',
        }
    }
}

export async function fetchEmailContent(emailId: string) {
    const session = await getSession() as SessionPayload;

    if (!session || !session.userId) {
        redirect('/login')
    }
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.userId}`,
            },
        }
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/email/${emailId}`, requestOptions) as any;
        const json = await res.json().catch(() => null)

        if (!res.ok) {
            return {
                message: json?.message || `Server error: ${res.status}`,
            }
        }
        return json;
    } catch (error) {
        console.error('Fetch email content error:', error)
        return {
            message: 'An error occurred. Please try again.',
        }
    }
}

export async function deleteEmailContent(emailId: string, projectId: string) {
    const session = await getSession() as SessionPayload;

    if (!session || !session.userId) {
        redirect('/login')
    }
    try {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.userId}`,
            },
        }
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/email/${emailId}`, requestOptions) as any;
        const json = await res.json().catch(() => null)

        if (!res.ok) {
            return {
                message: json?.message || `Server error: ${res.status}`,
            }
        }
        revalidatePath(`/project/${projectId}`);
        return { message: json.message || 'Email deleted successfully!' };
    } catch (error) {
        console.error('Delete email content error:', error)
        return {
            message: 'An error occurred. Please try again.',
        }
    }
}

