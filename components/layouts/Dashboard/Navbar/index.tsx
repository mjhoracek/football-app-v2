import React from 'react'
import { Navbar as MantineNavbar } from '@mantine/core'
import { NAVBAR_HEIGHT, NAVBAR_WIDTH } from '../index'
import MenuItem from './MenuItem'
import { SVG } from '../../../shared/SVG'
import UserMenu from '../UserMenu'

type Props = {}

const SECTION_PADDING = 7

const Navbar = (props: Props) => {
    return (
        <MantineNavbar
            width={{ base: NAVBAR_WIDTH }}
            height={NAVBAR_HEIGHT}
            p="xs"
        >
            <MantineNavbar.Section pt={SECTION_PADDING} pb={SECTION_PADDING}>
                <UserMenu />
            </MantineNavbar.Section>
            <MantineNavbar.Section pt={SECTION_PADDING} pb={SECTION_PADDING}>
                <MenuItem
                    svgComponent={<SVG.Home />}
                    label='Home'
                    href='/'
                />
            </MantineNavbar.Section >
            <MantineNavbar.Section pt={SECTION_PADDING} pb={SECTION_PADDING} >
                <MenuItem
                    svgComponent={<SVG.Picks />}
                    label='Picks'
                    href='/picks'
                />
            </MantineNavbar.Section>
            <MantineNavbar.Section pt={SECTION_PADDING} pb={SECTION_PADDING}>
                <MenuItem
                    svgComponent={<SVG.Leaderboards />}
                    label='Leaderboards'
                    href='/leaderboards'
                />
            </MantineNavbar.Section>
            <MantineNavbar.Section pt={SECTION_PADDING} pb={SECTION_PADDING}>
                <MenuItem
                    svgComponent={<SVG.Stats />}
                    label='Stats'
                    href='/'
                />
            </MantineNavbar.Section>
            <MantineNavbar.Section pt={SECTION_PADDING} pb={SECTION_PADDING}>
                <MenuItem
                    svgComponent={<SVG.Info />}
                    label='Info'
                    href='/'
                />
            </MantineNavbar.Section>
            <MantineNavbar.Section pt={SECTION_PADDING} pb={SECTION_PADDING}>
                <MenuItem
                    svgComponent={<SVG.Gear />}
                    label='Settings'
                    href='/settings'
                />
            </MantineNavbar.Section>
        </MantineNavbar>
    )
}

export default Navbar