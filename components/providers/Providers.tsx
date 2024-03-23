'use client'
import { SessionProvider } from 'next-auth/react'
import React, { useState } from 'react'
import { Flip, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import AppProvider from './AppProvider'
import Loading from '../layout/Loading'
import RefreshTokenHandler from '../auth/RefreshTokenHandler'

type Props = {
    children: React.ReactNode
}

const client = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: 35 * (60 * 1000), // 30 minutes,
            staleTime: 30 * (60 * 1000),
            refetchOnWindowFocus: false,
        },
    },
})

const Providers = ({ children }: Props) => {
    const [interval, setInterval] = useState(0)
    return (
        // this takes it in seconds
        <SessionProvider refetchInterval={interval}>
            <QueryClientProvider client={client}>
                <AppProvider>
                    <Loading />
                    {children}
                </AppProvider>
            </QueryClientProvider>

            <RefreshTokenHandler setInterval={setInterval} />
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Flip}
            />
        </SessionProvider>
    )
}

export default Providers
