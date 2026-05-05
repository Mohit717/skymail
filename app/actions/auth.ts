'use server'
import { createUser, getUser } from "@/lib/dal/userDAL"
import { LoginFormSchema, LoginFormState, SignupFormSchema, SignUpFormState } from "@/lib/definitions"
import { createSession, deleteSession } from "@/lib/session"
import bcrypt from "bcrypt"
import { redirect } from "next/navigation"

export async function signup(state: SignUpFormState, formData: FormData) {
    // 1. Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // 2. Prepare data for insertion into database
    const { firstName, lastName, email, password } = validatedFields.data
    // e.g. Hash the user's password before storing it
    const hashedPassword = await bcrypt.hash(password, 10)

    // 3. Insert the user into the database or call an Auth Library's API
    const user = await createUser({
        firstName,
        lastName,
        email: email.toLowerCase(),
        username: email.toLowerCase().split('@')[0],
        password: hashedPassword,
    });

    if (!user) {
        return {
            message: 'An error occurred while creating your account.',
        }
    }

    // 4. Create user session
    await createSession(user._id.toHexString())

    // 5. Redirect user
    redirect('/dashboard')
}

export async function login(state: LoginFormState, formData: FormData) {
    // 1. Validate form fields
    const validatedFields = LoginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // 2. Prepare data for insertion into database
    const { email, password } = validatedFields.data
    
    // 3. Find the user into the database or call an Auth Library's API
    const user = await getUser({email: email.toLowerCase().trim()});

    if (!user) {
        return {
            message: 'User not found.',
        }
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return {
            message: 'Invalid email or password.',
        }
    }

    // 4. Create user session
    await createSession(user._id.toHexString())

    // 5. Redirect user
    redirect('/dashboard')
}

export async function logout() {
    await deleteSession()
    redirect('/login')
}