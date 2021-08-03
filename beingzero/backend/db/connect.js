var mongoose = require('mongoose');
var config = require('../config/config')
const logger = require('../lib/logLib').getLogger();


module.exports.connect = function(auto_reconnect){
    module.exports.connectv2(config.connection_string, auto_reconnect);
}

module.exports.connectv2 = function(connection_string, auto_reconnect){
    logger.trace(connection_string);
    logger.trace("Trying to connect to MongoDB");
    var dbOptions = {useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, auto_reconnect: true};
    if(auto_reconnect!==null && auto_reconnect!==undefined)
        dbOptions.auto_reconnect = auto_reconnect;

    logger.trace("DB AUTO RECONNECT: "+dbOptions.auto_reconnect);
    mongoose.connect(connection_string, dbOptions);

    var db = mongoose.connection;

    db.on('connecting', function () {
        logger.trace('connecting to MongoDB...');
    });

    db.on('error', function (error) {
        logger.error('Error in MongoDb connection: ' + error);
        mongoose.disconnect();
    });
    db.on('connected', function () {
        logger.info('MongoDB connected!');
    });
    db.once('open', function () {
        logger.trace('MongoDB connection opened!');
    });
    db.on('reconnected', function () {
        logger.info('MongoDB reconnected!');
    });
    db.on('disconnected', function () {
        if(dbOptions.auto_reconnect){
            logger.info('MongoDB disconnected!');
            mongoose.connect(connection_string, dbOptions);
        }
    });
}

module.exports.disconnect = function(){
    mongoose.disconnect();
}