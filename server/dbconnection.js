const mysql = require('mysql');
const connection = mysql.createPool({
host: '13.124.153.56',
port: 3306,
user: 'root',
password: '1234',
database: 'TwitchData',
multipleStatements: true,
});

module.exports=connection;