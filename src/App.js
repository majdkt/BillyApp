import React, { useState, useEffect } from 'react';
import './css/App.css';
import {
  getNextPaymentDate,
  formatCurrency,
  formatDate,
  calculateTotalPaid,
  calculatePaidMonths,
  daysLeftForNextPayment
} from "./components/dateUtils.js";

import TopBar from './components/TopBar';
import BillForm from './components/BillForm';
import BillList from './components/BillList';
import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadBills = async () => {
    setLoading(true);
    setError(null);
    try {
      const querySnapshot = await getDocs(collection(db, "bills"));
      const userBills = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        userBills.push({
          id: doc.id,
          name: data.name,
          amount: data.amount,
          paymentDate: data.paymentDate instanceof Timestamp ? data.paymentDate.toDate() : new Date(data.paymentDate),
          contractStartDate: data.contractStartDate instanceof Timestamp ? data.contractStartDate.toDate() : new Date(data.contractStartDate),
        });
      });
      setBills(userBills);
    } catch (e) {
      console.error("Error loading documents: ", e);
      setError("Failed to load bills. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const addBill = async (newBill) => {
    setError(null);
    try {
      const docRef = await addDoc(collection(db, "bills"), newBill);
      setBills([...bills, { id: docRef.id, ...newBill }]);
    } catch (e) {
      console.error("Error adding document: ", e);
      setError("Failed to add bill. Please try again.");
    }
  };

  return (
      <div>
        <TopBar />
        <h2>Bills</h2>
        <BillForm onAddBill={addBill} />
        <button onClick={loadBills} disabled={loading}>
          {loading ? "Loading..." : "Load Bills"}
        </button>
        {error && <p>{error}</p>}
        <ul>
          {bills.length > 0 ? (
              bills.map((bill, index) => {
                const nextPaymentDate = getNextPaymentDate(bill.paymentDate);
                return (
                    <li key={index}>
                      <h3>{bill.name}</h3>
                      <p>Amount: {formatCurrency(bill.amount)}</p>
                      <p>Contract Start Date: {formatDate(bill.contractStartDate)}</p>
                      <p>Total Paid: {formatCurrency(calculateTotalPaid(bill.amount, bill.contractStartDate))}</p>
                      <p>Paid Months: {calculatePaidMonths(bill.contractStartDate)} months</p>
                      <p>Next Payment Date: {formatDate(nextPaymentDate)}</p>
                      <p>Next Payment in {daysLeftForNextPayment(bill.paymentDate)} days</p>
                    </li>
                );
              })
          ) : (
              <p>No bills available.</p>
          )}
        </ul>
      </div>
  );
}

export default App;
