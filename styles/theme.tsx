import { MantineThemeOverride } from "@mantine/core"
import { colors } from "./colors"

export const other = {
    colors: {
        white: "#ffffff"
    },
    spacing: {
        xxl: "3rem",
        xxxl: "4.5rem",
        xxxxl: "5.5rem"
    }
}

export const theme: MantineThemeOverride = {
    // Theme is deeply merged with default theme
    colorScheme: 'dark',
    colors: {
        // Add your color
        'deep-blue': ['#E9EDFC', '#C1CCF6', '#99ABF0' /* ... */],
        // or replace default theme color
        blue: ['#E9EDFC', '#C1CCF6', '#99ABF0' /* ... */],
        purple: colors.purple[0]
    },

    shadows: {
        // other shadows (xs, sm, lg) will be merged from default theme
        md: '1px 1px 3px rgba(0,0,0,.25)',
        xl: '5px 5px 3px rgba(0,0,0,.25)',
    },

    headings: {
        fontFamily: 'Roboto, sans-serif',
        sizes: {
            h1: { fontSize: 30 },
        },
    },
}