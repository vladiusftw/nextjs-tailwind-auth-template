import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/providers/Providers'
import Auth from '@/components/auth/Auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

type Props = {
    children: React.ReactNode
}

export default function RootLayout(props: Props) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Auth>
                    <Providers>{props.children}</Providers>
                </Auth>
            </body>
        </html>
    )
}