var log4js = require('log4js');
var config = require('../config/config');

module.exports.getLoggerByName = function(name){
    log4js.configure({
        appenders: { 'out': { type: 'stdout', layout: { type: 'pattern',  pattern: '[%d] [%p] - %c - %f{1}:%l:%o -  %m%n'} } },
        categories: { 'default': { appenders: ['out'], level: config.log_level, enableCallStack: true } }
    });
    const logger = log4js.getLogger(name);
    return logger;
}

module.exports.getLogger = function(){
    return module.exports.getLoggerByName('CRAWLER');
}