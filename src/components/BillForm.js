// src/components/BillForm.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function BillForm({ onAddBill }) {
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        paymentDate: new Date(),
        contractStartDate: new Date(),
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDateChange = (date, name) => {
        setFormData({
            ...formData,
            [name]: date,
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
            paymentDate: new Date(),
            contractStartDate: new Date(),
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Bill Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter bill name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="amount">Amount (€):</label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    placeholder="Enter amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="paymentDate">Payment Date:</label>
                <DatePicker
                    id="paymentDate"
                    selected={formData.paymentDate}
                    onChange={(date) => handleDateChange(date, 'paymentDate')}
                    dateFormat="dd/MM/yyyy"
                />
            </div>
            <div>
                <label htmlFor="contractStartDate">Contract Start Date:</label>
                <DatePicker
                    id="contractStartDate"
                    selected={formData.contractStartDate}
                    onChange={(date) => handleDateChange(date, 'contractStartDate')}
                    dateFormat="dd/MM/yyyy"
                />
            </div>
            <button type="submit">Add Bill</button>
        </form>
    );
}

BillForm.propTypes = {
    onAddBill: PropTypes.func.isRequired,
};

export default BillForm;
