const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator/check')

// load users and basket models
const User = require('../../models/User')
const Basket = require('../../models/Basket')

/*
+End Point:   POST api/baskets
+Description: Get all users baskets
+Access:      Private
*/
router.post(
	'/',
	[
		check('category', 'Basket category is missing')
			.trim()
			.not()
			.isEmpty(),
	],
	auth,
	async (req, res) => {
		// check for errors
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}
		try {
			const { category } = req.body
			// check if basket category exists
			const basketCategory = await Basket.findOne({ category })
			if (basketCategory) {
				return res
					.status(400)
					.json({ message: 'Category with that name already exists' })
			}
			// create a new basket object
			const basketData = new Basket({
				category: req.body.category,
				user: req.user.id,
			})

			// save data to db
			const result = await basketData.save()

			res.json(result)
		} catch (error) {
			console.error(error.message)
			res.status(500).send('Server Error')
		}
	},
)

/*
+End Point:   GET api/baskets
+Description: Get all users baskets
+Access:      Private
*/
router.get('/', auth, async (req, res) => {
	try {
		const baskets = await Basket.find({ user: req.user.id }).sort({ date: -1 })
		if (baskets.length === 0) {
			return res.status(404).json({ msg: 'No baskets found.' })
		}
		res.json(baskets)
	} catch (error) {
		console.error(error.message)
		res.status(500).send('Server Error')
	}
})

/*
+End Point:   GET api/baskets/basket_id
+Description: Get user basket by id
+Access:      Private
*/

router.get('/:id', auth, async (req, res) => {
	try {
		const basket = await Basket.findById(req.params.id)
		if (!basket) {
			return res.status(404).json({ msg: 'No basket found' })
		}
		// return basket
		res.json(basket)
	} catch (error) {
		console.error(error.message)
		res.status(500).send('Server Error')
	}
})

/*
+End Point:   DELETE api/baskets/basket_id
+Description: Delete user basket by id
+Access:      Private
*/
router.delete('/:id', auth, async (req, res) => {
	try {
		const basket = await Basket.findById(req.params.id)
		if (!basket) {
			return res.status(404).json({ msg: 'No basket found' })
		}
		// check its the right user deleting the basket
		if (basket.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' })
		}
		// remove basket
		basket.remove()
		res.json({ msg: 'Basket remove' })
	} catch (error) {
		console.error(error.message)
		res.status(500).send('Server Error')
	}
})

/*
+End Point:   UPDATE api/baskets/basket_id
+Description: Update user basket by id
+Access:      Private
*/
router.put(
	'/:id',
	[
		check('category', 'Category is required.')
			.trim()
			.not()
			.isEmpty(),
	],
	auth,
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}
		const { category } = req.body
		const myBasket = {}
		if (category) myBasket.category = category

		try {
			let basket = await Basket.findById(req.params.id)
			// check if basket exists
			if (!basket) return res.status(404).json({ msg: 'Basket not found' })
			// check if the user owns the basket
			if (basket.user.toString() !== req.user.id) {
				return res.status(404).json({ msg: 'User not authorized.' })
			}
			// check for duplicates
			const basketExists = await Basket.findOne({ category })
			if (basketExists) {
				return res
					.status(400)
					.json({ message: 'Category with that name already exists' })
			} else {
				// update basket
				basket = await Basket.findByIdAndUpdate(
					req.params.id,
					{ $set: myBasket },
					{ new: true },
				)
				res.json(basket)
			}
		} catch (error) {
			console.error(error.message)
			res.status(500).send('Server Error')
		}
	},
)

/*
+End Point:   POST api/baskets/item/basket_id
+Description: Add Item to basket
+Access:      Private
*/
router.post(
	'/item/:id',
	[
		check('name', 'Name is required')
			.trim()
			.not()
			.isEmpty(),
	],
	auth,
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}
		try {
			const basket = await Basket.findById(req.params.id)

			const newItem = {
				name: req.body.name,
				user: req.user.id,
      }
      // check if item exists
			const existItem = await basket.items.find(
				item => item.name === newItem.name,
			)
			if (existItem) {
				return res.status(400).json({ message: 'Item already exists' })
			}

      basket.items.unshift(newItem)
      // save item
			const result = await basket.save()
			res.json(result.items)
		} catch (error) {
			res.status(500).send('Server Error')
		}
	},
)

/*
+End Point:   DELETE api/baskets/item/basket_id
+Description: Delete Item from basket
+Access:      Private
*/
router.delete('/item/:id/:item_id', auth, async (req, res) => {
	try {
		const basket = await Basket.findById(req.params.id)
		// check if item exists
		if (
			basket.items.filter(item => item._id.toString() === req.params.item_id)
				.length === 0
		) {
			return res.status(404).json({ doesnotexist: 'Item does not exist' })
		}
		// Get remove index
		const itemIndex = basket.items
			.map(item => item._id.toString())
			.indexOf(req.params.item_id)

		// Splice item out of items
		basket.items.splice(itemIndex, 1)

		const result = await basket.save()
		res.json(result)
	} catch (error) {
		res.status(500).json('Server error')
	}
})

module.exports = router
