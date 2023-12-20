// import { Octokit } from "https://esm.sh/@octokit/core@5.0.2";
("ghu_gffmNZlAGGn8RGLM8125PsoJ4AxKMo1hi53H");
async function viewFile() {
  $("#view-btn").attr("disabled", "").attr("title", "you are on view mode!");
  $("#edit-btn").removeAttr("disabled");
  $("pre").remove(true);
  console.info("removed all pre tags");
  $("div").show();
  $("#parent").hide();
  $("#mode-btn-view").hide();
  $("#mode-btn-view").click(async function () {
    console.debug("debugging started");
    try {
      console.info("DEBUG: TRY: try block started");
      console.debug("DEBUG: call viewFile() started");
      $("#mode-btn-view").text("going back to view mode...");
      window.location.reload();
      console.debug("DEBUG: call viewFile() ended");
      console.debug("DEBUG: TRY: try block ended");
      console.debug("DEBUG: TRY: try block left");
    } catch (error) {
      console.error("DEBUG: TRY: viewFile(): error in function: " + error);
    }
    console.debug("DEBUG: call viewFile() ended");
    console.debug("debugging ended");
  });
  $("#status-msg").text("loading...").css("color", "white");
  console.log(
    "DEBUG: TESTING: TEST:FUNCTIONRESPONSE: INITIATING: TEST1: console.log TEST"
  );
  console.log("DEBUG: TEST: function is working");
  const sd = new showdown.Converter();
  const response = await fetch(
    "https://api.github.com/repos/AG123-321/giteditor/contents/README.md#blooket",
    {
      headers: {
        Authorization: localStorage.getItem("github-user-token"),
      },
    }
  );
  const file = await response.json();
  const content = atob(file.content);
  $("#status-msg")
    .html(
      content + ""
      // " <button onclick='$(this).text(`ok. loading...`); editFile(`${atob(file.content)}`)' id='mode-btn'>&#9998; edit file</button>"
    )
    .css("color", "white");
}

function editFile(content) {
  $("#edit-btn").attr("disabled", "").attr("title", "you are on edit mode!");
  $("#view-btn").removeAttr("disabled");
  $("div").hide();
  $("#mode-btn-view").show();

  $("body").append(
    $("<div></div>")
      .html(`<pre id="editor">${content}</pre>`)
      .attr("id", "parent")
  );
  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/twilight");
  editor.setOptions({
    fontSize: "12pt",
  });
}

$("body").ready(async function () {
  const gh = new Octokit({
    auth: localStorage.getItem("github-user-token"),
  });
  await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
    owner: "AG123-321",
    repo: "giteditor",
    path: "newfile.js",
    message: "test github api",
    committer: {
      name: "ag123",
      email: "ag123@github.com",
    },
    content: "test",
  });
  $("#mode-btn-view").hide();
  $("#view-btn").attr("onclick", "viewFile()");
  $("#edit-btn").attr("onclick", "editFile()");
  viewFile();
});
