import Head from "next/head"
import type { NextPage } from 'next'
import { colors } from "../styles/colors"
import { MantineProvider } from '@mantine/core'
import { theme } from "../styles/theme"
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
        theme={theme}
        styles={{
          Button: () => ({
            root: {
              backgroundColor: colors.purple[1],
              fontFamily: "Chakra Petch, sans-serif",
              letterSpacing: ".1rem",

              '&:hover': {
                backgroundColor: colors.purple[3]
              }
            },
            outline: {
              "&:hover": {
                borderColor: colors.purple[0],
              },
            },
          }),
        }}
      >
        <App Component={Component} pageProps={pageProps} />
      </MantineProvider>
    </AuthProvider>
  )
}

export default Providers