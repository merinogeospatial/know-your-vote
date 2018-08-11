var address = "";

$("#addressSubmit").on("click", function (event) {
  event.preventDefault();
  // Empty the googleCivic info div
  $(".civicInfo").empty();
  $(".civicPhoto").empty();

  $("#civicDiv").toggleClass('d-none', false);

  address = $("#addressInput").val();
  // addressLat = parseFloat("36.247731");
  // addressLong = parseFloat("-80.967286");
  // address = addressLat + " " + addressLong;
  console.log(address);

  var queryURL = "https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyB63BuMNDnsnLpIZ6-X1xj-2JI0Qo82js8&address=" + address;

  // Perform an AJAX request with the queryURL
  $.ajax({
      url: queryURL,
      method: "GET"
    })
    // After data comes back from the request
    .then(function (response) {
      console.log(response);

      // Obtain the information for the congressional district and append it to the div
      var division_id = Object.keys(response.divisions)[2];
      var congDist = response.divisions[division_id].name;
      // Append the congressional district text to the card title
      $(".card-title").append(congDist);

      // Office index to obtain the office name
      var officeIndex = response.divisions[division_id].officeIndices[0];
      // Office name
      var officeName = response.offices[officeIndex].name;
      // Official index to obtain the official's info
      var officialIndex = response.offices[officeIndex].officialIndices[0];

      // Create the state and district identifiers for db lookup
      var state = response.normalizedInput.state;
      var district = officeName.charAt(officeName.length - 1);
      var stateTag = $("<h5>");
      stateTag.addClass("state-tag");
      stateTag.append(state);
      var districtTag = $("<h5>");
      districtTag.addClass("district-tag");
      districtTag.append(district);
      
      // Create a tag to hold the official's name
      var officialNameText = $("<h3>");
      officialNameText.addClass("off-name");
      officialNameText.append(response.officials[officialIndex].name);
      $(".civicInfo").append(officialNameText);
      $(".civicInfo").append(stateTag);
      $(".civicInfo").append(districtTag);

      // Create a tag to hold the official's party
      var officialPartyText = $("<h4>");
      officialPartyText.addClass("party-name");
      officialPartyText.append(response.officials[officialIndex].party);
      $(".civicInfo").append(officialPartyText);

      // Create a tag to hold the official's phone number
      var officialContactPhone = $("<p>");
      officialContactPhone.addClass("off-phone");
      officialContactPhone.append(response.officials[officialIndex].phones[0]);
      $(".civicInfo").append(officialContactPhone);

      // Create a tag to hold the official's website
      var officialContactSite = $("<a>");
      officialContactSite.addClass("btn btn-secondary off-site");
      officialContactSite.attr("href", response.officials[officialIndex].urls[0]);
      officialContactSite.attr("role", "button");
      officialContactSite.attr("target", "_blank");
      officialContactSite.text("Website");
      $(".civicInfo").append(officialContactSite);

      // Create a an image tag
      var officialImage = $("<img>");
      officialImage.addClass("rounded img-responsive img-thumbnail");
      // Set the image source to the photo url result
      officialImage.attr("src", response.officials[officialIndex].photoUrl);
      // Append the image to the image div
      $(".civicPhoto").append(officialImage);
    });
});