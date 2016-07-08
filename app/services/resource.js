var mongoose = require('mongoose'),
	Resource = mongoose.model('Resource');

var resourceService = {};

resourceService.getResourceByCultureCode = function (cultureCode) {
	return Resource
			.where('CultureCode').equals(cultureCode)
			.where('IsDeleted').equals(false)
			.sort('Code')
			.exec();
}

module.exports = {
	getResourceByCultureCode: resourceService.getResourceByCultureCode
};