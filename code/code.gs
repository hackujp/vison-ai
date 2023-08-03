// GCPのAPI Keyをここに記載
var APIKey = '';

function doGet() {
  return HtmlService.createTemplateFromFile('Main').evaluate();
}

// imageURLを使用してリクエストを生成する関数
function buildJSONRequestImgUrl(imgUrl) {
  return JSON.stringify({
    requests: [{
      image: {
        source: {
          imageUri: imgUrl
        }
      },
      // - type: VisonAPIで使用する機能を指定
      //   - 詳しくはこちら https://cloud.google.com/vision/docs/reference/rest/v1/Feature
      // - maxResults: 結果を何件取得するか
      features: [{
          "type": "LABEL_DETECTION",
          "maxResults": 5
      }]
    }]
  });
}

// リクエストを送る関数
function makeRequest(imgUrl) {
  // Make a POST request to Vision API with a JSON payload.      
  var visionApiUrl = 'https://vision.googleapis.com/v1/images:annotate?key=' +
    APIKey;
  var JSON_REQ = buildJSONRequestImgUrl(imgUrl);
  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON_REQ,
    "muteHttpExceptions" : true,
  };
  var response = UrlFetchApp.fetch(visionApiUrl, options);
  return response.getContentText();
}
