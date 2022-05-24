import { forwardRef } from 'react';
import { Group, Avatar, Text, Menu, UnstyledButton } from '@mantine/core';
import { useAuthState } from '../../contexts/AuthContext';
import { UserButton } from './UserButton';
import Router, { useRouter } from 'next/router';
import { NAVBAR_WIDTH } from '.';

const logoutUser = () => {

}

const UserMenu = () => {
    const { logout, currentUser } = useAuthState()
    const router = useRouter()

    const logoutUser = () => {
        logout();
        router.push('/login')
    }

    const email = currentUser?.multiFactor?.user?.email

    return (
        <Group position="center">
            <Menu
                withArrow
                placement="center"
                control={
                    <UserButton
                        image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
                        name="Welcome:"
                        email={email}
                    />
                }
                style={{

                }}
            >
                <Menu.Item
                    onClick={logoutUser}
                >
                    Log Out
                </Menu.Item>
            </Menu>
        </Group>
    );
}

export default UserMenu