const express = require('express')
const app = express()
const DBconnection = require('./entrance/db')
const config = require('config')

// Db connection
DBconnection()

// routes
require('./entrance/routes')(app)

const port = process.env.PORT || 9000
app.listen(port, () => {
	console.log(`Server set up on port ${port}`)
})
