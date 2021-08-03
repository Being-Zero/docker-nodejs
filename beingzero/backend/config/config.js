module.exports = {
    'connection_string' : process.env.MONGO_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/beingzerodb',
    'web_port' : process.env.PORT || 3000,
	'log_level' : process.env.LOG_LEVEL || 'trace'
}