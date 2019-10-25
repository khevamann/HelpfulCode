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

//Extracts all club information from https://www.asi.calpoly.edu/club_directories/directory
var clubs = []
$('#club_directory_content').find('ul > .club_list')
  .each(function(){
    var clubObj = {}
    clubObj.name = $(this).find('a')[0].innerText
    $(this).find('span').each(function(){
      var element = $(this)[0]
      if(element.className == 'club_details_title'){
        var nextSib = element.nextSibling
        clubObj[element.innerText] = nextSib.innerText
      } 
    })
    clubs.push(JSON.stringify(clubObj)) 
});


//Save JSON to file
function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}
download(clubs, 'json.txt', 'text/plain');
