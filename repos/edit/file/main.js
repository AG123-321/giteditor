$("body").onload(function () {
  params = new URLSearchParams(window.location.href);
  for (val in params.keys()) {
    alert(val);
  }
});
