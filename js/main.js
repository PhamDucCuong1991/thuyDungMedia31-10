// main.js


jQuery(document).ready(function() {
    // Hàm onclick
    function showConstants() {
        console.log(Constants.CONSTANT_1); // Output: Value 1
        console.log(Constants.CONSTANT_2); // Output: Value 2

    }

    // Gán hàm onclick cho một phần tử HTML cụ thể
    $('#myButton').click(showConstants);
});

function login() {
    const username = $("#username").val();
    const password = $("#password").val();
    if (username === "admin" && password === "12345") {
        alert("login success!")
        sessionStorage.setItem("isLoggedIn", "admin");
        window.location.href="../HTML/traCuu.html"
        // location.href = "../HTML/traCuu.html"
    } else {
        alert("wrong the password!")
    }
    $("#username").val("");
    $("#password").val("");
}