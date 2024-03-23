import Layout from '@/components/layout/Layout'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const layout = ({ children }: Props) => {
    return <Layout>{children}</Layout>
}

export default layout
