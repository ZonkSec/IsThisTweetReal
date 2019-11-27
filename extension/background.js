'use strict';


// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {
  var context = "image";
  var title = "Is this tweet real?";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                         "id": "context" + context}); 
});

// add click event
chrome.contextMenus.onClicked.addListener(onClickHandler);

// The onClicked callback function.
function onClickHandler(info, tab) {
  var api_key = "putkeyhere";
  var image_url = info.srcUrl;
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.ocr.space/parse/imageurl?apikey='+api_key+'&url='+image_url);
  xhr.send();
  xhr.onload = function() {
  if (xhr.status != 200) { // analyze HTTP status of the response
    alert(`Error ${xhr.status}: ${xhr.statusText}`);
  } else { // show the result
	var response_data = JSON.parse(xhr.responseText);
	var ocrtext = response_data.ParsedResults[0].ParsedText
    alert(String(ocrtext));
	console.log(ocrtext)
  }
};
};