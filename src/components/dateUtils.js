// src/utils/dateUtils.js

export const getNextPaymentDate = (paymentDate) => {
    const nextPaymentDate = new Date(paymentDate);
    nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
    return nextPaymentDate;
};

export const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
};

export const formatDate = (date) => {
    return date.toLocaleDateString();
};

export const calculateTotalPaid = (amount, contractStartDate) => {
    const startDate = new Date(contractStartDate);
    const monthsPassed = Math.floor((new Date() - startDate) / (1000 * 60 * 60 * 24 * 30));
    return amount * monthsPassed;
};

export const calculatePaidMonths = (contractStartDate) => {
    const startDate = new Date(contractStartDate);
    const monthsPassed = Math.floor((new Date() - startDate) / (1000 * 60 * 60 * 24 * 30));
    return monthsPassed;
};

export const daysLeftForNextPayment = (paymentDate) => {
    const nextPaymentDate = new Date(paymentDate);
    nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
    const today = new Date();
    const timeDiff = nextPaymentDate - today;
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
};
