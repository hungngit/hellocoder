var GenderModel = require("../models/gender");

function GenderRepository = function(model){
	/**
	* Get all brands.
	* @param {function} callback
	*/
	this.GetAll = function(callback) {
		model.find({}, callback);
	};
}
var genderRepository = new GenderRepository(GenderModel);

module.exports = {
	GetAll : genderRepository.GetAll
};