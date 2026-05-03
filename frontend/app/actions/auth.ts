import { LoginFormSchema, LoginFormState, SignupFormSchema, SignupFormState } from '@/app/lib/definitions'
import { redirect } from 'next/navigation'
import { createSession, deleteSession } from '@/app/lib/session'

export async function signup(state: SignupFormState, formData: FormData) {
    try {
        // 1. Validate form fields
        const validatedFields = SignupFormSchema.safeParse({
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(validatedFields.data)
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, requestOptions) as any;
        const json = await res.json().catch(() => null)

        if (!res.ok) {
            return {
                message: json?.message || `Server error: ${res.status}`,
            }
        }
    } catch (error) {
        console.error('Signup error:', error)
        return {
            message: 'An error occurred. Please try again.',
        }
    }

    redirect('/verify-email')
}

export async function login(state: LoginFormState, formData: FormData) {
    try {
        // 1. Validate form fields
        const validatedFields = LoginFormSchema.safeParse({
            email: formData.get('email'),
            password: formData.get('password'),
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(validatedFields.data)
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, requestOptions) as any;
        const json = await res.json().catch(() => null)

        if (!res.ok) {
            return {
                message: json?.message || `Server error: ${res.status}`,
            }
        }

        // 5. Validate response has required data (accessToken)
        if (!json?.accessToken) {
            return {
                message: 'Invalid response from server',
            }
        }
        // 6. Create session with accessToken
        await createSession(json.accessToken)
    } catch (error) {
        // 7. Network errors, JSON parse errors, etc.
        console.error('Signin error:', error)
        return {
            message: 'An error occurred. Please try again.',
        }
    }

    // 5. Redirect user
    redirect('/dashboard')
}

export async function logout() {
    await deleteSession()
    redirect('/login')
}