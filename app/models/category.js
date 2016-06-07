var mongoose = require("mongoose");

var CategorySchema = new mongoose.Schema({
	Id: {
		type: mongoose.Schema.Types.ObjectId,
		index: true
	},
	CategoryName: {
		type: String,
		index: true
	},
	IsDeleted: {
		type: Boolean, 
		default: false
	}
});

var Category = mongoose.model('Category', CategorySchema);

module.exports = Category;