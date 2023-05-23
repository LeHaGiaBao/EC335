const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
	username: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		require: true,
	},
	password: {
		type: String,
		require: true,
	},
	roles: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Role',
		},
	],
})

module.exports = mongoose.model('User', UserSchema)
