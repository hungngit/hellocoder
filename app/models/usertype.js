var mongoose = require("mongoose");

var UserTypeSchema = mongoose.Schema({
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

var UserType = mongoose.model('UserType', UserTypeSchema);

module.exports = UserType;