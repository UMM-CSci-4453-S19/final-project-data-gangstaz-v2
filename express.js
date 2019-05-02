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
    var sql = 'select * from dataGangstas.wineReviews join dataGangstas.taster on tasterFk=tasterId limit 500';

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