var mongoose = require("mongoose");

var ResourceSchema = new mongoose.Schema({
	Id: {
		type: mongoose.Schema.Types.ObjectId,
		index: true
	},
	ResourceCode: {
		type: String,
		index: true
	},
	ResourceValue: {
		type: String,
		index: true
	},
	ResourceType: {
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