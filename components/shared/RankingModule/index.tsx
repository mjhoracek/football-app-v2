import { Box, createStyles, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { colors } from '../../../styles/colors'

type Props = {}

const useStyles = createStyles((theme) => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        background: colors.background[0],
        border: `1px solid ${colors.purple[2]}`,
        borderRadius: '10px',
        padding: '10px'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '80%',
        padding: '10px'
    },
    ranking: {
        width: '20%',
        textAlign: 'center',
    },
    player: {
        width: '80%',
        textAlign: 'center',
    },
}))

const RankingModule = (props: Props) => {
    const { classes } = useStyles()

    const [players, setPlayers] = useState([])

    useEffect(() => {
        const getPlayers = async () => {
            try {
                const response = await fetch('http://localhost:5000/players/')
                const players = await response.json()
                setPlayers(players)
            } catch (error) {
                console.log('fetch error', error.message)
            }
        }

        getPlayers()
    }, [])

    return (
        <Box className={classes.wrapper}>
            <Text pb={20} style={{ textAlign: 'center', fontWeight: 'bold', textDecoration: 'underline' }}>There are currently {players.length} players in the pool</Text>
            {players.map((player, i) => (
                <Box key={player.player_id} className={classes.row}>
                    <Text className={classes.ranking}>
                        {i + 1}
                    </Text>
                    <Text className={classes.player}>
                        {player.player_name}
                    </Text>
                </Box>
            ))}
        </Box>
    )
}

export default RankingModule