import { Octokit } from "https://esm.sh/@octokit/core";
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
  const tree = response.data;
  for (let i = 0; i < tree.length; i++) {
    if (tree[i].includes("/")) {
      if (tree[i].type == "tree") {
        $("body").append(
          $("<p></p>").text(tree[i].path.split("/")[1] + " (folder):")
        );
      } else {
        $("body").append($("<p></p>").text(tree[i].path.split("/")[1]));
      }
    } else {
      if (tree[i].type == "tree") {
        $("body").append($("<p></p>").text(tree[i].path + " (folder):"));
      } else {
        $("body").append($("<p></p>").text(tree[i].path));
      }
    }
  }
} catch (e) {
  console.log("Error: " + e);
}
