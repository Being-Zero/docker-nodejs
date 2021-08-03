const logger = require('./logLib').getLogger();

exports.getAllItems = function (itemModel, cb) {
    logger.info('Getting All Items');
    var query = {}; // get all
    itemModel.find(query, function (err, allDBItems) {
        cb(err, allDBItems);
    });
};

// populateJson = { path: 'fans', select: 'name' }
exports.getAllItemsWithPopulate = function (itemModel, populateJson, cb) {
    logger.info('Getting All Items With Populate');
    var query = {}; // get all
    itemModel.find(query).populate(populateJson).exec(function (err, allDBItems) {
        cb(err, allDBItems);
    });
};

exports.getItemById = function(id, itemModel, cb){
    logger.info('Getting Single item with ID '+id);
    itemModel.findById(id, function (err, singleDBItem) {
        cb(err, singleDBItem);
    });
}

exports.getItemByQuery = function(query, itemModel, cb){
    logger.info('Getting item with Query '+JSON.stringify(query));
    itemModel.find(query, function (err, allDBItems) {
        if(err)
            logger.info("ERROR: "+err);
        cb(err, allDBItems);
    });
}

exports.createOrSkipByQuery = function(query, itemModel, itemDetails, cb){
    logger.info('Getting Single item with Query '+JSON.stringify(query));
    itemModel.findOne(query, function (err, singleItem) {
        if(err)
            logger.info("ERROR: "+err);
        if(singleItem){
            cb({message: 'Skipping as this already exists'}, singleItem);
        }
        else{
            // INSERT
            exports.createitem(itemDetails, itemModel, cb);
        }
    });
}

exports.createOrUpdateByQuery = function(query, itemModel, itemDetails, cb){
    logger.info('Getting Single item with Query '+JSON.stringify(query));
    itemModel.findOne(query, function (err, singleItem) {
        if(err)
            logger.info("ERROR: "+err);
        if(singleItem){
            // UPDATE
            itemDetails._id = singleItem._id;
            itemDetails.updated_at = new Date();
            exports.updateItem(itemDetails, itemModel, cb);
        }
        else{
            // INSERT
            exports.createitem(itemDetails, itemModel, cb);
        }
    });
}

exports.getSingleItemByQuery = function(query, itemModel, cb){
    logger.info('Getting Single item with Query '+JSON.stringify(query));
    itemModel.findOne(query, function (err, singleItem) {
        if(err)
            logger.info("ERROR: "+err);
        cb(err, singleItem);
    });
}

exports.getSingleItemByQueryAndSortedOnField = function(query, fieldName, itemModel, cb){
    logger.info('Getting Single item with Query '+JSON.stringify(query));
    itemModel.findOne(query).sort(fieldName).exec(function (err, singleItem) {
        if(err)
            logger.info("ERROR: "+err);
        cb(err, singleItem);
    });
}

exports.createitem = function (itemDetails, itemModel, cb) {
    logger.info('Create New item for ' + JSON.stringify(itemDetails));
    var ti = new itemModel(itemDetails);
    ti.save(function (err) {
        if(err)
            logger.info("ERROR "+ err);
        cb(err, ti);
    });
};

exports.updateItem = function (itemDetails, itemModel, cb) {
    logger.info('Edit Resource ' + itemDetails._id);
    //logger.info("MODEL: "+ JSON.stringify(itemModel))
    itemModel.findById(itemDetails._id, function (err, qObj) {
        if (err || !qObj)
            cb(err, null);
        else {
            if (itemDetails._id)
                delete itemDetails._id;

            logger.info(JSON.stringify(itemDetails));
            for (var p in itemDetails) {
                //logger.info(itemDetails[p])
                if(itemDetails[p])
                    qObj[p] = itemDetails[p];
            }

            // Save Updated Statement
            qObj.save(function (err) {
                cb(err, qObj);
            });
        }
    });
};


exports.deleteItem = function (id, softDelete, itemModel, cb) {
    logger.info('Delete Resource ' + id);
    cb(null, null); // Disabled Delete
    /*
    if(!softDelete){
        itemModel.findByIdAndDelete(id, cb);
    }
    else{
        itemModel.findById(id, function (err, qObj) {
            if (err)
                cb(err, null);
            else {
                qObj.isDeleted = true;
                // Save Updated Statement
                qObj.save(function (err) {
                    cb(err, qObj);
                });
            }
        });
    }
    */
};