$(document).ready(() => {

    const currentUser = localStorage.getItem("user");

$("#nav-container").load("nav.html", () => {

    if (currentUser) {
        $(".navbar-right").html(`

            <li><a href="index.html" id="logout-link">Logout</a></li>
          `);
    } else {
        $(".navbar-right").html(`
            <li><a href="login.html">Log ind <span class="sr-only">(current)</span></a></li>
          `);
}
$("#logout-link").click(() => SDK.User.logOut());
});
});