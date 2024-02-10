import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAOonudCmYXaeuKvJ3BYhiHH2Q6986s7yU",
  authDomain: "ghw23-85c04.firebaseapp.com",
  projectId: "ghw23-85c04",
  storageBucket: "ghw23-85c04.appspot.com",
  messagingSenderId: "72534743572",
  appId: "1:72534743572:web:71440b2fc58cbb8397e501"
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth(app);


export const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            sessionStorage.setItem('user', user.displayName);
            
            // reload the page
            window.location.reload();
        })
        .catch((error) => {
            console.log(error);
        });

}

export const signOut = () => {
    sessionStorage.removeItem('user');
    auth.signOut();

    // reload the page
    window.location.reload();
}