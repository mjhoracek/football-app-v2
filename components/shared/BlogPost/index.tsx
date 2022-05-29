import { Box, createStyles, Text } from '@mantine/core'
import React from 'react'
import { colors } from '../../../styles/colors'

type Props = {}

const useStyles = createStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        color: 'white',
        padding: '2%',
        alignItems: 'left',
        width: '90%',
        height: 'fit-content',
        background: colors.background[0],
        border: `1px solid ${colors.purple[2]}`,
        borderRadius: '10px',
    },
    header: {
        fontSize: '22px'
    },
    meta: {
        fontSize: '18px',
        paddingTop: '5px'
    },
    body: {
        fontSize: '16p',
        paddingTop: '5px',
        margin: '10px 0',
    }
}))

const BlogPost = (props: Props) => {
    const { classes } = useStyles()

    return (
        <Box
            className={classes.container}
        >
            <Text className={classes.header}>Message Header</Text>
            <Text className={classes.meta}>Messsage Meta</Text>
            <Text className={classes.body}>Messsage body</Text>

        </Box >
    )
}

export default BlogPost