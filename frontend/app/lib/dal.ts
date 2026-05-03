// * The DAL should include a function that verifies the user's session as they interact with your application. At the very least, the function should check if the session is valid, then redirect or return the user information needed to make further requests.
import 'server-only'

import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'
import { redirect } from 'next/navigation'
import { cache } from 'react'

export const verifySession = cache(async () => {
    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)

    if (!session?.userId) {
        redirect('/login')
    }

    return { isAuth: true, userId: session.userId }
})