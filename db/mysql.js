var mysql= require('mysql');
var connection = mysql.createConnection({
  host: 'xx.xx.xx.xx',
  user: 'root',
  password: '123456',
  database: 'web_admin'
});
connection.connect();
module.exports=connection;