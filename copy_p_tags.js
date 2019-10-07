// Copy content from Mindtap Bookmarklet
window.pages = window.pages || {};
$('iframe').contents().find('.content').each(function(){
    var currPage = $(this)[0].attributes[2].nodeValue;
    if(!window.pages[currPage]){
      window.pages[currPage] = "";
      $(this).find('p').each(function(){
          window.pages[currPage] += $(this).text();
      });
      window.pages[currPage] += '\n\n';
    }
});

// Merge content
var content = "";
for (var key of Object.keys(window.pages)){
    content += window.pages[key];
};
navigator.permissions.query({name: "clipboard-write"}).then(result => {
  if (result.state == "granted" || result.state == "prompt") {
    navigator.clipboard.writeText(content);
  };
});
alert('Content Copied');
