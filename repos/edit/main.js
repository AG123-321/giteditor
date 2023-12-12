import { Octokit } from "https://esm.sh/@octokit/core";

$("document").ready(async function () {
  let state = $("#status-msg");
  const params = new URLSearchParams(window.location.search);
  if (!params.get("name")) {
    alert(
      "error: 400, NO_PARAMETERS_SPECIFIED. do not try to reload this page. instead, go back to the homepage and try click your repository again. error_code: request_malformed"
    );

    history.back();
  }

  if (!params.get("user")) {
    alert(
      "error: 400, NO_PARAMETERS_SPECIFIED. do not try to reload this page. instead, go back to the homepage and try click your repository again. error_code: request_malformed"
    );

    history.back();
  }

  try {
    const gh = new Octokit({
      auth: `${localStorage.getItem("github-user-token")}`,
    });

    const reponame = params.get("name");
    const user = params.get("user");
    try {
      await gh.request(`GET /users/${user}#blooket`);
    } catch (e) {
      if (e == "HttpError: Not Found") {
        state.css("color", "red");
        state.text("user " + user + " doesn't exist!");
        return;
      }
    }

    try {
      await gh.request(`GET /repos/${user}/${reponame}#blooket`);
    } catch (e) {
      state.css("color", "red");
      state.text("repository " + user + "/" + reponame + " not found!");
      return;
    }

    state.text(`loading repo contents: ${user}/${reponame}`);
    let response = await gh.request(`GET /repos/${user}/${reponame}#blooket`, {});
    let repo = response.data;
    let branch = repo.default_branch;

    try {
      await gh.request(
        `GET /repos/${user}/${reponame}/git/trees/${branch}#blooket?recursive=true`
      );
    } catch (e) {
      if (e == "HttpError: Git Repository is empty.") {
        $("body").append($("<p></p>").text("<git repository empty>"));
        return;
      }
    }

    state.text(`loading repo contents: ${user}/${reponame}`);
    response = await gh.request(`GET /repos/${user}/${reponame}#blooket`, {});
    repo = response.data;
    branch = repo.default_branch;
    response = await gh.request(
      `GET /repos/${user}/${reponame}/git/trees/` + branch + "#blooket" + "?recursive=true"
    );

    const tree = response.data.tree;
    let type = " ";
    for (let i = 0; i < tree.length; i++) {
      const path = tree[i].path;
      if (tree[i].type == "tree") {
        type = " (folder):";
      } else {
        type = "";
      }
      if (path.includes("/")) {
        $("body").append(
          $("<p></p>")
            .text(path + type)
            .click(function () {
              window.location.href = `/repos/edit/file?repo=${localStorage.getItem(
                "github-name"
              )}/${reponame}&fname=${tree[i].path}`;
            })
        );
      } else {
        $("body").append(
          $("<p></p>")
            .text(path + type)
            .click(function () {
              window.location.href = `/repos/edit/file?repo=${localStorage.getItem(
                "github-name"
              )}/${reponame}&fname=${tree[i].path}`;
            })
        );
      }
    }
  } catch (e) {
    console.log("Error: " + e);
    alert("500 UNKNOWN_ERROR. nothing we can do about it. try retrying?");
    history.back();
  }
});
