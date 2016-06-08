var iRepo = require("../irepositories/irepository");

var authService = {};

authService.GetSaltAndPassById = function (userId, callback) {
	return iRepo.authRepo.GetSaltAndPassById(userId, callback);
}

module.exports = authService;