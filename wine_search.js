//rather than needing to stop and restart express all of the time, I am testing out the wine searching here

//KEY:
//vintage ->    Pre 2000's (pre2k), 2000-2009 (2ks), 2010's (210s)

function wineSearch(variety, vintage, continent, searchTerm) {
    var sqlString = "select * from wineReviews";

    if(variety || vintage || continent || searchTerm){
        sqlString += " where ";

        if(variety){
            sqlString += "variety = " + variety + " AND ";
        }
        if(vintage){
            sqlString += "vintage = " + vintage + " AND ";
        }
        if(continent){
            sqlString += "continent = " + continent + " AND ";
        }
        if(searchTerm){
            sqlString += "searchTerm = " + searchTerm + " AND ";
        }
        if (sqlString.endsWith(" AND ")){
            console.log(sqlString.substring(0,sqlString.length - 5));
        }
    } else {
        console.log(sqlString);
    }
}

console.log("Should log out variety and search term:");
console.log(wineSearch("d",null,null,"v"));