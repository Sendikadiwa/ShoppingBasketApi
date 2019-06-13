const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

// load users and basket models
const User = require('../../models/User');
const Basket = require('../../models/Basket');

/*
+End Point:   POST api/baskets
+Description: Get all users baskets
+Access:      Private
*/
router.post(
  '/',
  [
    check('name', 'Basket name is missing')
      .trim()
      .not()
      .isEmpty()
  ],
  auth,
  async (req, res) => {
    // check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // create a new basket object
      const basketData = new Basket({ name: req.body.name, user: req.user.id });

      // save data to db
      await basketData.save();

      res.json(basketData);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

/*
+End Point:   GET api/baskets
+Description: Get all users baskets
+Access:      Private
*/
router.get('/', auth, async (req, res) => {
  try {
    const baskets = await Basket.find({user:req.user.id}).sort({ date: -1 });
    if (!baskets) {
      return res.status(404).json({ msg: 'No baskets found.' });
    }
    res.json(baskets);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

/*
+End Point:   GET api/baskets/basket_id
+Description: Get user basket by id
+Access:      Private
*/

router.get('/:id', auth, async (req, res) => {
  try {
    const basket = await Basket.findById(req.params.id);
    if (!basket) {
      return res.status(404).json({ msg: 'No basket found' });
    }
    // return basket
    res.json(basket);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

/*
+End Point:   DELETE api/baskets/basket_id
+Description: Delete user basket by id
+Access:      Private
*/
router.delete('/:id', auth, async (req, res) => {
  try {
    const basket = await Basket.findById(req.params.id);
    if (!basket) {
      return res.status(404).json({ msg: 'No basket found' });
    }
    // check its the right user deleting the basket
    if (basket.user !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    // remove basket
    basket.remove();
    res.json({ msg: 'Basket remove' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

/*
+End Point:   UPDATE api/baskets/basket_id
+Description: Update user basket by id
+Access:      Private
*/
router.put(
  '/:id',
  [
    check('name', 'Name is required.')
      .trim()
      .not()
      .isEmpty()
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name } = req.body;
    const myBasket = {};
    if (name) myBasket.name = name;

    try {
      let basket = await Basket.findById(req.params.id);
      // check if basket exists
      if (!basket) return res.status(404).json({ msg: 'Basket not found' });
      // check if the user owns the basket
      if (basket.user !== req.user.id) {
        return res.status(404).json({ msg: 'User not authorized.' });
      }
      // update basket
      basket = await Basket.findByIdAndUpdate(
        req.params.id,
        { $set: myBasket },
        { new: true }
      );
      res.json(basket);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

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
      .isEmpty()
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // const user = await User.findById(req.user.id);
      const basket = await Basket.findById(req.params.id);
      const newItem = {
        name: req.body.name,
        user: req.user.id
      };
      basket.items.unshift(newItem);
      await basket.save();
      res.json(basket.items);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
