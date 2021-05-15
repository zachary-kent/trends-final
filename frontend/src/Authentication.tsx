import { useEffect } from 'react';
import 'firebase/auth';
import firebase from 'firebase/app';
import FirebaseAuth from 'react-firebaseui/FirebaseAuth';
import { AuthContainer } from './styles';

const firebaseConfig = {
    apiKey: "AIzaSyDtoIevFkGs5MWy4AJcvPfz31j6lRdy61Q",
    authDomain: "trends-final-6d4ae.firebaseapp.com",
    projectId: "trends-final-6d4ae",
    storageBucket: "trends-final-6d4ae.appspot.com",
    messagingSenderId: "713760446693",
    appId: "1:713760446693:web:b943266513fbe81dff5c0c",
    measurementId: "G-ZX5NVRNGG6"
};

firebase.initializeApp(firebaseConfig);

export type AuthenticatedProps = {
    readonly onAuth: (email: string) => void;
};

const Authentication = ({ onAuth }: AuthenticatedProps) => {
    const uiConfig = {
        signInFlow: 'popup',
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    };

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                const email = user.email;
                if (email) onAuth(email);
            }
        });
    }, [onAuth]);

    return (
        <AuthContainer>
            <h3>Sign in to submit another recipe!</h3>
            <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </AuthContainer>
    );
};

export default Authentication;