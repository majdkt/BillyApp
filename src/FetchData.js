import React, { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Make sure to import your firebase config

const FetchData = () => {

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Get a reference to the "users" collection
                const querySnapshot = await getDocs(collection(db, "users"));

                // Loop through the documents and log their data
                querySnapshot.forEach((doc) => {
                    console.log(`${doc.id} => `, doc.data());
                });
            } catch (error) {
                console.error("Error fetching documents: ", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Check Console for Data</h1>
        </div>
    );
};

export default FetchData;
