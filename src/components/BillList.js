// src/components/BillList.js
import React from 'react';
import PropTypes from 'prop-types';

function BillList({ bills }) {
    const calculatePaidMonths = (contractStartDate) => {
        const today = new Date();
        const start = new Date(contractStartDate.seconds * 1000);
        if (today >= start) {
            return Math.floor((today - start) / (1000 * 60 * 60 * 24 * 30));
        }
        return 0;
    };

    const calculateTotalPaid = (amount, contractStartDate) => {
        const paidMonths = calculatePaidMonths(contractStartDate);
        return paidMonths * amount;
    };

    const daysLeftForNextPayment = (paymentDate) => {
        const today = new Date();
        const nextPaymentDate = new Date(paymentDate.seconds * 1000);

        if (today.getDate() > nextPaymentDate.getDate()) {
            nextPaymentDate.setMonth(today.getMonth() + 1);
        } else {
            nextPaymentDate.setMonth(today.getMonth());
        }

        const differenceInTime = nextPaymentDate.getTime() - today.getTime();
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
        return differenceInDays;
    };

    const getNextPaymentDate = (paymentDate) => {
        const today = new Date();
        const nextPaymentDate = new Date(paymentDate.seconds * 1000);

        if (today.getDate() > nextPaymentDate.getDate()) {
            nextPaymentDate.setMonth(today.getMonth() + 1);
        } else {
            nextPaymentDate.setMonth(today.getMonth());
        }

        return nextPaymentDate;
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp.seconds * 1000);
        return date.toLocaleDateString('de-DE');
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
                {bills.map((bill, index) => {
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
                })}
            </ul>
        </div>
    );
}

BillList.propTypes = {
    bills: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
            paymentDate: PropTypes.object.isRequired,  // Timestamp from Firestore
            contractStartDate: PropTypes.object.isRequired,  // Timestamp from Firestore
        })
    ).isRequired,
};

export default BillList;
