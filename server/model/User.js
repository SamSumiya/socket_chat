const mongoose = require('mongoose') 



const userModel = new mongoose.Schema({
	username: {
		type: String,
		required: true, 
	}, 
	email: {
		type: String, 
		required: true, 
		unique: true, 
	}, 
	password: {
		type: String, 
		required: true, 
	}, 
	isAvatarImageSet: {
		type: Boolean,
		default: false,  
	}, 
	avatarImage: {
		type: String, 
		default: '',
	}
})


const User = mongoose.model('User', userModel)

module.exports = User