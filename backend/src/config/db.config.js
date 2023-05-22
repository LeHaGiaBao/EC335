const mongoose = require('mongoose')
require('dotenv').config()

const db = require('../models')
const Role = db.role

function initial() {
	Role.estimatedDocumentCount((err, count) => {
		if (!err & (count === 0)) {
			new Role({
				name: 'user',
			}).save((err) => {
				if (err) {
					console.log('error', err)
				}

				console.log("added 'user' to roles collection")
			})

			new Role({
				name: 'moderator',
			}).save((err) => {
				if (err) {
					console.log('error', err)
				}
				console.log("added 'moderator' to roles collection")
			})

			new Role({
				name: 'admin',
			}).save((err) => {
				if (err) {
					console.log('error', err)
				}
				console.log("added 'admin' to roles collection")
			})
		}
	})
}

db.mongoose
	.connect(process.env.DATABASE_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Successfully connected!')
		initial()
	})
	.catch((error) => {
		console.log('Unable to connect')
		console.log(error)
		process.exit()
	})

function dbConnect() {}

module.exports = dbConnect
