import React, { useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function BillForm({ onAddBill }) {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [paymentDate, setPaymentDate] = useState("");
    const [contractStartDate, setContractStartDate] = useState("");
    const [file, setFile] = useState(null); // State to handle file input
    const [uploadProgress, setUploadProgress] = useState(0); // State to track upload progress

    const handleSubmit = async (e) => {
        e.preventDefault();

        let fileUrl = "";
        if (file) {
            const fileRef = ref(storage, `bills/${file.name}`);
            const uploadTask = uploadBytesResumable(fileRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress); // Update progress
                },
                (error) => {
                    console.error("Upload failed:", error);
                },
                async () => {
                    fileUrl = await getDownloadURL(uploadTask.snapshot.ref);
                    handleAddBill(fileUrl); // Add bill after file is uploaded
                }
            );
        } else {
            handleAddBill(fileUrl); // Add bill without file
        }
    };

    const handleAddBill = async (fileUrl) => {
        const newBill = {
            name,
            amount: parseFloat(amount),
            paymentDate: new Date(paymentDate),
            contractStartDate: new Date(contractStartDate),
            fileUrl,
        };

        onAddBill(newBill); // Pass the newBill object to the parent component
        resetForm();
    };

    const resetForm = () => {
        setName("");
        setAmount("");
        setPaymentDate("");
        setContractStartDate("");
        setFile(null);
        setUploadProgress(0);
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
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            {uploadProgress > 0 && <progress value={uploadProgress} max="100" />}
            <button type="submit">Add Bill</button>
        </form>
    );
}

export default BillForm;
