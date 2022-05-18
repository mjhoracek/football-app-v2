/* eslint-disable react/display-name */
import { forwardRef } from 'react';
import { Group, Avatar, Text, Menu, UnstyledButton, Box } from '@mantine/core';

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
    image: string;
    name: string;
    email: string;
    icon?: React.ReactNode;
}

export const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(({ image, name, email, icon, ...others }: UserButtonProps, ref) => (
    <Box
        sx={{ width: '100%' }}
    >
        <UnstyledButton
            ref={ref}
            sx={(theme) => ({
                display: 'block',
                padding: theme.spacing.md,
                color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

                '&:hover': {
                    backgroundColor:
                        theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            })}
            {...others}
        >
            <Group
                direction='row'
                noWrap
            >
                <Avatar
                    sx={{ maxWidth: '20%' }}
                    src={image}
                    radius="xl"
                />

                <Box sx={{ width: '80%' }}>
                    <Text size="sm" weight={500}>
                        {name}
                    </Text>

                    <Text color="dimmed" size="xs">
                        {email}
                    </Text>

                </Box>
            </Group>
        </UnstyledButton>

    </Box>
)
);