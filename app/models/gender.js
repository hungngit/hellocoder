var mongoose = require("mongoose");

var GenderSchema = new mongoose.Schema({
	Id: {
		type: mongoose.Schema.Types.ObjectId,
		index: true
	},
	GenderName: {
		type: String,
		index: true
	}
});

var Gender = mongoose.model('Gender', GenderSchema);

module.exports = Gender;