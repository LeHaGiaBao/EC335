const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const config = require('../config/auth.config')
const db = require('../models')

const User = db.user
const Role = db.role

exports.signup = (req, res) => {
	const user = new User({
		username: req.body.username,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 8),
	})

	user.save((error, user) => {
		if (error) {
			res.status(500).send({
				message: error,
			})
		}

		if (req.body.roles) {
			Role.find(
				{
					name: {
						$in: req.body.roles,
					},
				},
				(error, roles) => {
					if (error) {
						res.status(500).send({
							message: error,
						})
						return
					}

					user.roles = roles.map((roles) => roles._id)
					user.save((error) => {
						if (error) {
							res.status(500).send({
								message: error,
							})
						}

						res.send({
							message: 'User was registered successfully!',
						})
					})
				}
			)
		} else {
			Role.findOne(
				{
					name: 'user',
				},
				(error, role) => {
					if (error) {
						res.status(500).send({
							message: error,
						})
						return
					}

					user.roles = [role._id]
					user.save((error) => {
						if (error) {
							res.status(500).send({
								message: error,
							})
							return
						}

						res.send({
							message: 'User was registered successfully!',
						})
					})
				}
			)
		}
	})
}

exports.signin = (req, res) => {
	User.findOne({
		username: req.body.username,
	})
		.populate('roles', '-__v')
		.exec((error, user) => {
			if (error) {
				res.status(500).send({
					message: error,
				})
				return
			}

			if (!user) {
				return res.status(404).send({
					message: 'User Not found.',
				})
			}

			let passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

			if (!passwordIsValid) {
				return res.status(401).send({
					accessToken: null,
					message: 'Invalid Password!',
				})
			}

			let token = jwt.sign(
				{
					id: user.id,
				},
				config.secret,
				{
					expiresIn: 86400,
				}
			)

			let authorities = []

			for (let i = 0; i < user.roles.length; i++) {
				authorities.push('ROLE_' + user.roles[i].name.toUpperCase())
			}

			res.status(200).send({
				id: user._id,
				username: user.username,
				email: user.email,
				roles: authorities,
				accessToken: token,
			})
		})
}
