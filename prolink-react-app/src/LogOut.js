import React, { useState } from 'react';

const LogoutButton = () => {
    const handleLogout = () => {
        localStorage.removeItem('jwt'); // Clear token from localStorage
        // Optionally clear any other state related to the authenticated user
        // Example: setUser(null);
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default LogoutButton;
