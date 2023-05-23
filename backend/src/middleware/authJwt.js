const jwt = require('jsonwebtoken')

const config = require('../config/auth.config')
const db = require('../models')

const User = db.user
const Role = db.role

verifyToken = (req, res, next) => {
	let token = req.headers['x-access-token']

	if (!token) {
		return res.status(403).send({
			message: 'No token provided!',
		})
	}

	jwt.verify(token, config.secret, (error, decoded) => {
		if (error) {
			return res.status(401).send({
				message: 'Unauthorized!',
			})
		}

		req.userId = decoded.id

		next()
	})
}

isAdmin = (req, res, next) => {
	User.findById(req.userId).exec((error, user) => {
		if (error) {
			res.status(500).send({
				message: error,
			})
			return
		}

		Role.find(
			{
				_id: {
					$in: user.roles,
				},
			},
			(error, roles) => {
				if (error) {
					res.status(500).send({
						message: error,
					})
					return
				}

				for (let i = 0; i < roles.length; i++) {
					if (roles[i].name === 'admin') {
						next()
						return
					}
				}

				res.status(403).send({
					message: 'Require Admin Role!',
				})
				return
			}
		)
	})
}

isModerator = (req, res, next) => {
	User.findById(req.userId).exec((err, user) => {
		if (err) {
			res.status(500).send({
				message: err,
			})
			return
		}

		Role.find(
			{
				_id: {
					$in: user.roles,
				},
			},
			(error, roles) => {
				if (error) {
					res.status(500).send({
						message: error,
					})
					return
				}

				for (let i = 0; i < roles.length; i++) {
					if (roles[i].name === 'moderator') {
						next()
						return
					}
				}

				res.status(403).send({
					message: 'Require Moderator Role!',
				})
				return
			}
		)
	})
}

const authJwt = {
	verifyToken,
	isAdmin,
	isModerator,
}

module.exports = authJwt
