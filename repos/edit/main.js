import { Octokit } from "https://esm.sh/@octokit/core";

$("document").ready(async function () {
  right
  
  try {
    const gh = new Octokit({
      auth: `${localStorage.getItem("github-user-token")}`,
    });

    let response = await gh.request("GET /repos/AG123-321/giteditor", {});
    const repo = response.data;
    const branch = repo.default_branch;
    response = await gh.request(
      "GET /repos/AG123-321/giteditor/git/trees/" + branch + "?recursive=true"
    );

    const tree = response.data.tree;

    for (let i = 0; i < tree.length; i++) {
      const path = tree[i].path;

      if ($(`body p:contains("${path}"):first`).length === 0) {
        if (path.includes("/")) {
          const folderName = path.split("/").slice(-1);
          const folderType = tree.find(
            (item) => item.path === folderName
          )?.type;

          $("body").append(
            $("<p></p>").text(
              folderName + (folderType === "tree" ? " (folder):" : "")
            )
          );
        } else {
          $("body").append($("<p></p>").text(path));
        }
      }
    }
  } catch (e) {
    console.log("Error: " + e);
  }
});
