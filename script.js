async function gitapi(endpoint) {
    baseUrl = "https://api.github.com"
    res = await fetch(baseUrl + endpoint, {
        headers: {Authorization: 'Bearer '+localStorage.getItem("github-user-token")}
    })
    data = await res.json()
    return data;
}

window.onload = async function() {
    loading = $("#repos-list")
    if (localStorage.getItem("github-user-token") == null) {
        loading.css("color", "red")
        loading.text("login to edit your repositories!")
    }

    else {
        loading.text(`Showing repositories owned by ${localStorage.getItem("github-name")}`)
    }
    repos = await gitapi("/user/repos")
    for (let i = 0; i < repos.length; i++) {
        reponame = repos[i].name
        if (repos[i].description == null) {
            desc = "none"
        }

        else {
            desc = repos[i].description
        }

        if (repos[i].language == null)
            lang = "None"
        }
        else {
            lang = repos[i].language
        }
        
        if (repos[i].private) {private = "(Private)"}

        else {private=""}

        if (desc == "none") {
            $("body").append($("<p></p>").text(reponame + " " + private), $("<h4></h4>").text("No description").css("text-align", "center"), $("<h3></h3>").text("Language:" + lang), $("<h3></h3>").text(repos[i].html_url), $("<br>"))
        }

        else {
            $("body").append($("<p></p>").text(reponame + " " +private), $("<h4></h4>").text(desc).css("text-align", "center"), $("<h3></h3>").text("Language:" + lang), $("<h3></h3>").text(repos[i].html_url), $("<br>"))
        }
    }
}