$(document).ready(() => {

    const createButton = $('#create-button');
    const loginButton = $("#login-button");

    loginButton.click(() => {

    let loginUser = {
        username: $("#loginUsername").val(),
        password: $("#loginPassword").val()
    }
    loginUser = JSON.stringify(loginUser);

$.ajax({
    url: "http://localhost:8080/api/user/login",
    method: "POST",
    headers: null,
    contentType: "application/json",
    dataType: "json",
    data: loginUser,


    success: function (data) {
        localStorage.setItem("token", data);
        getProfile();

        window.location.href = "userPage.html";
    },
    error: function (err) {
        if (err) {
            console.log("An unknown error occured")
        }
    }
});

});

    createButton.click(() => {

    let createdUser = {
        username: $("#createUsername").val(),
        password: $("#createPassword").val()
    }
    createdUser = JSON.stringify(createdUser);

$.ajax({
    url: "http://localhost:8080/api/user/signup",
    method: "POST",
    headers: null,
    contentType: "application/json",
    dataType: "json",
    data: createdUser,

    success: function (data) {
        window.alert("Din bruger er oprettet - Du kan nu logge ind.")
    },
    error: function (err) {
        if (err) {
            console.log("An unknown error occured")
        }
    }
});
});
function getProfile() {

    $.ajax({
        url: "http://localhost:8080/api/user/myuser",
        method: "GET",
        headers: {authorization: localStorage.getItem("token")},
        success: function callback(currentUser) {

            localStorage.setItem("user", currentUser);
        },
        error: function (err) {
            if (err) {
                console.log("An unknown error occured")
            }
        }
    });

}
});