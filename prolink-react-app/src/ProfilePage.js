import React from "react";

const ProfilePage = () => {
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
                {/* Corrected self-closing tag */}
                <img id="profilePic" src="blankProfilePic.png" alt="profile picture" />
                <p>Name goes here</p>
            </div>
            <div className="profPagePosts">
              <h2>About Me</h2>
                <div className="startPost">
                    {/* Corrected self-closing tag */}
                    <p>User bio goes here</p>
                </div>
                <div className="userPosts">
                    <h2>Post history</h2>
                    <div className="allPosts">
                        <p>User will see their posts here</p>
                    </div>
                </div>
                {/* File upload field */}
                <div className="resume-upload">
                    <label htmlFor="resume">Upload Resume:</label>
                    <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
