const express = require('express');
const router = express.Router();

/*
   + GET /api/baskets
   + Route for a collection of baskets
*/

router.get('/', (req, res) => {
	res.send('Hello, world');
});

/*
   + POST /api/v1/baskets
   + Route for creating a new basket
*/

router.get('/', (req, res) => {});

module.exports = router;
