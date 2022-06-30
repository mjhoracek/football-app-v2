import { Box, Button, createStyles, PasswordInput, Text, TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useForm } from '@mantine/form'
import { GetServerSidePropsContext } from 'next'
import nookies from 'nookies'
import React, { useEffect, useState } from 'react'
import { useAuthState } from '../../components/contexts/AuthContext'
import { getDashboardLayout } from '../../components/layouts/Dashboard'
import { colors } from '../../styles/colors'
import { firebaseAdmin } from '../../utils/firebase/firebaseAdmin'

const useStyles = createStyles((theme) => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: '105px'
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        color: 'white',
        padding: '2%',
        alignItems: 'left',
        width: '90%',
        height: 'fit-content',
        borderRadius: '10px',
    },
    h1: {
        fontSize: '28px',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    h2: {
        fontSize: '22px',
        textAlign: 'left',
        padding: '10px 0',
        textDecoration: 'underline',
        textDecorationColor: colors.purple[2],
        textUnderlineOffset: '3px'
    },
    inputsContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'left',
        width: '50%',
    },
    input: {
        width: '100%',
    },
    gridCol: {

    }
}))

type Props = {
    uid: string,
    email: string,
    token: string,
    userRow: {}
}

const SettingsPage = ({ userRow, uid }: Props) => {
    const { classes } = useStyles()
    const { updateEmail, reAuth, updatePassword, setCurrentUser, getUser } = useAuthState()

    const editProfile = useForm({
        initialValues: {
            name: userRow[0].player_name,
            email: userRow[0].email,
        },

        validate: {
            name: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        }
    })

    const editPassword = useForm({
        initialValues: {
            password: '',
            newPassword: '',
            confirmNewPassword: ''
        },
        validate: {
            password: (value) => (value !== userRow[0].player_password ? 'You must enter your old password correctly!' : null),
            newPassword: (value) => (value.length < 6 ? 'Password must be at least 6 characters long' : null),
            confirmNewPassword: (value, values) => (value !== values.newPassword ? 'Passwords did not match!' : null)
        }
    })


    const handleEditProfileSubmit = async () => {
        const newEmail = editProfile.values.email
        const password = userRow[0].player_password

        if (newEmail.length > 4) {
            try {
                await reAuth(password)
                updateEmail(newEmail)

                const body = {
                    player_name: editProfile.values.name,
                    email: editProfile.values.email,
                    uid: uid
                }
                const response = await fetch(`http://localhost:5000/players/${uid}`, {
                    method: 'PUT',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                })

                showNotification({
                    title: 'Profile Updated Successfully!',
                    message: `Your name is ${editProfile.values.name} email is: ${editProfile.values.email}`,
                    color: "red"
                })
            } catch (error) {
                console.log(error.message)
            }
        }
    }

    const handleEditPasswordSubmit = async () => {
        const password = userRow[0].player_password
        const newPassword = editPassword.values.confirmNewPassword

        try {
            reAuth(password)
            updatePassword(newPassword)

            const body = {
                player_password: editPassword.values.confirmNewPassword,
                uid: uid
            }
            const response = await fetch(`http://localhost:5000/players/change-password/${uid}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            })
            showNotification({
                message: 'Password Changed Successfully!',
                color: "red"
            })
        } catch (error) {

        }
    }


    return (
        <Box className={classes.wrapper}>
            <Box className={classes.header}>
                <Text className={classes.h1}>Account Settings</Text>
            </Box>
            <Box className={classes.container}>
                <Box
                    className={classes.inputsContainer}
                >
                    <Text className={classes.h2}>Edit Profile Info</Text>
                    <form onSubmit={editProfile.onSubmit(handleEditProfileSubmit)}>
                        <TextInput
                            className={classes.input}
                            required
                            label="Name"
                            placeholder={userRow[0].player_name}
                            pt={10}
                            pb={10}
                            {...editProfile.getInputProps('name')}
                        />
                        <TextInput
                            className={classes.input}
                            required
                            label="Email"
                            placeholder={userRow[0].email}
                            pt={10}
                            pb={10}
                            {...editProfile.getInputProps('email')}
                        />
                        <Button mt={20} mb={10} fullWidth type="submit">Update Profile</Button>
                    </form>
                    <Text className={classes.h2}>Change Your Password</Text>
                    <form onSubmit={editPassword.onSubmit(handleEditPasswordSubmit)}>
                        <PasswordInput
                            className={classes.input}
                            required
                            label="Old Password"
                            placeholder='Enter your old password'
                            pt={10}
                            pb={10}
                            {...editPassword.getInputProps('password')}
                        />
                        <PasswordInput
                            className={classes.input}
                            required
                            label="New Password"
                            placeholder='Enter your new password'
                            pt={10}
                            pb={10}
                            {...editPassword.getInputProps('newPassword')}
                        />
                        <PasswordInput
                            className={classes.input}
                            required
                            label="Confirm New Password"
                            placeholder='Enter your new password again'
                            pt={10}
                            pb={10}
                            {...editPassword.getInputProps('confirmNewPassword')}
                        />
                        <Button mt={20} mb={10} fullWidth type="submit">Change Password</Button>
                    </form>

                </Box>
            </Box>
        </Box>
    )
}

SettingsPage.getLayout = getDashboardLayout

export default SettingsPage

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    try {
        const cookies = nookies.get(ctx);
        const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

        // the user is authenticated!
        const { uid, email } = token;

        // FETCH STUFF HERE!! 🚀
        const response = await fetch(`http://localhost:5000/players/${uid}`)
        const userRow = await response.json()

        return {
            props: {
                email: email,
                uid: uid,
                token: token,
                userRow: userRow,
            },
        };
    } catch (err) {
        // either the `token` cookie didn't exist
        // or token verification failed
        // either way: redirect to the login page

        ctx.res.writeHead(302, { Location: '/login' });
        ctx.res.end();

        // `as never` prevents inference issues
        // with InferGetServerSidePropsType.
        // The props returned here don't matter because we've
        // already redirected the user.
        return { props: {} as never };
    }
};