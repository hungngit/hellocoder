var mongoose = require("mongoose");

var UserStatusSchema = new mongoose.Schema({
	Id: {
		type: mongoose.Schema.Types.ObjectId,
		index: true
	},
	StatusName: {
		type: String,
		index: true
	}
});

var UserStatus = mongoose.model('UserStatus', UserStatusSchema);

module.exports = UserStatus;