var mongoose = require("mongoose");

var SeriesSchema = new mongoose.Schema({
	Id: {
		type: mongoose.Schema.Types.ObjectId,
		index: true
	},
	SeriesName: {
		type: String,
		index: true
	},
	CategoryId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category'
	},
	IsDeleted: {
		type: Boolean, 
		default: false
	}
});

var Category = mongoose.model('Category', CategorySchema);

module.exports = Category;