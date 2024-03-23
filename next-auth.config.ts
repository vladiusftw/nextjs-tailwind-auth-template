import Credentials from 'next-auth/providers/credentials'
import { login, refreshToken } from './utils/routes'
import { NextAuthOptions } from 'next-auth'
import getAxios from './utils/axios'

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/',
        error: '/',
    },
    secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'username',
                    type: 'text',
                    placeholder: 'jsmith',
                },
                password: { label: 'password', type: 'password' },
            },
            authorize: async (credentials) => {
                try {
                    const email = credentials?.email ?? ''
                    const password = credentials?.password ?? ''
                    // Authenticate user with credentials
                    const { axios } = getAxios({})
                    const user = await login(axios, { email, password })

                    if (user?.data?.accessToken && user?.data?.refreshToken) {
                        // expiry date is in seconds
                        return {
                            id: '',
                            accessToken: user?.data?.accessToken ?? '',
                            refreshToken: user?.data?.refreshToken ?? '',
                            exp: user?.data?.exp,
                        }
                    }

                    return null
                } catch (e: any) {
                    const message =
                        e?.response?.data?.message ?? 'An error has occured'
                    throw new Error(message)
                }
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.accessToken = user.accessToken
                token.expiryDate = user.exp
                token.refreshToken = user.refreshToken
            }

            // assuming expiry date is in seconds
            // makes sure to refresh if there is 1 hr left - server side
            const shouldRefreshTime = Math.round(
                token.expiryDate - 60 * 60 - Date.now() / 1000
            )

            if (shouldRefreshTime > 0) {
                return token
            }

            const { axios } = getAxios({})
            try {
                const data = await refreshToken(axios, token.refreshToken)
                token.accessToken = data?.data?.accessToken
                token.refreshToken = data?.data?.refreshToken
                token.expiryDate = data?.data?.exp

                return token
            } catch (e: any) {
                return { ...token, error: 'RefreshTokenError' }
            }
        },
        session: async ({ session, token }) => {
            session.accessToken = token.accessToken
            session.refreshToken = token.refreshToken
            session.expiryDate = token.expiryDate
            session.error = token.error

            return session
        },
    },
}
