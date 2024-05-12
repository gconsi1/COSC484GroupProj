import React, { useState } from "react";

const ProfilePage = () => {
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
            </div>
        </div>
    );
};

export default ProfilePage;