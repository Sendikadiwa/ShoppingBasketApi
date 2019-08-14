const express = require("express");
const router = express.Router();
const { Basket, validate } = require("../../models/basket");
const { validateItem } = require("../../models/item");
const auth = require("../../middleware/auth");
const mongoose = require("mongoose");
const validateObjectId = require("../../middleware/validateObjectId");

/**
 * Gets all users baskets from `baskets` collection
 * @async
 * @param {*} req object
 * @param {*} res object
 * @returns {object} Returns baskets or empty array
 */
router.get("/", auth, async (req, res) => {
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

router.post("/", auth, async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// check if basket already exists with the same category
	let basket = await Basket.findOne({ category: req.body.category });
	if (basket) return res.status(400).send({ msg: "Basket with that category already exists." });

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
router.delete("/:id", auth, validateObjectId, async (req, res) => {
	// find the basket to delete by its id
	let basket = await Basket.findById(req.params.id);

	// if does not exist return error msg
	if (!basket) return res.status(404).send({ msg: "The basket with the give ID is not found." });

	// enure its the owner deleting the basket
	if (basket.user.toString() !== req.user._id) {
		return res.status(401).send({ msg: "You are not Authorized!" });
	}
	// delete basket
	const _id = req.params.id;
	basket = await Basket.findByIdAndDelete({ _id, user: req.user._id });

	// return deleted basket
	res.send(basket);
});

/**
 * Updates a specific basket
 * @async
 * @param  {object} req - Request object
 * @param {object} res - Response object
 * @return {json} Returns json object
 */
router.put("/:id", auth, validateObjectId, async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let basket = await Basket.findById(req.params.id);
	if (!basket) return res.status(404).send({ msg: "The basket with the give ID is not found." });

	// check its the owner of the basket doing the update
	if (basket.user.toString() !== req.user._id) {
		return res.status(401).send({ msg: "You are not Authorized!" });
	}

	basket = await Basket.findByIdAndUpdate(
		req.params.id,
		{
			category: req.body.category,
			description: req.body.description,
			completed: req.body.completed,
		},
		{ new: true },
	);
	res.send(basket);
});

/**
 * Add an item to a specific basket
 * @async
 * @param  {object} req - Request object
 * @param {object} res - Response object
 * @return {json} Returns json object
 */

router.post("/:bID/items", auth, async (req, res) => {
	// check for possible errors
	const { error } = validateItem(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// find the basket to add items too
	let basket = await Basket.findById(req.params.bID);
	if (!basket) return res.status(404).send({ msg: "Basket with that ID not found." });

	// create a new item object
	let item = {
		name: req.body.name,
		completed: req.body.completed,
	};

	// check that the right user is doing the operation
	if (basket.user.toString() !== req.user._id)
		return res.status(401).send({ msg: "You are not Authorized" });

	// add item to the items array
	basket.items.push(item);

	// check if items exists
	// if (basket.items.find(data => data.name === req.body.name))
	// 	return res.status(400).send({ msg: "Item with that name already exists" });

	// Save the changes in the doc
	await basket.save();

	// return the saved items
	res.send(basket.items);
});

/**
 * Deletes an item from a specific basket
 * @async
 * @param  {object} req - Request object
 * @param {object} res - Response object
 * @return {json} Returns json object
 */

router.delete("/:bID/items/:item_id", auth, async (req, res) => {
	const basket = await Basket.findById(req.params.bID);
	if (!basket) return res.status(404).send({ msg: "The basket with the given ID is not found." });

	if (basket.items.filter(item => item._id.toString() === req.params.item_id).length === 0) {
		return res.status(404).send({ msg: "The item with the given ID is not found." });
	}

	// check that the right user is doing the operation
	if (basket.user.toString() !== req.user._id)
		return res.status(401).send({ msg: "You are not Authorized" });

	// get the index of the item and remove it
	const removeItem = basket.items.map(item => item._id.toString()).indexOf(req.params.item_id);
	basket.items.splice(removeItem, 1);
	
	// update basket
	basket.save();

	res.send(basket.items);
});

module.exports = router;
