const fs = require('fs');
const csv = require('csv-parser');
const util = require('util');
const async = require('async');
const path = require('path');
const dbconnect = require('../db/connect');
const logger = require('../lib/logLib').getLogger();
const userModel = require('../models/userModel');
const itemLib = require('../lib/itemLib');

dbconnect.connect(false);


module.exports.importData = function(path_to_csv, modelToUse){
	var allUsers = [];
	var idx = 1;
	fs.createReadStream(path_to_csv)
	.pipe(csv())
	.on('data', (row) => {
		allUsers.push(row);
	})
	.on('end', () => {
		var totalUsers = allUsers.length;
		async.eachSeries(allUsers, function(currentUser, next){
			logger.info(util.format("CURRENT USER %d of %d: %s ", idx++, totalUsers, JSON.stringify(currentUser)));
			var roll_number_query = {$or : [{roll_number: currentUser.roll_number } ]};
			itemLib.createOrUpdateByQuery(roll_number_query, modelToUse, currentUser, function(err, result){
				if(err){
					logger.error(err);
					next(err);
				}
				else
					next();
			})
		},
		function(err)
		{
			if(err)
				logger.error(err);
			else{
				logger.info("DONE " + totalUsers);
			}
			dbconnect.disconnect();
			logger.info('CSV file successfully processed '+allUsers.length);
		});
	});

}



var path_to_csv = path.join(__dirname, "../data/import.csv");
module.exports.importData(path_to_csv, userModel);

  
  