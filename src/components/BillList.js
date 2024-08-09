// src/components/BillList.js
import React from 'react';
import PropTypes from 'prop-types';

function BillList({ bills }) {
    const daysLeftForNextPayment = (paymentDate) => {
        const today = new Date();
        const nextPaymentDate = new Date(paymentDate);
        nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
        const difference = Math.ceil(
            (nextPaymentDate - today) / (1000 * 60 * 60 * 24)
        );
        return difference;
    };

    return (
        <div>
            <h2>Bills</h2>
            <ul>
                {bills.map((bill, index) => (
                    <li key={index}>
                        {bill.name} - ${bill.amount} (Next Payment in {daysLeftForNextPayment(bill.paymentDate)} days)
                    </li>
                ))}
            </ul>
        </div>
    );
}

BillList.propTypes = {
    bills: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired, // Ensure amount is a number
            paymentDate: PropTypes.string.isRequired,
            contractStartDate: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default BillList;
