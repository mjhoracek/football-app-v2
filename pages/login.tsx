import React, { useState, useEffect } from 'react'
import { useForm } from '@mantine/form'
import { Box, Button, Center, Container, createStyles, Group, PasswordInput, Text, TextInput, Title } from '@mantine/core'
import { useAuthState } from '../components/contexts/AuthContext'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { colors } from '../styles/colors'

const useStyles = createStyles((theme) => ({
    padded: {
        paddingTop: '10px',
        paddingBottom: '10px',
    }
}))

type Props = {}

const Login = (props: Props) => {
    const { classes } = useStyles()
    const router = useRouter()
    const [message, setMessage] = useState(`Welcome To Mitch's Football Pool`)
    const { login, setCurrentUser, logout } = useAuthState()
    const loginForm = useForm({
        initialValues: {
            email: '',
            password: '',
        }
    })

    const loginUser = async () => {
        try {
            const user = await login(loginForm.values.email, loginForm.values.password)
            if (user) {
                setCurrentUser(user)
                router.push('/')
            }
        } catch (error) {
            console.log(error)
            setMessage(error.message)
        }
    }

    return (
        <Center
            style={{
                width: "100vw",
                height: "100vh",
            }}
        >
            <Container
                style={{
                    width: '400px',
                    height: '450px',
                    borderRadius: '10px',
                    backgroundColor: '#22252C'
                }}
            >
                <Group position='center' spacing={100} pt={20} pb={20} >
                    <Link href="/login">
                        <Text underline style={{ cursor: 'pointer' }}>Login</Text>
                    </Link>
                    <Link href="/signup">
                        <Text style={{ cursor: 'pointer' }} >Sign Up</Text>
                    </Link>
                </Group>
                <form onSubmit={loginForm.onSubmit(loginUser)}>
                    <TextInput
                        required
                        label="Email"
                        placeholder='your@email.com'
                        className={classes.padded}
                        {...loginForm.getInputProps('email')}
                    />
                    <PasswordInput
                        required
                        label="Password"
                        placeholder="Enter your Password"
                        className={classes.padded}
                        {...loginForm.getInputProps('password')}
                    />
                    <Button mt={20} mb={10} fullWidth type="submit">Log In</Button>
                </form>
                <Text mt={40} mb={10} color={colors.purple[2]} align='center'> {message}</Text>
            </Container>
        </Center>
    )
}

export default Login
