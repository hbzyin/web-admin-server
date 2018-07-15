var mysql= require('mysql');
var connection = mysql.createConnection({
  host: '47.104.134.40',
  user: 'root',
  password: '123456',
  database: 'web_admin'
});
connection.connect();
module.exports=connection;