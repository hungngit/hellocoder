var mongoose = require("mongoose");

var TagSchema = mongoose.Schema({
	Id: {
		type: mongoose.Schema.Types.ObjectId,
		index: true
	},
	Name: {
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