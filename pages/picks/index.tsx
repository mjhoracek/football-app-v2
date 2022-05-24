import { getDashboardLayout } from '../../components/layouts/Dashboard'
import React from 'react'
import WeekSelector from '../../components/shared/WeekSelector'

type Props = {}

const PicksPage = (props: Props) => {
    return (
        <WeekSelector />
    )
}

PicksPage.getLayout = getDashboardLayout

export default PicksPage