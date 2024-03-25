import { authOptions } from '@/next-auth.config'
import { getServerSession } from 'next-auth'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

type Props = {
    children: React.ReactNode
}

export default async function ServerAuth({ children }: Props) {
    const session = await getServerSession(authOptions)

    const headersList = headers()

    const pathname = headersList.get('x-pathname')

    if (session === null || session?.error == 'RefreshTokenError') {
        if (pathname !== '/') {
            redirect('/')
        }
    } else if (session !== undefined) {
        if (pathname === '/') {
            redirect('/home')
        }
    }

    return <>{children}</>
}
