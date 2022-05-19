import React, { useState, useEffect } from 'react'
import { useForm } from '@mantine/form'
import { Box, Button, Center, Container, Group, Text, TextInput, Title } from '@mantine/core'
import { useAuthState } from '../components/contexts/AuthContext'
import { useRouter } from 'next/router'
import Link from 'next/link'


type Props = {}

const SignUpPage = (props: Props) => {
    const [message, setMessage] = useState(`Welcome To Mitch's Football Pool`)
    const signUpForm = useForm({
        initialValues: {
            name: '',
            email: '',
            password: '',
        }
    })

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
                        <Text style={{ cursor: 'pointer' }}>Login</Text>
                    </Link>
                    <Link href="/signup">
                        <Text underline style={{ cursor: 'pointer' }} >Sign Up</Text>
                    </Link>
                </Group>
                <form >
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
                    <TextInput
                        required
                        label="Password"
                        placeholder="Enter your Password"
                        pt={10}
                        pb={10}
                        {...signUpForm.getInputProps('password')}
                    />
                    <Button mt={20} mb={10} color='indigo' fullWidth type="submit">Sign Up</Button>
                </form>
                <Text mt={25} mb={10} color='indigo' align='center'> {message}</Text>
            </Container>
        </Center>
    )
}

export default SignUpPage