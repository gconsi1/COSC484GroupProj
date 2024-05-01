import React from "react";

const ProfilePage = () => {
    return (
        <div className="webpage">
          <header className="webpage-header">
            <div className="webpage-header-logo">
              {/* ProLink logo and name */}
              <div className="logo">
                <span className="logo-icon">
                  <img id="ProLinkLogo" src="prolinkdesign.png" alt="ProLink Logo" />
                </span>
                <h1 className="ProLink-name">
                  <span>ProLink</span>
                </h1>
              </div>
            </div>
            <div className="profilePic">
              {/* Corrected self-closing tag */}
              <img id="profilePic" src="blankProfilePic.png" alt="profile picture" />
              <p>Name goes here</p>
            </div>
          </header>
          <div className="topnav">
            <a href="#">Friends</a>
            <a href="#">Notifications</a>
            <a href="#">Messages</a>
            <a href="#">Account settings</a>
          </div>
          <div className="profPagePosts">
            <div className="startPost">
              {/* Corrected self-closing tag */}
              <input type="text" placeholder="Create new post" />
              <button>Post</button>
            </div>
            <div className="userPosts">
              <h2>Post history</h2>
              <div className="allPosts">
                <p>User will see their posts here</p>
              </div>
            </div>
          </div>
        </div>
    );
};
export default ProfilePage