async function gitapi(endpoint) {
  baseUrl = "https://api.github.com";
  res = await fetch(baseUrl + endpoint, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("github-user-token"),
    },
  });
  data = await res.json();
  return data;
}

async function dir(path) {
  tree = await gitapi(path);
  $("body").append($("<p></p>").text("dir contents:"));
  for (let x = 0; x < tree.length; x++) {
    if (tree[x].type = "dir") {
      $("body").append(
        $("<a></a>")
          .text(tree[x].name + " (directory) (tap to expand)")
          .click(async function () {
            await dir(`/repos/AG123-321/giteditor/contents/${tree[x].name}`);
          })
      );
    }

    else {
        $("body").append($("<p></p>").text(tree[x].name))
    }
  }
}

$(document).ready(async function () {
  files = await gitapi("/repos/AG123-321/giteditor/contents");
  for (let i = 0; i < files.length; i++) {
    if (files[i].type == "file") {
      $("body").append($("<p></p>").text(files[i].name));
    } else {
      $("body").append(
        $("<a></a>")
          .text(files[i].name + " (directory) (click to expand)")
          .click(async function () {
            await dir(`/repos/AG123-321/giteditor/contents/${files[i].name}`);
          })
      );
    }
  }
});
