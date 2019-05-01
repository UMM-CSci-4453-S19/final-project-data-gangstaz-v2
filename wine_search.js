//rather than needing to stop and restart express all of the time, I am testing out the wine searching here

//KEY:
//vintage ->    Pre 2000's (pre2k), 2000-2009 (2ks), 2010's (210s)

var dropDownSQL = "select * from taster join wineReviews on tasterFk=tasterId join location on locFk=locId";
var anyTermSQL = "OR";

function anyTermSearch(searchTerm){
    anyTermSQL = "OR";

    //   Fields per table that are not dropdowns:
    //location: country, province, region, continent
    //wineReviews: description, designation, points, price, winery
    //taster: name, twitter


}

function dropDownSearch(variety, vintage, continent) {

    dropDownSQL = "select * from taster join wineReviews on tasterFk=tasterId join location on locFk=locId";

    if(variety || vintage || continent){
        dropDownSQL += " where ";

        if(variety){
            dropDownSQL += "variety = " + "'" + variety + "'" + " AND ";
        }
        if(vintage){
            dropDownSQL += "vintage = " + "'" + vintage + "'" + " AND ";
        }
        if(continent){
            dropDownSQL += "continent = " + "'" + continent + "'" + " AND ";
        }
        if (dropDownSQL.endsWith(" AND ")){
            dropDownSQL = dropDownSQL.substring(0,dropDownSQL.length - 5);
            dropDownSQL += ";";
            console.log(dropDownSQL);
        }


    } else {
        dropDownSQL += ";";
        console.log(dropDownSQL);
    }
}

console.log(dropDownSearch("Red Blend",1996,"North America"));
console.log(dropDownSearch("Blue Blend",1997,null));
console.log(dropDownSearch("Green Blend",null,"South America"));
console.log(dropDownSearch(null,1999,"Africa"));




