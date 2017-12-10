$(document).ready(() => {

    const currentUser = localStorage.getItem("user");
const id = JSON.parse(currentUser).userId;
const type = JSON.parse(currentUser).type;
const username = JSON.parse(currentUser).username;


$(".profileInfo").html(`
    
    <ul>
        <li>ID: ${id}</li>
        <li>Brugernavn: ${username}</li>
        <li>Type: ${type}</li>
    </ul>  
    `);


});