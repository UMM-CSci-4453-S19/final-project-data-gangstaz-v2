var express=require('express'),
    mysql=require('mysql'),
    credentials=require('./credentials.json'),
    app = express(),
    port = process.env.PORT || 1337;
// var promise1=require('./public/button-promise.js');

credentials.host='ids.morris.umn.edu'; //setup database credentials

// var connection = mysql.createConnection(credentials); // setup the connection

// connection.connect(function(err){if(err){console.log(error)}});

app.use(express.static(__dirname + '/public'));

app.get("/click",function(req,res){
    var id = req.param('id');
    var sql = 'Call dataGangstas.addItemToCurrTrans(' + id + ')';
    console.log("Attempting sql ->"+sql+"<-");

    connection.query(sql,(function(res){return function(err,rows,fields){
        if(err) {
            console.log("We have an insertion error:");
            console.log(err);
            res.send(err); // Let the upstream guy know how it went
        }
        else {res.send(rows);}
    }})(res));
});

app.listen(port);