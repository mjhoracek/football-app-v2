import Router, { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { firebaseAdmin } from '../../utils/firebase/firebaseAdmin'
import nookies from 'nookies'
import { InferGetServerSidePropsType, GetServerSidePropsContext } from 'next'
import { getDashboardLayout } from '../../components/layouts/Dashboard'

type Props = {}

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

const DashboardPage = ({ email, uid, token }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const router = useRouter()
    console.log('token', token)

    useEffect(() => {
        if (email && uid) {
            console.log(email, uid)
        }
    }, [email, uid])


    return (
        <div>
            <h1>
                Dashboard Page Content
            </h1>
        </div>
    )
}

DashboardPage.getLayout = getDashboardLayout


export default DashboardPage