// src/components/BillForm.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function BillForm({ onAddBill }) {
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        paymentDate: '',
        contractStartDate: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddBill({
            ...formData,
            amount: parseFloat(formData.amount), // Convert amount to number
        });
        setFormData({
            name: '',
            amount: '',
            paymentDate: '',
            contractStartDate: '',
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Bill Name"
                value={formData.name}
                onChange={handleInputChange}
                required
            />
            <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleInputChange}
                required
            />
            <input
                type="date"
                name="paymentDate"
                placeholder="Payment Date"
                value={formData.paymentDate}
                onChange={handleInputChange}
                required
            />
            <input
                type="date"
                name="contractStartDate"
                placeholder="Contract Start Date"
                value={formData.contractStartDate}
                onChange={handleInputChange}
                required
            />
            <button type="submit">Add Bill</button>
        </form>
    );
}

BillForm.propTypes = {
    onAddBill: PropTypes.func.isRequired,
};

export default BillForm;
