var content = "";
$('iframe').contents().find('.content:eq(1) > p').each(function(){
content += $(this).text();
});
navigator.permissions.query({name: "clipboard-write"}).then(result => {
  if (result.state == "granted" || result.state == "prompt") {
    navigator.clipboard.writeText(content);
  }
});
