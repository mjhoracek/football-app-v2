import { Button, Center, Group, Text } from '@mantine/core'
import React from 'react'
import { colors } from '../../../styles/colors'

type Props = {}

const weeks = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
]

const WeekSelector = (props: Props) => {
    return (
        <Center
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text
                size='xl'
                pt={10}
                pb={10}
                style={{

                }}
            >
                Enter Weekly Picks
            </Text>
            <Group direction='row' noWrap position='center'>
                {weeks.map((week, index) => (
                    <Button
                        key={index}
                        style={{
                            backgroundColor: colors.purple[2],
                            width: '30px',
                            height: '30px',
                            borderRadius: '50px',
                            fontSize: '16px',
                            padding: '1px',
                        }}
                    >
                        {week}
                    </Button>
                ))}
            </Group>
        </Center>
    )
}

export default WeekSelector