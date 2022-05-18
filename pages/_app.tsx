import Head from "next/head"
import type { NextPage } from 'next'
import { MantineProvider } from '@mantine/core'
import { AuthProvider } from "../components/contexts/AuthContext"


const App = ({ Component, pageProps }: any) => {
  const getLayout = Component.getLayout || ((page: NextPage) => page)

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </>
  )
}

const Providers = ({ Component, pageProps }: any) => {
  return (
    <AuthProvider>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          // Theme is deeply merged with default theme
          colorScheme: 'dark',
          colors: {
            // Add your color
            'deep-blue': ['#E9EDFC', '#C1CCF6', '#99ABF0' /* ... */],
            // or replace default theme color
            blue: ['#E9EDFC', '#C1CCF6', '#99ABF0' /* ... */],
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
        }}>
        <App Component={Component} pageProps={pageProps} />
      </MantineProvider>
    </AuthProvider>
  )
}

export default Providers