var express    = require('express');
var path = require("path");
var bodyParser = require("body-parser");

var mysql      = require('mysql');
var dbconfig   = require('./config/database.js');
var connection = mysql.createConnection(dbconfig);

var app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// configuration ===============================================================
app.set('port', process.env.PORT || 3000);

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get('/smbrid', function(req, res){

  connection.query('SELECT * from rb_s_mbrid', function(err, rows) {
    if(err) throw err;

    console.log('rb_s_mbrid: ', rows);
    res.send(rows);
  });
});

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});