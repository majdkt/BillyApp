import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut, getAuth } from 'firebase/auth';
import { fetchBills, addBill } from './services/billService';
import Login from './components/Login';
import BillForm from './components/BillForm';
import BillList from './components/BillList';
import TopBar from './components/TopBar';
import './css/App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bills, setBills] = useState([]);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      setUser(null);
      setIsLoggedIn(false);
      setBills([]); // Clear the bills when the user logs out
      navigate('/'); // Redirect to the login page
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleProfileNavigate = () => {
    navigate('/profile'); // Navigate to the profile page
  };

  const loadBills = async (user) => {
    setLoading(true);
    try {
      const fetchedBills = await fetchBills(user);
      setBills(fetchedBills);
    } catch (error) {
      console.error('Error fetching bills: ', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBill = async (newBill) => {
    try {
      await addBill(user, newBill);
      await loadBills(user); // Refetch the bills after adding a new one
    } catch (error) {
      console.error("Error adding bill: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setIsLoggedIn(!!currentUser);

      if (currentUser) {
        loadBills(currentUser); // Automatically fetch bills on login
      } else {
        setBills([]); // Clear bills when logged out
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
              <Login onLoginSuccess={() => {
                setIsLoggedIn(true);
                fetchBills();
              }} />
          ) : (
              <div>
                <BillForm onAddBill={handleAddBill} />
                <h2>Your Bills</h2>
                {loading && <p>Loading...</p>}
                <BillList bills={bills} /> {/* Use the new BillList component */}
              </div>
          )}
        </div>
      </div>
  );
};

export default App;
