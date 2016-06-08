var mongoose = require("mongoose");

var GenderSchema = new mongoose.Schema({
	Id: {
		type: mongoose.Schema.Types.ObjectId,
		index: true
	},
	GenderName: {
		type: String,
		index: true
	},
	IsDeleted: {
		type: Boolean, 
		default: false
	}
});

var Gender = mongoose.model('Gender', GenderSchema);

module.exports = Gender;