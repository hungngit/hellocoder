var mongoose = require('mongoose'),
	Article = mongoose.model('Article');

var articleService = {};

articleService.getListFromDateAndStatus = function (fromDate, statusId, limit) {
	return Article
			.where('History.CreatedDate').gte(fromDate)
			//.where('Status.Id').equals(statusId)
			.limit(limit)
			.sort('-History.CreatedDate')
			//.select('')
			.exec();
}

module.exports = {
	getListFromDateAndStatus: articleService.getListFromDateAndStatus
};