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

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR',
        }).format(amount);
    };

    return (
        <div>
            <h2>Bills</h2>
            <ul>
                {bills.map((bill, index) => (
                    <li key={index}>
                        {bill.name} - {formatCurrency(bill.amount)} (Next Payment in {daysLeftForNextPayment(bill.paymentDate)} days)
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
            amount: PropTypes.number.isRequired,
            paymentDate: PropTypes.instanceOf(Date).isRequired,
            contractStartDate: PropTypes.instanceOf(Date).isRequired,
        })
    ).isRequired,
};

export default BillList;
