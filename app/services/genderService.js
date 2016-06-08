var iRepo = require("../irepositories/irepository");

var genderService = {};

genderService.GetAll = function (callback) {
	return iRepo.genderRepo.GetAll(callback);
}

module.exports = genderService;