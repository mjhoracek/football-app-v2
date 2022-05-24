import React from 'react'
import { Navbar as MantineNavbar } from '@mantine/core'
import { NAVBAR_HEIGHT, NAVBAR_WIDTH } from '../index'
import MenuItem from './MenuItem'
import { SVG } from '../../../shared/SVG'
import UserMenu from '../UserMenu'
import { colors } from '../../../../styles/colors'

type Props = {}

const SECTION_PADDING = 7
const SVG_COLOR = colors.purple[2]

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
                    svgComponent={<SVG.Home fill={SVG_COLOR} />}
                    label='Home'
                    href='/'
                />
            </MantineNavbar.Section >
            <MantineNavbar.Section pt={SECTION_PADDING} pb={SECTION_PADDING} >
                <MenuItem
                    svgComponent={<SVG.Picks fill={SVG_COLOR} />}
                    label='Picks'
                    href='/picks'
                />
            </MantineNavbar.Section>
            <MantineNavbar.Section pt={SECTION_PADDING} pb={SECTION_PADDING}>
                <MenuItem
                    svgComponent={<SVG.Leaderboards fill={SVG_COLOR} />}
                    label='Leaderboards'
                    href='/leaderboards'
                />
            </MantineNavbar.Section>
            <MantineNavbar.Section pt={SECTION_PADDING} pb={SECTION_PADDING}>
                <MenuItem
                    svgComponent={<SVG.Stats fill={SVG_COLOR} />}
                    label='Stats'
                    href='/'
                />
            </MantineNavbar.Section>
            <MantineNavbar.Section pt={SECTION_PADDING} pb={SECTION_PADDING}>
                <MenuItem
                    svgComponent={<SVG.Info fill={SVG_COLOR} />}
                    label='Info'
                    href='/'
                />
            </MantineNavbar.Section>
            <MantineNavbar.Section pt={SECTION_PADDING} pb={SECTION_PADDING}>
                <MenuItem
                    svgComponent={<SVG.Gear fill={SVG_COLOR} />}
                    label='Settings'
                    href='/settings'
                />
            </MantineNavbar.Section>
        </MantineNavbar>
    )
}

export default Navbar