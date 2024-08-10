import { collection, getDocs } from "firebase/firestore";
import { db } from './firebase'; // Import Firestore instance

const loadBillCount = async () => {
    setLoading(true);
    try {
        const querySnapshot = await getDocs(collection(db, "bills"));
        const count = querySnapshot.size;
        console.log(`Number of documents: ${count}`);
    } catch (error) {
        console.error("Error loading document count: ", error);
    } finally {
        setLoading(false);
    }
};
