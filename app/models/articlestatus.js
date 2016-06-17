var mongoose = require("mongoose");

var ArticleStatusSchema = mongoose.Schema({
	Id: {
		type: mongoose.Schema.Types.ObjectId,
		index: true
	},
	StatusName: {
		type: String,
		index: true
	},
	IsDeleted: {
		type: Boolean, 
		default: false
	}
});

var ArticleStatus = mongoose.model('ArticleStatus', ArticleStatusSchema);

module.exports = ArticleStatus;