# Know Your Vote
### The Informed Voter App
Know Your Vote takes in parameters from a user, and gives them back data relevant specifically to them.  When the user provides an address and hits the submit button, Know Your Vote returns:
* The user's representative, including the representative's party, phone number, and other relevant information
* The latest bills that are currently being voted on
* How their representative voted on each of these bills
* The opportunity to submit how they would've voted on each of those same bills
* A view of how the representative's district voters are aligning with their bill votes via a map of US districts and a 'yay' / 'nay' vote tally.

## Motivation
Know Your Vote is a one page app, which complies with the guidelines of:
* Using Node and Express for the web server
* Utilization of a MySQL database
* GET and POST routes for retrieving and adding new data to the database
* Deployment on Heroku (with data)
* Utilization of at least one new library, package, or technology
* A polished frontend / UI
* A folder structure that meets the MVC Paradigm
* Good quality coding standards (indentation, scoping, naming, etc.)
* Protection of API key information on the server

## Project Usefulness
This web app is useful as a tool for quickly searching and finding a user's representative based on their address input.  It provides an example of how npm packages can be utilized to assist in API calls and user interaction, as well as how a MySQL database can be utilized to store resulting data obtained via surveying the user for 'yay' / 'nay' votes.  Finally, the map visual aid gives the user a quick view of how a representative's district is aligning with their voting behavior.

## Getting Started
Upon loading, Know Your Vote presents the user with in input form suggesting inputs for Street, City, and State.

1.  The user inputs their Street address in the first input field.
2.  The user inputs their City in the second input field.
3.  The user selects their State from the dropdown list of states..
4.  The user selects the Submit button to submit their address and return data relevant to their district.

## APIs / Libraries / Technology Used
In order to provide the user with this information, the following APIs, libraries, and technology are used:

### APIs
* Google Civic
* ProPublica

### Libraries / Technology
* npm - body-parser
* npm - dotenv
* npm - express
* npm - express-handlebars
* npm - i
* npm - mysql
* npm - mysql2
* npm - request
* npm - sequelize
* SASS

## Credits
Know Your Vote is the product of the combined efforts of Richard Haar, Scott Johnson, Rich Merino, and Anna Rutherford.
