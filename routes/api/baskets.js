const express = require('express')
const router = express.Router()

/*
   + GET /api/baskets
   + Route for a collection of baskets
*/

router.get('/', (req, res) => {
	res.send('Hello, world')
})

module.exports = router
