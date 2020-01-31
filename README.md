# IsThisTweetReal
chrome extension to detect screenshots of modified/doctored/fake tweets

to use:
1. clone source
2. get free api key from ocr.space: https://ocr.space/OCRAPI
3. update background.js so var api_key is your api key. 
4. install as unpacked extension as described here: https://developer.chrome.com/extensions/getstarted


once loaded. you can right click on images and select "IsTweetReal". the extension will send the image to the OCR API, attempt to parse the ocr text of the image (this could use a lot of work), and then open a tab with a twitter.com query with parased params.

this was built as a proof of concept for a talk at the university of nebraska at omaha. 
