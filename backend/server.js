const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const DatabaseConnect = require('./src/config/database.config')

const app = express()
const port = process.env.PORT || 8080

const corsOptions = {
	origin: 'http://localhost:8081',
}

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({extended: true}))

DatabaseConnect()

app.get('/', (res) => {
	res.json({
		message: 'Authentication and Authorization',
	})
})

require('./src/routes/auth.routes')(app)
require('./src/routes/user.routes')(app)

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
