const db = require('../models/index')
const Role = db.role

function initialRole() {
	Role.estimatedDocumentCount((error, count) => {
		if (!error && count === 0) {
			new Role({
				name: 'user',
			}).save((error) => {
				if (error) {
					console.log('Error', error)
				}
			})

			new Role({
				name: 'moderator',
			}).save((error) => {
				if (error) {
					console.log('Error', error)
				}
			})

			new Role({
				name: 'admin',
			}).save((error) => {
				if (error) {
					console.log('Error', error)
				}
			})
		}
	})
}

module.exports = initialRole
