var baseURL = "https://api.propublica.org/congress/v1/house/votes/recent.json";

$("#addressSubmit").on("click", function(event) {
  event.preventDefault();
  // Hold bill IDs here from first ajax call
  var voteArr = [];
  var showCount = 5;
  var chosenState = $(".state-tag").text();
  var chosenDistrict = $(".district-tag").text();

  // First call to get sessions
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
      voteAtIndex = res.results.votes[i].vote_uri;
      voteArr.push(voteAtIndex);
    }

    console.log("Vote Array: ", voteArr);

    // Call to get vote array, on success get bills | LOOP THIS
    for (var j = 0; j < showCount; j++) {
      $.ajax({
        type: "GET",
        datatype: "json",
        url: voteArr[j],
        headers: { "X-API-Key": "LjmVYWxsxc3AVh82fQwIvvGqtOYefsTLfhxq7BEK" },
        success: billInfo
      });
    }
  }

  function billInfo(res) {
    var searchMe = res.results.votes.vote.positions;
    console.log("Array to search in: ", searchMe);
    console.log("=============================");

    var foundRep = searchMe.filter(function(rep) {
      return rep.state === chosenState && rep.district === chosenDistrict;
    });

    console.log("Your rep's name || ", foundRep[0].name);
    console.log("Your rep's decision || ", foundRep[0].vote_position);
    console.log("=============================");
    console.log("=============================");
    console.log("Bill info object: ", res.results);
    console.log("Bill name:", res.results.votes.vote.bill.short_title);
    console.log("Bill number:", res.results.votes.vote.bill.number);
    console.log("Latest action:", res.results.votes.vote.bill.latest_action);
    console.log("Summary:", res.results.votes.vote.bill.title);
  }
});
