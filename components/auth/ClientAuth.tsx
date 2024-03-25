'use client'
import { signOut, useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAppContext } from '../providers/AppProvider'

type Props = {
    children: React.ReactNode
}

export default function ClientAuth({ children }: Props) {
    const { data: session, status } = useSession()
    const router = useRouter()
    const pathname = usePathname()
    const { isLoading, setLoading } = useAppContext()

    useEffect(() => {
        if (session?.error == 'RefreshTokenError') signOut({ callbackUrl: '/' })
        else if (session === null) {
            if (pathname !== '/') {
                router.replace('/')
            }
        } else if (session !== undefined) {
            if (pathname === '/') {
                router.replace('/users')
            }
        }
    }, [session])

    useEffect(() => {
        if (status !== 'loading') setLoading(false)
    }, [status])

    return <>{isLoading ? <></> : children}</>
}
