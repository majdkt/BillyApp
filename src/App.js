// src/App.js
import React, { useState } from 'react';
import './css/App.css';
import TopBar from './components/TopBar';
import BillForm from './components/BillForm';
import BillList from './components/BillList';


function App() {
  const [bills, setBills] = useState([]);

  const addBill = (newBill) => {
    setBills([...bills, newBill]);
  };

  const calculateTotalPaid = () => {
    const today = new Date();
    return bills.reduce((total, bill) => {
      const paymentDate = new Date(bill.paymentDate);
      const contractStartDate = new Date(bill.contractStartDate);
      if (today >= contractStartDate) {
        const months = Math.floor(
            (today - contractStartDate) / (1000 * 60 * 60 * 24 * 30)
        );
        return total + (months * bill.amount);
      }
      return total;
    }, 0);
  };

  const calculatePaidMonths = () => {
    const today = new Date();
    return bills.reduce((totalMonths, bill) => {
      const contractStartDate = new Date(bill.contractStartDate);
      if (today >= contractStartDate) {
        const months = Math.floor(
            (today - contractStartDate) / (1000 * 60 * 60 * 24 * 30)
        );
        return totalMonths + months;
      }
      return totalMonths;
    }, 0);
  };

  return (
      <div className="App">
        <TopBar title="Bill Manager" />
        <div className="content">
          <BillForm onAddBill={addBill} />
          <BillList bills={bills} />
          <h2>Total Paid: {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(calculateTotalPaid())}</h2>
          <h2>Total Paid Months: {calculatePaidMonths()}</h2>
        </div>
      </div>
  );
}

export default App;

