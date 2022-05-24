import React, { ReactNode } from 'react'
import { AppShell, Box } from '@mantine/core'
import Navbar from './Navbar'

interface Props {
    children: ReactNode,
}

export const NAVBAR_HEIGHT = '100%'
export const NAVBAR_WIDTH = 250
export const HEADER_HEIGHT = 90

const DashboardLayout = ({ children }: Props) => {
    return (
        <AppShell
            fixed
            padding="md"
            navbar={<Navbar />}

            styles={{
                main: {
                    backgroundColor: 'inherit',
                    height: '100%'
                }
            }}
        >
            {children}
        </AppShell>
    )
}

export const getDashboardLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>