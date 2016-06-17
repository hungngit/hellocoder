var mongoose = require("mongoose");

var SeriesSchema = mongoose.Schema({
	Id: {
		type: mongoose.Schema.Types.ObjectId,
		index: true
	},
	Name: {
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

var Series = mongoose.model('Series', SeriesSchema);

module.exports = Series;