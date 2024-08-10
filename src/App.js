import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase'; // Import db from firebase.js
import Login from './components/Login'; // Import Login component

// Initialize Firebase Authentication
import { getAuth } from 'firebase/auth';
const auth = getAuth();

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  // Count Documents in Firestore
  const loadBillCount = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "bills"));
      const count = querySnapshot.size; // Get the number of documents
      console.log(`Number of documents: ${count}`);
    } catch (error) {
      console.error("Error loading document count: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setIsLoggedIn(!!currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
      <div>
        <h1>Welcome to the Bills App</h1>
        {!isLoggedIn ? (
            <Login onLoginSuccess={() => setIsLoggedIn(true)} />
        ) : (
            <div>
              <button onClick={handleLogout}>Log Out</button>
              <div>
                <button onClick={loadBillCount}>Count Documents</button>
                {loading && <p>Loading...</p>}
              </div>
            </div>
        )}
      </div>
  );
};

export default App;
