const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoleSchema = new Schema({
	name: {
		type: String,
		require: [true, "Name can't be empty"],
	},
})

module.exports = mongoose.model('Role', RoleSchema)
