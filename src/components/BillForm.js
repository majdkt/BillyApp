// src/components/BillForm.js
import React, { useState } from 'react';

const BillForm = ({ onAddBill }) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [paymentDate, setPaymentDate] = useState('');
    const [contractStartDate, setContractStartDate] = useState('');
    const [fileUrl, setFileUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddBill({
            name,
            amount: parseFloat(amount),
            paymentDate: new Date(paymentDate),
            contractStartDate: new Date(contractStartDate),
            fileUrl,
        });

        // Clear the form after submission
        setName('');
        setAmount('');
        setPaymentDate('');
        setContractStartDate('');
        setFileUrl('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Bill Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Amount:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Next Payment Date:</label>
                <input
                    type="date"
                    value={paymentDate}
                    onChange={(e) => setPaymentDate(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>First Payment Date:</label>
                <input
                    type="date"
                    value={contractStartDate}
                    onChange={(e) => setContractStartDate(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Bill</button>
        </form>
    );
};

export default BillForm;
