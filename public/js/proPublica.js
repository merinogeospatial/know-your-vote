$("#addressSubmit").on("click", function(event) {
  event.preventDefault();
  $(".proPublica").empty();

  // Hold bill IDs here from first ajax call
  var voteArr = [];
  var showCount = 5;

  // First call to get sessions
  $.ajax({
    type: "GET",
    datatype: "json",
    url: "/api/sessions",
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
      index = voteArr[j].split("/");
      $.ajax({
        type: "GET",
        datatype: "json",
        url: "/api/sessions/" + index[index.length - 1],
        success: billInfo
      });
    }
  }

  function billInfo(res) {
    var searchMe = res.results.votes.vote.positions;
    console.log("Array to search in: ", searchMe);
    console.log("=============================");

    var foundRep = searchMe.filter(function(rep) {
      return rep.state === state && rep.district === district;
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

    // Truncate the "Bill name:" and "Summary:" as console logged above
    var shortTitle = res.results.votes.vote.bill.short_title;
    var truncTitle = shortTitle.substring(0, 100) + "...";
    var summary = res.results.votes.vote.bill.title;
    var truncSummary = summary.substring(0, 325) + "...";

    // Create a div to hold the bill card
    var billCard = $("<div>");
    billCard.addClass("col-sm");

    // Create a div to hold the bill info
    var billInfo = $("<div>");
    billInfo.addClass("card mx-auto");
    billInfo.attr("style", "width: 18rem;");

    // Create the yay and nay buttons
    var yayBtn = $("<button>");
    yayBtn.addClass("btn btn-success btn-lg");
    yayBtn.attr("type", "button");
    yayBtn.text("Yay");

    var nayBtn = $("<button>");
    nayBtn.addClass("btn btn-danger btn-lg");
    nayBtn.attr("type", "button");
    nayBtn.text("Nay");

    // Create a div to hold the card body
    var cardBody = $("<div>");
    cardBody.addClass("card-body");

    // Create a tag to hold the bill number and title
    var billTitle = $("<h5>");
    billTitle.addClass("card-title card-header bg-dark text-white");
    billTitle.append(res.results.votes.vote.bill.number + ": ");
    billTitle.append(truncTitle);

    // Create a tag to hold the bill's summary
    var billSummary = $("<p>");
    billSummary.addClass("card-text");
    billSummary.text(truncSummary);

    // Create a tag to hold the last action
    var billAction = $("<p>");
    billAction.addClass("card-text");
    billAction.text(res.results.votes.vote.bill.latest_action);

    // Create a tag to hold the rep's name and their decision on the bill
    var repInfo = $("<p>");
    repInfo.addClass("card-text");
    repInfo.append(foundRep[0].name + ": " + foundRep[0].vote_position);

    // Append info to the proPublica div
    cardBody.append(billTitle);
    cardBody.append(billSummary);
    cardBody.append(billAction);
    cardBody.append(repInfo);
    cardBody.append(yayBtn);
    cardBody.append(nayBtn);
    billInfo.append(cardBody);
    billCard.append(billInfo);
    $(".proPublica").append(billCard);
  }
});
