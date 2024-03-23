import { AxiosInstance } from 'axios'

type RequestBody = {
    [key: string]: any
}

export const login = async (
    axios: AxiosInstance,
    body: RequestBody
): Promise<{
    data: {
        accessToken: string
        refreshToken: string
        exp: number
    }
    message: string
}> => {
    const res = await axios.post('/auth/login', body)
    return await res.data
}

export const refreshToken = async (
    axios: AxiosInstance,
    token: string
): Promise<{
    data: {
        accessToken: string
        refreshToken: string
        exp: number
    }
}> => {
    const res = await axios.post(
        '/auth/refresh-token',
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )
    return await res.data
}
