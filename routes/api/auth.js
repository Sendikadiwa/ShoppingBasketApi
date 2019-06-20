const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

/*
+End-point:   POST/auth
+Description: Get authenticated user
+Access:      Private
*/
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

/*
+End-point:   POST/auth
+Description: Enables authenticateduser to login and get get
+Access:      PUBLIC
*/

router.post(
  '/',
  [
    check('email', 'Email field is required')
      .trim()
      .isEmail(),
    check('password', 'Password field is required')
      .trim()
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    // check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      // find user by email -> email is unique
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({
            errors: [{ msg: 'Failed! Please check password or email' }]
          });
      }
      // match user password
      const passwordMatched = await bcrypt.compare(password, user.password);
      if (!passwordMatched) {
        return res
          .status(400)
          .json({
            errors: [{ msg: 'Failed! Please check password or email' }]
          });
      }
      // generate token
      const payload = {
        user: {
          id: user.id
        }
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
      res.status(500).send('Server Error');
    }
  }
);
module.exports = router;
