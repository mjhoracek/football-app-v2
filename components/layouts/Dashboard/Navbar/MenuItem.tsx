import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core'
import Link from 'next/link'
import React, { ReactNode } from 'react'
import { SVG } from '../../../shared/SVG'


type Props = {
    svgComponent: ReactNode,
    label: string,
    href: string,
}

const MenuItem = ({ svgComponent, label, href }: Props) => {
    return (
        <Link href={href}>
            <UnstyledButton
                sx={(theme) => ({
                    width: '100%',
                    padding: theme.spacing.xs,
                    borderRadius: theme.radius.sm,
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

                    '&:hover': {
                        backgroundColor:
                            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                    },
                })}
            >
                <Group>
                    <ThemeIcon variant="outline" color={'transparent'} radius='md' size="lg">
                        {svgComponent}
                    </ThemeIcon>

                    <Text size="lg">{label}</Text>
                </Group>
            </UnstyledButton>

        </Link>
    )
}

export default MenuItem