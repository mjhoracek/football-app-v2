import React, { useState } from 'react'
import { useForm } from '@mantine/form'
import { Button, Center, Container, Group, PasswordInput, Text, TextInput, Title } from '@mantine/core'
import { useAuthState } from '../components/contexts/AuthContext'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { colors } from '../styles/colors'

type Props = {}

const SignUpPage = (props: Props) => {
    const router = useRouter()
    const [message, setMessage] = useState(`Welcome To Mitch's Football Pool`)
    const { signup, setCurrentUser } = useAuthState()
    const signUpForm = useForm({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',

        },

        validate: {
            name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length < 6 ? 'Password must be at least 6 characters' : null),
            confirmPassword: (value, values) =>
                value !== values.password ? 'Passwords did not match' : null,
        }
    })

    const createNewPlayer = async (url, data) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            console.log('createNewPlayer response:', response)
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleSubmit = async () => {
        try {
            ///for some reason firebase doesnt like using the mantine signUpForm.values.email/password as inputs to the signup function
            const email = signUpForm.values.email
            const password = signUpForm.values.password
            const user = await signup(email, password)
            console.log('this is the new user we just made:', user)

            if (user) {
                const uid = user?.user.multiFactor.user.uid

                const playerData = {
                    player_name: signUpForm.values.name,
                    email: signUpForm.values.email,
                    player_password: signUpForm.values.password,
                    firebase_UID: uid,
                    // last_login: Date.now(), formatting is not correct for postgres
                }

                ///create a new player on the SQL DB
                createNewPlayer('http://localhost:5000/players', playerData)

                setCurrentUser(user)
                router.push('/')
            }

        } catch (error) {
            setMessage(error.message)
            console.log('signup error', error)
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
                    height: '625px',
                    borderRadius: '10px',
                    backgroundColor: '#22252C'
                }}
            >
                <Group position='center' spacing={100} pt={20} pb={20} >
                    <Link href="/login">
                        <Text style={{ cursor: 'pointer' }}>Login</Text>
                    </Link>
                    <Link href="/signup">
                        <Text underline style={{ cursor: 'pointer' }} >Sign Up</Text>
                    </Link>
                </Group>
                <form onSubmit={signUpForm.onSubmit(handleSubmit)}>
                    <TextInput
                        required
                        label="Name"
                        placeholder='Enter Your Name'
                        pt={10}
                        pb={10}
                        {...signUpForm.getInputProps('name')}
                    />
                    <TextInput
                        required
                        label="Email"
                        placeholder='your@email.com'
                        pt={10}
                        pb={10}
                        {...signUpForm.getInputProps('email')}
                    />
                    <PasswordInput
                        required
                        label="Password"
                        placeholder="Choose your Password"
                        pt={10}
                        pb={10}
                        {...signUpForm.getInputProps('password')}
                    />
                    <PasswordInput
                        required
                        label="Confirm Password"
                        placeholder="Retype your password"
                        pt={10}
                        pb={10}
                        {...signUpForm.getInputProps('confirmPassword')}
                    />
                    <Button mt={20} mb={10} fullWidth type="submit">Sign Up</Button>
                </form>
                <Text mt={25} mb={10} color={colors.purple[2]} align='center'> {message}</Text>
            </Container>
        </Center>
    )
}

export default SignUpPage