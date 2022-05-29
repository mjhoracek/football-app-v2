import { Box, createStyles, Grid, Text } from '@mantine/core'
import { getDashboardLayout } from '../components/layouts/Dashboard'
import nookies from 'nookies'
import { firebaseAdmin } from '../utils/firebase/firebaseAdmin'
import { GetServerSidePropsContext } from 'next'
import { useEffect, useState } from 'react'
import BlogPost from '../components/shared/BlogPost'
import RankingModule from '../components/shared/RankingModule'

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
  font: {
    fontSize: '28px',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  gridBox: {

  },
  gridCol: {

  }
}))

const Home = (props: any) => {
  const { classes } = useStyles()
  const [players, setPlayers] = useState([])

  useEffect(() => {
    const getPlayers = async () => {
      try {
        const response = await fetch('http://localhost:5000/players/')
        const players = await response.json()
        setPlayers(players)
      } catch (error) {
        console.log('fetch error', error.message)
      }
    }

    getPlayers()
  }, [])


  return (
    <Box className={classes.wrapper}>
      <Box className={classes.header}>
        <Text className={classes.font}>Welcome to the football pool</Text>
      </Box>
      <BlogPost />
      <Grid
        columns={12}
        gutter={0}
        justify="space-between"
        align="space-between"
        pt={30}
        style={{ width: '90%' }}
      >
        <Grid.Col span={6} pr={10}>
          <Box className={classes.gridBox}>

            <RankingModule />

          </Box>
        </Grid.Col>
        <Grid.Col span={6} pl={10}>

          <RankingModule />

        </Grid.Col>
      </Grid>
    </Box>
  )
}

Home.getLayout = getDashboardLayout

export default Home

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const cookies = nookies.get(ctx);
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

    // the user is authenticated!
    const { uid, email } = token;

    // FETCH STUFF HERE!! 🚀

    return {
      props: {
        email: email,
        uid: uid,
        token: token,
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