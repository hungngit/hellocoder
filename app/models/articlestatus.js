var mongoose = require("mongoose");

var ArticleStatusSchema = new mongoose.Schema({
	Id: {
		type: mongoose.Schema.Types.ObjectId,
		index: true
	},
	StatusName: {
		type: String,
		index: true
	}
});

var ArticleStatus = mongoose.model('ArticleStatus', ArticleStatusSchema);

module.exports = ArticleStatus;