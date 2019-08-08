const express = require('express');
const router = express.Router();
const { Basket, validate } = require('../../models/basket');
const auth = require('../../middleware/auth');
const mongoose = require('mongoose');
const validateObjectId = require('../../middleware/validateObjectId');

/**
 * Gets all users baskets from `baskets` collection
 * @async
 * @param {*} req object
 * @param {*} res object
 * @returns {object} Returns baskets or empty array
 */
router.get('/', auth, async (req, res) => {
	// find baskets in Basket doc
	const baskets = await Basket.find({ user: req.user._id }).sort({ createdAt: -1 });

	// return the baskets or empty array
	res.send(baskets);
});

/**
 * Create a new basket
 * @async
 * @param  {object} req - Request object
 * @param {object} res - Response object
 * @return {json} Returns json object
 */

router.post('/', auth, async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// check if basket already exists with the same category
	let basket = await Basket.findOne({ category: req.body.category });
	if (basket) return res.status(400).send({ msg: 'Basket with that category already exists.' });

	basket = new Basket({
		category: req.body.category,
		description: req.body.description,
		user: req.user._id,
	});
	basket = await basket.save();

	res.status(201).send(basket);
});

/**
 * Deletes a specific basket from the basket collection
 * @async
 * @param  {object} req - Request object
 * @param {object} res - Response object
 * @return {json} Returns json object
 */
router.delete('/:id', auth, validateObjectId, async (req, res) => {
	// find the basket to delete by its id
	let basket = await Basket.findById(req.params.id);

	// if does not exist return error msg
	if (!basket) return res.status(404).send({ msg: 'The basket with the give ID is not found.' });

	// enure its the owner deleting the basket
	if (basket.user.toString() !== req.user._id) {
		return res.status(401).send({ msg: 'You are not Authorized!' });
	}
	// delete basket
	const _id = req.params.id;
	basket = await Basket.findByIdAndDelete({ _id, user: req.user._id });

	// return deleted basket
	res.send(basket);
});

module.exports = router;
