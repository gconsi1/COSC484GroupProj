//JavaScript to create new post and siplay it in "Latest Posts" section
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
