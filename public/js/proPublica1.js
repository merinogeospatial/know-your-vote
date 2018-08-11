var baseURL = "https://api.propublica.org/congress/v1/house/votes/recent.json";

// Hold bill IDs here from first ajax call
var billArr = [];
var voteArr = [];
var showCount = 5;
var chosenRep = ""; // let's find by STATE and DISTRICT(CDFIPS) *NEED TO CHANGE 0's in DB!
// ! We can use a filter function to return rep and their vote choice! //

// First call to get bill ids, use callback for second ajax call
$.ajax({
  type: "GET",
  datatype: "json",
  url: baseURL,
  headers: { "X-API-Key": "LjmVYWxsxc3AVh82fQwIvvGqtOYefsTLfhxq7BEK" },
  success: getBillVotes
});

// Callback to use ids from first call in second GET url
function getBillVotes(res) {
  console.log("Master Object: ", res);

  for (var i = 0; i < showCount; i++) {
    billAtIndex = res.results.votes[i].bill.api_uri;
    billArr.push(billAtIndex);
    voteAtIndex = res.results.votes[i].vote_uri;
    voteArr.push(voteAtIndex);
  }

  console.log("Bill Array: ", billArr);
  console.log("Vote Array: ", voteArr);

  $.ajax({
    type: "GET",
    datatype: "json",
    url: voteArr[0],
    headers: { "X-API-Key": "LjmVYWxsxc3AVh82fQwIvvGqtOYefsTLfhxq7BEK" },
    success: function(res) {
      console.log("Array to search in: ", res.results.votes.vote.positions);
    }
  });

  // Second part ajax call goes here, run a loop based on length of bill array, call from url list
  // for (var j = 0; j < showCount; j++) {
  //   $.ajax({
  //     type: "GET",
  //     datatype: "json",
  //     url: billArr[j],
  //     headers: { "X-API-Key": "LjmVYWxsxc3AVh82fQwIvvGqtOYefsTLfhxq7BEK" },
  //     success: getRep
  //   });
  // }
}

// function getRep(data) {
//   console.log("==============================");
//   console.log("Master Bill object: ", data);
//   console.log("Date: ", data.results[0].introduced_date);
//   console.log("Subject: ", data.results[0].primary_subject);
//   console.log("Title: ", data.results[0].short_title);
//   console.log("Bill Number: ", data.results[0].number);
//   console.log("Bill Number: ", data.results[0].number);
//   console.log("Latest action: ", data.results[0].latest_major_action);
//   console.log("Govtrack Info: ", data.results[0].govtrack_url);
//   console.log("Official Site: ", data.results[0].congressdotgov_url);
//   console.log("Sponsor URI: ", data.results[0].congressdotgov_url);
//   // Add sponsor and whatever else we need
//   console.log("==============================");
// }

//get recent votes
//from object store in bills array and votes array
