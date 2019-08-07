const express = require('express');
const router = express.Router();
const { Basket, validate } = require('../../models/basket');
const auth = require('../../middleware/auth');

/**
 * Gets all users baskets from `baskets` collection
 * @param {*} req
 * @param {*} res
 * @returns {object} Returns baskets or empty array
 */
router.get('/', auth, async (req, res) => {
	// find baskets in Basket doc
	const baskets = await Basket.find({ user: req.user._id });

	// return the baskets or empty array
	res.send(baskets);
});

/*
   + POST /api/v1/baskets
   + Route for creating a new basket
*/

router.post('/', (req, res) => {});

module.exports = router;
