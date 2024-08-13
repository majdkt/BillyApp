// src/services/billService.js
import { collection, doc, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const fetchBills = async (user) => {
    if (!user) return [];

    const userRef = doc(db, 'users', user.uid);
    const billsRef = collection(userRef, 'bills');
    const querySnapshot = await getDocs(billsRef);

    return querySnapshot.docs.map((doc) => {
        const data = doc.data();
        data.paymentDate = data.paymentDate.toDate();
        data.contractStartDate = data.contractStartDate.toDate();
        return { id: doc.id, ...data };
    });
};

export const addBill = async (user, newBill) => {
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    await addDoc(collection(userRef, 'bills'), newBill);
};
