import { JWTPayload } from 'jose';
import * as z from 'zod'

export const SignupFormSchema = z.object({
    firstName: z
        .string()
        .min(2, { error: 'First name must be at least 2 characters long.' })
        .trim(),
    lastName: z
        .string()
        .min(2, { error: 'Last name must be at least 2 characters long.' })
        .trim(),
    email: z.email({ error: 'Please enter a valid email.' }).trim(),
    password: z
        .string()
        .min(8, { error: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
        .regex(/[0-9]/, { error: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            error: 'Contain at least one special character.',
        })
        .trim(),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
});

export type SignUpFormState =
    | {
        errors?: {
            firstName?: string[]
            lastName?: string[]
            email?: string[]
            password?: string[]
            confirmPassword?: string[]
        }
        message?: string
    }
    | undefined

export const LoginFormSchema = z.object({
    email: z.email({ error: 'Please enter a valid email.' }).trim(),
    password: z
        .string()
        .min(8, { error: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
        .regex(/[0-9]/, { error: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            error: 'Contain at least one special character.',
        })
        .trim(),
});

export type LoginFormState =
    | {
        errors?: {
            email?: string[]
            password?: string[]
        }
        message?: string
    }
    | undefined

export const ProjectFormSchema = z.object({
    name: z
        .string()
        .min(5, { error: 'Project name must be at least 5 characters long.' })
        .trim(),
});

export type ProjectFormState =
    | {
        errors?: {
            name?: string[]
            description?: string[]
        }
        message?: string
    }
    | undefined

export interface SessionPayload extends JWTPayload {
    userId: string;
    expiresAt: string; // or number (unix timestamp)
}