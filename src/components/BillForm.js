import React, { useState } from 'react';

const BillForm = ({ onAddBill }) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [paymentDate, setPaymentDate] = useState('');
    const [contractStartDate, setContractStartDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddBill({
            name,
            amount: parseFloat(amount),
            paymentDate: new Date(paymentDate),
            contractStartDate: new Date(contractStartDate),
        });
        setName('');
        setAmount('');
        setPaymentDate('');
        setContractStartDate('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Bill Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
            />
            <input
                type="date"
                placeholder="Payment Date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                required
            />
            <input
                type="date"
                placeholder="Contract Start Date"
                value={contractStartDate}
                onChange={(e) => setContractStartDate(e.target.value)}
                required
            />
            <button type="submit">Add Bill</button>
        </form>
    );
};

export default BillForm;
