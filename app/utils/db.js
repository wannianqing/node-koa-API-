const DB = require('sequelize');
const config = require('./config');

const {
    dbName,
    user,
    password,
    host,
    port
} = config.database;

const connect = new DB(dbName,user,password,{
    dialect:'mysql',
    host,
    port,
    timezone:'+08:00',
    dialectOptions:{
        dateStrings:true,
        typeCast:true
    }
});


module.exports = connect;