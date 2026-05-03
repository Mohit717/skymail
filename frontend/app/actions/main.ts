'use server';
import { redirect } from "next/navigation";
import { SessionPayload } from "../lib/definitions";
import { getSession } from "../lib/session";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchProfile() {
    const session = await getSession() as SessionPayload;

    if (!session || !session.userId) {
        redirect('/login')
    }
    try {
        const res = await fetch(`${API_BASE_URL}/user/me`, {
            headers: {
                Authorization: `Bearer ${session.userId}`,
            },
        }) as any;
        const json = await res.json().catch(() => null)

        if (!res.ok) {
            return {
                message: json?.message || `Server error: ${res.status}`,
            }
        }
        return json
    } catch (error) {
        console.error('Fetch profile error:', error)
        return {
            message: 'An error occurred. Please try again.',
        }
    }
}