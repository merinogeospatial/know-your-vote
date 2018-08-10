// var apiKey = "LjmVYWxsxc3AVh82fQwIvvGqtOYefsTLfhxq7BEK";
var baseURL =
  "https://api.propublica.org/congress/v1/115/house/bills/introduced.json";

var billArr = [];

$.ajax({
  type: "GET",
  datatype: "json",
  url: baseURL,
  headers: { "X-API-Key": "LjmVYWxsxc3AVh82fQwIvvGqtOYefsTLfhxq7BEK" },

  success: function(res) {
    // Let's store all bill ids into array --- results[0].bills[i]
    var showCount = 5;

    console.log("Master Object: ", res);

    for (var i = 0; i < showCount; i++) {
      billID = res.results[0].bills[i].bill_id;
      billArr.push(billID);
    }

    console.log("Bill Array: ", billArr);
  }
});

//   // Perform an AJAX request with the queryURL
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   })
//     // After data comes back from the request
//     .then(function(response) {
//       console.log(response);
//       // Create a div to hold the info
//       var civicText = $("<p>");

//       // Set a string variable to capture the response text
//       var str = response.offices[0].name;
//       var strTwo = Object.keys(response.divisions)[2];
//       var strFour = response.divisions[strTwo].name;

//       console.log(strFour);
//       // Insert the info
//       civicText.append(strFour);

//       // Append the wikiDiv to the image div
//       $(".civicInfo").append(civicText);
//     });
// });
