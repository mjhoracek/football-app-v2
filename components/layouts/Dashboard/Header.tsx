import React from 'react'
import { HEADER_HEIGHT } from '.'
import { Header as MantineHeader } from '@mantine/core'

type Props = {

}

function Header({ }: Props) {

    return (
        <MantineHeader height={HEADER_HEIGHT}>
            HELLO
        </MantineHeader>
    )
}

export default Header