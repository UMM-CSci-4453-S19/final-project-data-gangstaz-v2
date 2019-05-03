//rather than needing to stop and restart express all of the time, I am testing out the wine searching here

// Feel free to try this, by running node wine_search.js and uncomment the console.log

// (variety, vintage, continent, searchTerm)
// console.log(buildSearchQuery(null, null, null, null))

// vintage values:    Pre 2000's (pre2k), 2000-2009 (2ks), 2010's (2010s)

var dropDownSQL = "";
var anyTermSQL = "";

module.exports = {
    // This is the function that returns the query you send to the database
    buildSearchQuery: function (variety, vintage, continent, searchTerm) {

        // If search term is not provided, just make it blank.
        if (!searchTerm) {
            searchTerm = "";
        }

        dropDownSQL = "select * from dataGangstas.taster join dataGangstas.wineReviews on tasterFk=tasterId join dataGangstas.location on locFk=locId where ";
        anyTermSQL = "(";

        dropDownSearch(variety, vintage, continent, searchTerm);
        anyTermSearch(searchTerm);

        anyTermSQL += ");";

        // Finally, return the final SQL search query.
        return ( dropDownSQL + anyTermSQL );
    }
};

// This is a helper function that deal with dropdown menu stuff
function dropDownSearch(variety, vintage, continent, searchTerm) {

    if (vintage === "pre2k") {
        dropDownSQL += "vintage < 2000 AND ";
    } else if (vintage === "2ks") {
        dropDownSQL += "vintage >= 2000 AND vintage < 2010 AND ";
    } else if (vintage === "2010s") {
        dropDownSQL += "vintage >= 2010 AND ";
    }

    if (variety) {
        dropDownSQL += "variety = " + "'" + variety + "'" + " AND ";
        console.log("Adding to DDS....value = " + dropDownSQL)
    } else {
        anyTermSQL += "variety LIKE '%" + searchTerm + "%' OR ";
        console.log("Adding to anyTerm....value = " + anyTermSQL)
    }

    if (continent) {
        dropDownSQL += "continent = " + "'" + continent + "'" + " AND ";
    } else {
        anyTermSQL += "continent LIKE '%" + searchTerm + "%' OR ";
    }

}

// This is a helper function that deals with text search terms
function anyTermSearch(searchTerm) {
    anyTermSQL += "description LIKE '%" + searchTerm + "%' OR " +
        "designation LIKE '%" + searchTerm + "%' OR " +
        "winery LIKE '%" + searchTerm + "%' OR " +
        "country LIKE '%" + searchTerm + "%' OR " +
        "province LIKE '%" + searchTerm + "%' OR " +
        "region LIKE '%" + searchTerm + "%' OR " +
        "name LIKE '%" + searchTerm + "%' OR " +
        "twitter LIKE '%" + searchTerm + "%' OR ";

    if (anyTermSQL.endsWith(" OR ")) {
        anyTermSQL = anyTermSQL.substring(0, anyTermSQL.length - 4);
    }

};


