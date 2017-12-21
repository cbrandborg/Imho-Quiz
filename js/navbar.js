$(document).ready(() => {

    const currentUser = localStorage.getItem("user");
    const adminquiz = $('#adminQuiz');


    /* *** Attention ***
    The navbar file has only been changed a bit by me to adjust its functionality.
    It is originally created by Jesper Hansen and resides in his repository: javascript-client
    The same goes the html page: nav.html
     */

    /* JQuery which loads the element from nav.html
        It checks whether the user is signed in and whether the user is an admin.
     */
    $("#nav-container").load("nav.html", () => {

    if (currentUser) {
        $(".navbar-right").html(`

            <li><a href="index.html" id="logout-link">Logout</a></li>
          `);
    }
    if (JSON.parse(currentUser).type === 1) {
       $(".navbar-left").html(`
            <li><a href="myPage.html">Din Profil</a> </li>
            <li><a href="courses.html">Fag</a></li>
            <li><a href="adminPage.html"  id="adminQuiz">Administrer Quizzer</a></li>
          `);

    }

    // Jquery to clear localstorage upon logout
    $("#logout-link").click(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("courseId");
        localStorage.removeItem("courseTitle");
        localStorage.removeItem("quiz");
        localStorage.removeItem("token");
        localStorage.removeItem("quizId");
        localStorage.removeItem("quizTitle");

        window.location.href = "index.html";
    });

    });
});