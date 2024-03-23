import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

type Props = {
    setInterval: React.Dispatch<React.SetStateAction<number>>
}

const RefreshTokenHandler = ({ setInterval }: Props) => {
    const { data: session } = useSession()

    useEffect(() => {
        if (!!session) {
            // makes sure to refresh if there is half an hr left
            const timeRemaining = Math.round(
                session.expiryDate - 30 * 60 - Date.now() / 1000
            )
            setInterval(timeRemaining > 0 ? timeRemaining : 0)
        }
    }, [session])

    return null
}

export default RefreshTokenHandler
