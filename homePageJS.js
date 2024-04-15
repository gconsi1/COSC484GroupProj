//JavaScript to create new post and display it in "Latest Posts" section
document.addEventListener('DOMContentLoaded', function() {
    var createPostForm = document.getElementById("createPostForm");
    var postContent = document.getElementById("postContent");
    var postList = document.querySelector(".post-list");

    createPostForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        
        var content = postContent.value.trim(); // Get the content from the input field

        if (content !== '') { // Check if the content is not empty
            var newPost = document.createElement('div');
            newPost.classList.add('post');
            newPost.innerHTML = '<p class="post-content">' + content + '</p>';
            postList.appendChild(newPost); // Append the new post to the post list
            postContent.value = ''; // Clear the input field
        }
    });
});
// JavaScript to hide the Username and Profile Picture card
document.addEventListener('DOMContentLoaded', function() {
    var loginForm = document.getElementById("loginForm");
    loginForm.addEventListener('submit', function(event) {
        var username = loginForm.querySelector('input[type="text"]').value;

        //TODO: send a request to database to get username and profile picture

        //Hide the login form
        loginForm.parentNode.style.display = 'none';

        var userProfileButton = document.getElementById('user-profile-button');
        userProfileButton.innerHTML = '<span>${username}</span><span>Profile Picture</span>';
        userProfileButton.style.display = 'inline-flex';
    })
});