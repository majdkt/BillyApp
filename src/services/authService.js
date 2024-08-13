import { getAuth, signInWithEmailAndPassword} from "firebase/auth";

const auth = getAuth();

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error("Error logging in: ", error);
        throw new Error(error.message);
    }
};

export { login };
