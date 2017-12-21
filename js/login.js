$(document).ready(() => {

    const createButton = $('#create-button');
    const loginButton = $("#login-button");

    // Click function with ajax call which posts the user object to the server for authorization
    loginButton.click(() => {

        let loginUser = {
        username: $("#loginUsername").val(),
        password: $("#loginPassword").val()
        }
        loginUser = JSON.stringify(loginUser);

        let encryptedLoginUser = crypter.encryptAndDecrypt(loginUser);

        $.ajax({
            url: "http://localhost:8080/api/user/login",
            method: "POST",
            headers: null,
            contentType: "application/json",
            dataType: "json",
            data: encryptedLoginUser,

        success: function (data) {
            var token = crypter.encryptAndDecrypt(data);
            localStorage.setItem("token", token);
            getProfile();
        },
        error: function (err) {
            if (err) {
            alert("Brugernavn eller adgangskode er ikke korrekt. Prøv igen.")
            console.log("An unknown error occured")
            }
        }
        });

    });

    // Click function with ajax call which posts the the user object to the server for creation
    createButton.click(() => {

        let createdUser = {
        username: $("#createUsername").val(),
        password: $("#createPassword").val()
        };
        createdUser = JSON.stringify(createdUser);
        let encryptedCreatedUser = crypter.encryptAndDecrypt(createdUser);


        $.ajax({
            url: "http://localhost:8080/api/user/signup",
            method: "POST",
            headers: null,
            contentType: "application/json",
            dataType: "json",
            data: encryptedCreatedUser,

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

    // Function with an ajax call to retrieve the user object with the token received upon Login
    function getProfile() {

        $.ajax({
            url: "http://localhost:8080/api/user/myuser",
            method: "GET",
            headers: {authorization: localStorage.getItem("token")},
        success: function callback(data) {
            currentUser = crypter.encryptAndDecrypt(data);
            localStorage.setItem("user", currentUser);
            window.location.href = "myPage.html";
        },
        error: function (err) {
            if (err) {
                console.log("An unknown error occured")
            }
        }
        });
    }
});