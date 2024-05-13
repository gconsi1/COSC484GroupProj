import React from "react";

const SettingsPage = () => {
    const handleLogout = () => {
        localStorage.removeItem('jwt'); // Clear token from localStorage
        // Optionally clear any other state related to the authenticated user
        // Example: setUser(null);
    };
    return (
        <div className="settings-content">
            <section className="profile-settings">
                <h2>Change Profile Info</h2>
                <form id="profileSettingsForm">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" placeholder="Username" />

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Email" />

                    <button type="submit">Save Profile Settings</button>
                </form>
            </section>

            <section className="account-settings">
                <h2>Change Account Settings</h2>
                <form id="accountSettingsForm">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" placeholder="Password" />

                    <button type="submit">Save Account Settings</button>
                </form>
            </section>
            <section className="account-settings">
                <button onClick={handleLogout}>Logout</button>
            </section>
        </div>

    );
};
export default SettingsPage