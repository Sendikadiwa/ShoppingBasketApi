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
    const baskets = await Basket.find(req.user.id).sort({ date: -1 });
    if (!baskets) {
      return res.status(404).json({ msg: 'No baskets found.' });
    }
    res.json(baskets);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
