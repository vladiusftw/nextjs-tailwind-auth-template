'use client'
import React, { createContext, useContext, useState } from 'react'

type Props = {
    children: React.ReactNode
}

type ContextProps = {
    isLoading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const AppContext = createContext<ContextProps>(null!)

export const useAppContext = () => useContext(AppContext)

const AppProvider = ({ children }: Props) => {
    const [isLoading, setLoading] = useState(false)
    return (
        <AppContext.Provider value={{ isLoading, setLoading }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider
