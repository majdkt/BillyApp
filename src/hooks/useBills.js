import { useState, useEffect } from 'react';
import { collection, doc, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const useBills = (user) => {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchBills = async () => {
        setLoading(true);
        try {
            if (user) {
                const userRef = doc(db, 'users', user.uid);
                const billsRef = collection(userRef, 'bills');
                const querySnapshot = await getDocs(billsRef);

                const fetchedBills = querySnapshot.docs.map((doc) => {
                    const data = doc.data();
                    data.paymentDate = data.paymentDate.toDate();
                    data.contractStartDate = data.contractStartDate.toDate();
                    return { id: doc.id, ...data };
                });

                setBills(fetchedBills);
            }
        } catch (error) {
            console.error('Error fetching bills: ', error);
        } finally {
            setLoading(false);
        }
    };

    const addBill = async (newBill) => {
        if (user) {
            const userRef = doc(db, 'users', user.uid);
            await addDoc(collection(userRef, 'bills'), newBill);
            fetchBills();
        }
    };

    useEffect(() => {
        if (user) {
            fetchBills();
        }
    }, [user]);

    return { bills, loading, addBill };
};
