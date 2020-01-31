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
  var api_key = "APIKEYHERE";
  var image_url = encodeURI(info.srcUrl);
  console.log(image_url)
  let xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://api.ocr.space/parse/image');
  xhr.setRequestHeader("apikey", api_key);
  var formData = new FormData();
  formData.append("url", image_url);
  xhr.send(formData);
  xhr.onload = function() {
  if (xhr.status != 200) { // analyze HTTP status of the response
    alert(`Error ${xhr.status}: ${xhr.statusText}`);
  } else { // show the result
	var response_data = JSON.parse(xhr.responseText);
	var ocrtext = String(response_data.ParsedResults[0].ParsedText)
	var handle = ocrtext.match("@[A-Za-z0-9_]{1,15}");
	var date = ocrtext.match("[0-9]{1,2} [a-zA-Z]{3} [0-9]{4}");
	var tweet = String(ocrtext.match(/(?<=@.{1,15}$)([\s\S]*)(?=^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9])/gms));
	if (tweet == "null"){
		var tweet = String(ocrtext.match(/(?<=@.{1,15}$)([\s\S]*)/gms));
	}
	tweet = tweet.replace(/\n/g, " ");
    alert("handle: "+handle+"\ndate: "+date+"\ntweet: "+tweet+"\n\n Click ok to search Twitter");
	chrome.tabs.create({ url: "https://twitter.com/search?lang=en&q="+tweet+"%20(from%3A"+handle+")" });
	console.log(ocrtext)
  }
};
};