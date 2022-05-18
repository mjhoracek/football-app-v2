import { Box } from '@mantine/core'
import { getDashboardLayout } from '../components/layouts/Dashboard'
import nookies from 'nookies'
import { firebaseAdmin } from '../utils/firebase/firebaseAdmin'
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next'


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

const Home = (props: any) => {

  return (
    <Box>
      <h2>Home Page</h2>
    </Box>
  )
}

Home.getLayout = getDashboardLayout

export default Home