// JavaScript to toggle Dropdown menu on Profile
document.addEventListener('DOMContentLoaded', function() {
    var profileButton = document.getElementById("user-profile-button");
    var dropdownMenu = document.getElementById("dropdown-menu");

    profileButton.addEventListener('click', function() {
        dropdownMenu.classList.toggle('show');
    });

    //Close the dropdown menu if the user clicks outside of it
    window.addEventListener('click', function(event) {
        if(!event.target.matches('#user-profile-button')) {
            if(dropdownMenu.classList.contains('show')) {
                dropdownMenu.classList.remove('show');
            }
        }
    });
});