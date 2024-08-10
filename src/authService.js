import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { db } from "./firebase"; // Ensure your Firebase configuration is correctly imported

const auth = getAuth();

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error("Error logging in: ", error);
        throw new Error(error.message);
    }
};

const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error logging out: ", error);
        throw new Error(error.message);
    }
};

const onAuthChange = (callback) => {
    onAuthStateChanged(auth, (user) => {
        callback(user);
    });
};

export { login, logout, onAuthChange };
