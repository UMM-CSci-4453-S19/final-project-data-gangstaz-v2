//rather than needing to stop and restart express all of the time, I am testing out the wine searching here

//KEY:
//vintage ->    Pre 2000's (pre2k), 2000-2009 (2ks), 2010's (210s)

var sqlString = "select * from wineReviews";

function wineSearch(variety, vintage, continent, searchTerm) {

    sqlString = "select * from wineReviews";

    if(variety || vintage || continent || searchTerm){
        sqlString += " where ";

        if(variety){
            sqlString += "variety = " + "'" + variety + "'" + " AND ";
        }
        if(vintage){
            sqlString += "vintage = " + "'" + vintage + "'" + " AND ";
        }
        if(continent){
            sqlString += "continent = " + "'" + continent + "'" + " AND ";
        }
        if(searchTerm){
            sqlString += "searchTerm = " + "'" + searchTerm + "'" + " AND ";
        }
        if (sqlString.endsWith(" AND ")){
            sqlString = sqlString.substring(0,sqlString.length - 5);
            console.log(sqlString);
        }
    } else {
        console.log(sqlString);
    }
}

console.log(wineSearch("Red Blend",1996,"North America",null));
console.log(wineSearch("Blue Blend",1997,null,"v"));
console.log(wineSearch("Green Blend",null,"North America","v"));
console.log(wineSearch(null,1999,"North America","v"));