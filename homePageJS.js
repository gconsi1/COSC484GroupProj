// JavaScript to toggle Dropdown menu on Profile
// document.addEventListener('DOMContentLoaded', function(){
//     var createPostForm = document.getElementById("createPostForm");
//     var postList = document.getElementById("postList");

//     createPostForm.addEventListener('submit', function(event) {
//         var postContent = document.getElementById("postContent").value;
//         var newPost = document.createElement("div");
//         newPost.classList.add("post");

//         //Create a new post
//         var postContentElement = document.createElement("p");
//         postContentElement.classList.add("post-content");
//         postContentElement.textContent = postContent;
//         newPost.appendChild(postContentElement);

//         //Add new post to the top of the feed
//         postList.insertBefore(newPost, postList.firstChild);

//         //Clear the form input after submission
//         document.getElementById("postContent").value = "";
//     })
// });
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
