const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Load User model
const User = require('../../models/User');

router.post(
  '/',
  [
    check('name', 'Name is required')
      .trim()
      .not()
      .isEmpty(),
    check('email', 'Please use a valid email')
      .trim()
      .isEmail(),
    check('password', 'Password is required')
      .trim()
      .isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      // check if user exists using email
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      // user doesnot exist-> create one
      user = new User({
        name,
        email,
        password
      });
      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // save user to database
      await user.save();

      // Generate and return a jwt token
      /* we want to send the user id as the payload so that we can i dentify which user with the token  */
      const payload = {
        user: { id: user.id }
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error!');
    }
  }
);


module.exports = router;
