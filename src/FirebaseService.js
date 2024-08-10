import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

class FirebaseService {
    constructor(collectionName) {
        this.collection = collection(db, collectionName);
    }

    async loadBills() {
        try {
            const querySnapshot = await getDocs(this.collection);
            const bills = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                bills.push({
                    id: doc.id,
                    name: data.name,
                    amount: data.amount,
                    paymentDate: data.paymentDate instanceof Timestamp ? data.paymentDate.toDate() : new Date(data.paymentDate),
                    contractStartDate: data.contractStartDate instanceof Timestamp ? data.contractStartDate.toDate() : new Date(data.contractStartDate),
                });
            });
            return bills;
        } catch (error) {
            console.error("Error loading documents: ", error);
            throw new Error("Failed to load bills. Please try again.");
        }
    }
}

export default FirebaseService;
