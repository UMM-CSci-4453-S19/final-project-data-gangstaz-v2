var express=require('express'),
    mysql=require('mysql'),
    credentials=require('./credentials.json'),
    app = express(),
    port = process.env.PORT || 1337,
    search=require('./wine_search.js');

credentials.host='ids.morris.umn.edu'; //setup database credentials

var connection = mysql.createConnection(credentials); // setup the connection

connection.connect(function(err){if(err){console.log(err)}});

app.use(express.static(__dirname + '/public'));

app.get("/reviews",function(req,res){
    var sql = 'call dataGangstas.randMaster(null, null, 100);';

    connection.query(sql,(function(res){return function(err,rows,fields){
        if(err) {
            console.log(err);
            res.send(err); // Let the upstream guy know how it went
        }
        else {
            res.send(rows);
        }
    }})(res));
});

app.get("/varieties",function(req,res){
    var sql = 'select distinct variety from dataGangstas.wineReviews order by variety;';

    connection.query(sql,(function(res){return function(err,rows,fields){
        if(err) {
            console.log(err);
            res.send(err); // Let the upstream guy know how it went
        }
        else {
            res.send(rows);
        }
    }})(res));
});

app.get("/continents",function(req,res){
    var sql = 'select distinct continent from dataGangstas.location order by continent;';

    connection.query(sql,(function(res){return function(err,rows,fields){
        if(err) {
            console.log(err);
            res.send(err); // Let the upstream guy know how it went
        }
        else {
            res.send(rows);
        }
    }})(res));
});

app.get("/listAllOfType",function(req,res){
    var type = req.param('type');
    var sql = 'Select count(id) as count, ' + type + ' from dataGangstas.wineReviews join dataGangstas.location on locFk = locId group by '  + type + ';';

    connection.query(sql,(function(res){return function(err,rows,fields){
        if(err) {
            console.log(err);
            res.send(err); // Let the upstream guy know how it went
        }
        else {
            res.send(rows);
        }
    }})(res));
});

app.get("/countries",function(req,res){
    var country = req.param('country');
    var sql = 'Select description, designation, points, price, variety, winery, vintage, province from dataGangstas.wineReviews join dataGangstas.location on locFk = locId where country = ' + "\'" + country + "\'" + ';';

    connection.query(sql,(function(res){return function(err,rows,fields){
        if(err) {
            console.log(err);
            res.send(err); // Let the upstream guy know how it went
        }
        else {
            res.send(rows);
        }
    }})(res));
});

app.get("/highestRated",function(req,res){
    var type = req.param('type');
    var sql = 'Select country, description, variety, winery, vintage, province, max(points) as max from dataGangstas.wineReviews join dataGangstas.location on locFk = locId group by ' + type + ';';

    connection.query(sql,(function(res){return function(err,rows,fields){
        if(err) {
            console.log(err);
            res.send(err); // Let the upstream guy know how it went
        }
        else {
            res.send(rows);
        }
    }})(res));
});

app.get("/highestPriceCountry",function(req,res){
    var type = req.param('type');
    var sql = 'CALL dataGangstas.aggMaster("max", "price", "country");';

    connection.query(sql,(function(res){return function(err,rows,fields){
        if(err) {
            console.log(err);
            res.send(err); // Let the upstream guy know how it went
        }
        else {
            res.send(rows);
        }
    }})(res));
});

app.get("/highestPrice",function(req,res){
    var type = req.param('type');
    var sql = 'CALL dataGangstas.aggMaster("max", "price", ' + type + ');';

    connection.query(sql,(function(res){return function(err,rows,fields){
        if(err) {
            console.log(err);
            res.send(err); // Let the upstream guy know how it went
        }
        else {
            res.send(rows);
        }
    }})(res));
});

app.get("/lowestPrice",function(req,res){
    var type = req.param('type');
    var sql = 'Select country, description, variety, winery, vintage, province, min(price) as minPrice from dataGangstas.wineReviews join dataGangstas.location on locFk = locId group by ' + type + ';';

    connection.query(sql,(function(res){return function(err,rows,fields){
        if(err) {
            console.log(err);
            res.send(err); // Let the upstream guy know how it went
        }
        else {
            res.send(rows);
        }
    }})(res));
});

app.get("/bestValue",function(req,res){
    var type = req.param('type');
    var sql = 'Select country, description, variety, winery, vintage, province, points, price, max(points/price) as value from dataGangstas.wineReviews join dataGangstas.location on locFk = locId group by ' + type + ';';

    connection.query(sql,(function(res){return function(err,rows,fields){
        if(err) {
            console.log(err);
            res.send(err); // Let the upstream guy know how it went
        }
        else {
            res.send(rows);
        }
    }})(res));
});

app.get("/highestPriceOverall",function(req,res){
    var sql = 'CALL dataGangstas.aggMaster("max", "price", null);';

    connection.query(sql,(function(res){return function(err,rows,fields){
        if(err) {
            console.log(err);
            res.send(err); // Let the upstream guy know how it went
        }
        else {
            res.send(rows);
        }
    }})(res));
});

app.get("/highestRatedOverall",function(req,res){
    var sql = 'CALL dataGangstas.aggMaster("max", "points", null);';

    connection.query(sql,(function(res){return function(err,rows,fields){
        if(err) {
            console.log(err);
            res.send(err); // Let the upstream guy know how it went
        }
        else {
            res.send(rows);
        }
    }})(res));
});

app.get("/bestValueOverall",function(req,res){
    var sql = 'Select *, points/price as value from dataGangstas.wineReviews join dataGangstas.location on locFk = locId where points > 87 order by value desc limit 10;';

    connection.query(sql,(function(res){return function(err,rows,fields){
        if(err) {
            console.log(err);
            res.send(err); // Let the upstream guy know how it went
        }
        else {
            res.send(rows);
        }
    }})(res));
});

app.get("/cheapestPriceOverall",function(req,res){
    var sql = 'CALL dataGangstas.aggMaster("min", "price", null);';

    connection.query(sql,(function(res){return function(err,rows,fields){
        if(err) {
            console.log(err);
            res.send(err); // Let the upstream guy know how it went
        }
        else {
            res.send(rows);
        }
    }})(res));
});

app.get("/search",function(req,res){
    var variety = req.param("variety");
    var vintage = req.param("vintage");
    var continent = req.param("continent");
    var searchTerm = req.param("searchTerm");

    var sql = search.buildSearchQuery(variety, vintage, continent, searchTerm);

    console.log('Attempting SQL: --->' + sql + '<---');

    connection.query(sql,(function(res){return function(err,rows,fields){
        if(err) {
            console.log(err);
            res.send(err); // Let the upstream guy know how it went
        }
        else {
            res.send(rows);
        }
    }})(res));
});

app.listen(port);