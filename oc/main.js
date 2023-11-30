import { Octokit } from "https://esm.sh/@octokit/core";

$("document").ready(async function () {
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
    const addedPaths = [];

    for (let i = 0; i < tree.length; i++) {
      const path = tree[i].path;

      if (!addedPaths.includes(path)) {
        addedPaths.push(path);

        if (path.includes("/")) {
          const folderName = path.split("/")[0];
          const folderType = tree.find(
            (item) => item.path === folderName
          )?.type;

          const elementText =
            folderName + (folderType === "tree" ? " (folder):" : "");
          $("body").append($("<p></p>").text(elementText));

          console.log("Added:", elementText);
        } else {
          $("body").append($("<p></p>").text(path));

          console.log("Added:", path);
        }
      } else {
        console.log("Skipped (Duplicate):", path);
      }
    }
  } catch (e) {
    console.log("Error: " + e);
  }
});
