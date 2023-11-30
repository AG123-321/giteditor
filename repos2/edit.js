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

$("document").ready(async function () {
  commits = await gitapi("/repos/AG123-321/giteditor/commits/");
});
