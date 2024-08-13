import React from 'react';

const BillList = ({ bills }) => {
    return (
        <ul>
            {bills.map((bill) => (
                <li key={bill.id} className="bill-item">
                    <div className="bill-details">
                        <strong>Bill Name:</strong> {bill.name}
                    </div>
                    <div className="bill-details">
                        <strong>Amount:</strong> ${bill.amount.toFixed(2)}
                    </div>
                    <div className="bill-details">
                        <strong>Next Payment Date:</strong> {bill.paymentDate.toDateString()}
                    </div>
                    <div className="bill-details">
                        <strong>First Payment Date:</strong> {bill.contractStartDate.toDateString()}
                    </div>
                    {bill.fileUrl && (
                        <div className="bill-details">
                            <strong>File:</strong>
                            <a href={bill.fileUrl} target="_blank" rel="noopener noreferrer">
                                View File
                            </a>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default BillList;
