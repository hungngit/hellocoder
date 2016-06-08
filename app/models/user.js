var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
	Id: {
		type: mongoose.Schema.Types.ObjectId,
		index: true
	},
	UserName: {
		type: String,
		index: true
	},
	FirstName: {
		type: String,
		index: true
	},
	LastName: {
		type: String,
		index: true
	},
	Gender: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Gender'
	},
	Email: {
		type: String,
		index: true
	},
	MobileCode: {
		type: String,
		index: true
	},
	MobilePhone: {
		type: String,
		index: true
	},
	Password: {
		type: String,
		default: ''
	},
	Salt: {
		type: String,
		default: ''
	},
	ProfileImageURL: {
	   type: String,
	   default: 'modules/users/client/img/profile/default.png'
	},
	ResetPasswordKey: {
		type: String,
		default: ''
	},
	UserTypeId: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'UserType'
	},
	Status: {
		Id : {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'UserStatus'
		},
        CreatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
	},
	Followers: [
		Id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
	],
	Address: {
		type: String,
		default: ''
	},
	BirthDate: {
		type: Date,
		default: Date.now
	},
	IsDeleted: {
		type: Boolean, 
		default: false
	}
});

var User = mongoose.model('User', UserSchema);

module.exports = User;