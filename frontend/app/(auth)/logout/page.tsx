'use client'
import { logout } from '@/app/actions/auth'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const LogoutPage = () => {
    const router = useRouter()
    
    useEffect(() => {
        const performLogout = async () => {
            await logout()
            router.push('/login')
        }
        performLogout()
    }, [router])
    
    return null
}

export default LogoutPage