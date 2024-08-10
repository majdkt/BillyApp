import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import Login from './components/Login';
import { getAuth } from 'firebase/auth';
import BillForm from './components/BillForm';
import './css/App.css';

const auth = getAuth();

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bills, setBills] = useState([]); // State to store fetched bills

  // Handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const fetchBills = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "bills"));
      const fetchedBills = querySnapshot.docs.map(doc => {
        const data = doc.data();
        // Convert Firestore Timestamps to JavaScript Date objects
        data.paymentDate = data.paymentDate.toDate();
        data.contractStartDate = data.contractStartDate.toDate();
        return { id: doc.id, ...data };
      });
      setBills(fetchedBills);
    } catch (error) {
      console.error("Error fetching bills: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBill = async (newBill) => {
    try {
      await addDoc(collection(db, "bills"), newBill); // Use Firestore's addDoc
      await fetchBills();
    } catch (error) {
      console.error("Error adding bill: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setIsLoggedIn(!!currentUser);

      if (currentUser) {
        fetchBills(); // Fetch bills when user logs in
      }
    });

    return () => unsubscribe();
  }, []);

  return (
      <div className="App">
        <h1>Welcome to the Bills App</h1>
        {!isLoggedIn ? (
            <Login onLoginSuccess={() => setIsLoggedIn(true)} />
        ) : (
            <div>
              <button onClick={handleLogout}>Log Out</button>
              <BillForm onAddBill={handleAddBill} /> {/* Pass the addBill function */}

              <h2>Your Bills</h2>
              {loading && <p>Loading...</p>}
              <ul>
                {bills.map((bill) => (
                    <li key={bill.id}>
                      {bill.name} - {bill.amount} - {bill.paymentDate.toDateString()} - {bill.contractStartDate.toDateString()}
                      {bill.fileUrl && (
                          <a href={bill.fileUrl} target="_blank" rel="noopener noreferrer">
                            View File
                          </a>
                      )}
                    </li>
                ))}
              </ul>
            </div>
        )}
      </div>
  );
};

export default App;
