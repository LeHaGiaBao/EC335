const mongoose = require('mongoose')
const dotenv = require('dotenv')

const initialRole = require('../middleware/initialRole')

mongoose.set('strictQuery', false)
dotenv.config()

async function DatabaseConnect() {
	mongoose
		.connect(process.env.DATABASE_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log('Connect to database successfully!')
			initialRole()
		})
		.catch((error) => {
			console.log('Connection error', error)
			process.exit()
		})
}

module.exports = DatabaseConnect
