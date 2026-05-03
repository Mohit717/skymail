import * as z from 'zod'

export const SignupFormSchema = z.object({
    name: z
        .string()
        .min(2, { error: 'Name must be at least 2 characters long.' })
        .trim(),
    email: z.email({ error: 'Please enter a valid email.' }).trim(),
    password: z
        .string()
        .min(6, { error: 'Be at least 6 characters long' })
        .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
        .regex(/[0-9]/, { error: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            error: 'Contain at least one special character.',
        })
        .trim(),
})

export const LoginFormSchema = z.object({
    email: z.email({ error: 'Please enter a valid email.' }).trim(),
    password: z
        .string()
        .min(6, { error: 'Be at least 6 characters long' })
        .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
        .regex(/[0-9]/, { error: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            error: 'Contain at least one special character.',
        })
        .trim(),
})

export const NewProjectFormSchema = z.object({
    name: z
        .string()
        .min(2, { error: 'Name must be at least 2 characters long.' })
        .trim(),
    description: z
        .string()
        .min(6, { error: 'Description must be at least 6 characters long.' })
        .trim(),
})

export type SignupFormState =
    | {
        errors?: {
            name?: string[]
            email?: string[]
            password?: string[]
        }
        message?: string
    }
    | undefined

export type ProjectState =
    | {
        errors?: {
            name?: string[]
            description?: string[]
            smtpUsername?: string[]
            smtpPassword?: string[]
        }
        message?: string
    }
    | undefined

export type LoginFormState =
    | {
        errors?: {
            email?: string[]
            password?: string[]
        }
        message?: string
    }
    | undefined

export type SessionPayload = {
    userId: string
    expiresAt: Date
}