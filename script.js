window.onload = function() {
    if (localStorage.getItem("github-user-token") == null) {
        $('#noauth').show()
    }
}