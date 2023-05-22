const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const dbConnect = require('./src/config/db.config')

const app = express()
const port = process.env.PORT || 8080
dbConnect()

const corsOptions = {
	origin: 'http://localhost:8081',
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({extended: true}))

require('./src/routes/auth.routes')(app)
require('./src/routes/user.routes')(app)

app.get('/', (req, res) => {
	res.json({
		message: 'Authentication and Authorization',
	})
})

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
