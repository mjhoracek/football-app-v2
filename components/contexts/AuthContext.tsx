import React, { useContext, useState, useEffect, ReactNode } from "react"
import app from '../../utils/firebase';
import nookies from 'nookies'
import firebase from 'firebase/compat/app';


type Props = {
    children: ReactNode,
}

app()

const auth = firebase.auth()

const AuthContext = React.createContext({
    user: null,
    isAuthenticated: false,
} as any)


export function useAuthState() {
    const auth = useContext(AuthContext)
    return { ...auth, isAuthenticated: auth.user != null }
}


export const AuthProvider = ({ children }: Props) => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    console.log('currentUser', currentUser)

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut();
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email);
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);

            setLoading(false);
        });

        return unsubscribe;
    }, []);


    useEffect(() => {
        return firebase.auth().onIdTokenChanged(async (user) => {
            if (!user) {
                setCurrentUser(null);
                nookies.set(undefined, 'token', '', { path: '/' });
                console.log('currentUser', currentUser)
            } else {
                const token = await user.getIdToken();
                setCurrentUser(user);
                nookies.set(undefined, 'token', token, { path: '/' });
            }
        });
    }, [currentUser]);

    // force refresh the token every 10 minutes
    useEffect(() => {
        const handle = setInterval(async () => {
            const user = firebase.auth().currentUser;
            if (user) await user.getIdToken(true);
        }, 10 * 60 * 1000);

        // clean up setInterval
        return () => clearInterval(handle);
    }, []);

    const value = {
        currentUser,
        setCurrentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        error,
        setError,
        loading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}