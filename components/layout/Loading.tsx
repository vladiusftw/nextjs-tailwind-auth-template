'use client'
import React from 'react'
import { useAppContext } from '../providers/AppProvider'
import Spinner from '../icons/Spinner'

type Props = {}

const Loading = (props: Props) => {
    const { isLoading } = useAppContext()
    return (
        <div
            className={`fixed h-screen w-screen ${
                isLoading ? 'flex' : 'hidden'
            } flex-col top-0 left-0 bg-[#00000099] items-center justify-center z-50`}
        >
            <Spinner />
        </div>
    )
}

export default Loading
