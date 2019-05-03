var express=require('express'),
    mysql=require('mysql'),
    credentials=require('./credentials.json'),
    app = express(),
    port = process.env.PORT || 1337;

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

app.listen(port);