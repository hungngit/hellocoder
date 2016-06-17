var mongoose = require("mongoose");

var ResourceSchema = mongoose.Schema({
	Id: {
		type: mongoose.Schema.Types.ObjectId,
		index: true
	},
	Code: {
		type: String,
		index: true
	},
	Value: {
		type: String,
		index: true
	},
	Type: {
		type: String,
		index: true,
		default: 'String'
	},
	CultureCode: {
		type: String,
		index: true,
		default: 'VI'
	},
	IsDeleted: {
		type: Boolean, 
		default: false
	}
});

var Resource = mongoose.model('Resource', ResourceSchema);

module.exports = Resource;