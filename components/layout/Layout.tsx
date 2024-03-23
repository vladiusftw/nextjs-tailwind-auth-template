import React from 'react'

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <div className="h-screen w-full flex flex-col overflow-y-hidden">
            <div className="div flex h-full">
                {/* A sidebar if needed */}
                <div className="flex flex-col w-full h-full overflow-auto p-4">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout
