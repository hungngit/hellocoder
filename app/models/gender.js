var mongoose = require("mongoose");

var GenderSchema = mongoose.Schema({
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

var Gender = mongoose.model('Gender', GenderSchema);

module.exports = Gender;