var UserModel = require("../models/user");

function UserRepository = function(model){
	/**
	* Get all Genders.
	* @param {function} callback
	*/
	this.GetSaltAndPassById = function(id, callback) {
		model.find({Id : id}, "-salt -password", callback);
	};
}
var genderRepository = new GenderRepository(GenderModel);

module.exports = genderRepository;