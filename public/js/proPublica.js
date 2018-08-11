// var apiKey = "LjmVYWxsxc3AVh82fQwIvvGqtOYefsTLfhxq7BEK";
var baseURL =
  "https://api.propublica.org/congress/v1/115/house/sessions/1/votes/438.json";

// Hold bill IDs here from first ajax call
var billArr = [];

// First call to get bill ids, use callback for second ajax call
$.ajax({
  type: "GET",
  datatype: "json",
  url: baseURL,
  headers: { "X-API-Key": "LjmVYWxsxc3AVh82fQwIvvGqtOYefsTLfhxq7BEK" },
  success: getBills
});

// Callback to use ids from first call in second GET url
function getBills(res) {
  var showCount = 5;

  console.log("Master Object: ", res);

  for (var i = 0; i < showCount; i++) {
    billID = res.results[0].bills[i].bill_uri;
    billArr.push(billID);
  }

  console.log("Bill Array: ", billArr);

  // Second part ajax call goes here, run a loop based on length of bill array, call from url list
  for (var j = 0; j < showCount; j++) {
    $.ajax({
      type: "GET",
      datatype: "json",
      url: billArr[j],
      headers: { "X-API-Key": "LjmVYWxsxc3AVh82fQwIvvGqtOYefsTLfhxq7BEK" },
      success: getRep
    });
  }
}

function getRep(data) {
  console.log("==============================");
  console.log("Master Bill object: ", data);
  console.log("Date: ", data.results[0].introduced_date);
  console.log("Subject: ", data.results[0].primary_subject);
  console.log("Title: ", data.results[0].short_title);
  console.log("Bill Number: ", data.results[0].number);
  console.log("Bill Number: ", data.results[0].number);
  console.log("Latest action: ", data.results[0].latest_major_action);
  console.log("Govtrack Info: ", data.results[0].govtrack_url);
  console.log("Official Site: ", data.results[0].congressdotgov_url);
  console.log("Sponsor URI: ", data.results[0].congressdotgov_url);
  // Add sponsor and whatever else we need
  console.log("==============================");
}

// we need a function that happens on success of the looped calls.
// this should append a bill card that is created dynamically via template

// running into problems here with CORS. The chrome extension I have for handling this is not working as it usually does
// I think there is a problem with using a for loop on the ajax calls since they are async
// We can have a "show" button that loads the cards and fires the ajax call for the specified url when clicked
// This means we have to track the index, we can simply tie this to the html element (hardcoded), then that index maps to
// our bill array
