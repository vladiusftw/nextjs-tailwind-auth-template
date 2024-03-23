import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth/jwt' {
    interface JWT {
        accessToken: string
        refreshToken: string
        expiryDate: number
        error?: 'RefreshTokenError'
    }
}

declare module 'next-auth' {
    interface User {
        accessToken: string
        refreshToken: string
        exp: number
    }

    interface Session {
        accessToken: string
        refreshToken: string
        expiryDate: number
        error?: 'RefreshTokenError'
    }
}
