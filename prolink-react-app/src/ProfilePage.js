import React, { useState, useEffect } from "react"; // Make sure useEffect is imported here
import { useParams } from "react-router-dom";

const ProfilePage = () => {
    const { userId } = useParams(); // This will get the userId from the URL
    const [user, setUser] = useState(null); // This state will hold the user data
    const [resume, setResume] = useState(null);

    // Handles file input change
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setResume(file);
        }
    };

    // Function to handle viewing the resume
    const viewResume = () => {
        if (resume) {
            // Create a URL for the file
            const fileUrl = URL.createObjectURL(resume);
            // Open the resume in a new tab
            window.open(fileUrl, '_blank');
        }
    };

    const handleAddFriend = () => {
        const loggedInUserId = "YOUR_LOGGED_IN_USER_ID_HERE"; // This needs to be dynamically set
        fetch(`/api/add-friend`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: loggedInUserId, friendId: userId })
        })
        .then(response => response.json())
        .then(data => {
            alert('Add friend response: ' + data.message);
        })
        .catch(error => console.error('Error adding friend:', error));
    };



     // Fetch user data on component mount or userId change
     useEffect(() => {
    console.log(`Fetching data for user ID: ${userId}`);
    fetch(`/api/users/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched user data:', data);
            setUser(data);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            console.log(`Failed to fetch data for user ID: ${userId}`);
        });
}, [userId]);

    return (
    <div className="webpage">
        <header className="webpage-header">
            {/* Header content */}
        </header>
        <div className="topnav">
            <a href="#">Friends</a>
            <a href="#">Notifications</a>
            <a href="#">Saved Posts</a>
        </div>
        <br />
        <div className="profilePic">
            <img id="profilePic" src="blankProfilePic.png" alt="profile picture" />
            <p>Name goes here</p>
        </div>
        <div className="profPagePosts">
            <h2>About Me</h2>
            <div className="startPost">
                <p>User bio goes here</p>
            </div>
            <div className="userPosts">
                <h2>Post history</h2>
                <div className="allPosts">
                    <p>User will see their posts here</p>
                </div>
            </div>
            <div className="resume-upload">
                <label htmlFor="resume">Upload Resume:</label>
                <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                {resume && (
                    <button onClick={viewResume}>View Resume</button>
                )}
            </div>
            {/* Add Friend button */}
            <div className="add-friend">
                {user && (
                    <button onClick={handleAddFriend}>Add as Friend</button>
                )}
            </div>
        </div>
    </div>
);
};

export default ProfilePage;