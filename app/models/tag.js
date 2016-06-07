var mongoose = require("mongoose");

var TagSchema = new mongoose.Schema({
	Id: {
		type: mongoose.Schema.Types.ObjectId,
		index: true
	},
	TagName: {
		type: String,
		index: true
	},
	IsDeleted: {
		type: Boolean, 
		default: false
	}
});

var Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;