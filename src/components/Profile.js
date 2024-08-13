// src/components/Profile.js
import React from 'react';
import { getAuth } from 'firebase/auth';

const Profile = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    return (
        <div>
            <h1>Profile</h1>
            {user ? (
                <div>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>UID:</strong> {user.uid}</p>
                    {/* Add more user-specific information here */}
                </div>
            ) : (
                <p>No user is logged in.</p>
            )}
        </div>
    );
};

export default Profile;
