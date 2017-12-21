$(document).ready(() => {

    const currentUser = localStorage.getItem("user");
    const profileInfo = $('#profile-info');
    const id = JSON.parse(currentUser).userId;
    const type = JSON.parse(currentUser).type;
    const username = JSON.parse(currentUser).username;
    var userType;

    // if statement which evaluates whether a user is admin or user and sets a string
        if (type == 1) {
            userType = "Admin";
        } else {
            userType = "Bruger";
        }

    // List table appended to a div in the html file
    profileInfo.append(`
    
        <ul>
            <li>ID: ${id}</li>
            <li>Brugernavn: ${username}</li>
            <li>Type: ${userType}</li>
        </ul>  
    `);
});