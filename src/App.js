import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import Login from './components/Login';
import { getAuth } from 'firebase/auth';
import BillForm from './components/BillForm';
import TopBar from './components/TopBar';
import './css/App.css';

import { Route } from 'react-router-dom'; // Updated import

const auth = getAuth();

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bills, setBills] = useState([]);


  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleProfileNavigate = () => {
    Route(''); // Navigate to the profile page
  };

  const fetchBills = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "bills"));
      const fetchedBills = querySnapshot.docs.map(doc => {
        const data = doc.data();
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
        fetchBills();
      }
    });

    return () => unsubscribe();
  }, []);

  return (
      <div className="App">
        <TopBar
            title="BillyApp"
            onLogout={handleLogout}
            onProfileNavigate={handleProfileNavigate}
        />
        <div className="content">
          {!isLoggedIn ? (
              <Login onLoginSuccess={() => setIsLoggedIn(true)} />
          ) : (
              <div>
                <BillForm onAddBill={handleAddBill} />
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
      </div>
  );
};

export default App;
