import axios from 'axios'

type Props = {
    accessToken?: string
}

const getAxios = ({ accessToken }: Props) => {
    const clientAxios = axios.create({
        baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
        headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
    })

    return { axios: clientAxios }
}

export default getAxios
