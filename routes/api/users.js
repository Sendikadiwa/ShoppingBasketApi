const express = require("express");

const router = express.Router();
const { User, validate } = require("../../models/User");

/**
 * Adds a user to the `users` collection
 * @param {*} req
 * @param {*} res
 * @returns {object} Returns either a "saved user" or an "error" Object
 */

router.post("/", async (req, res) => {
  // validate user input
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  // find user by email
  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).send({ error: "This email is already taken." });

  // create new user object
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  // save user
  await user.save();

  res.status(201).json({ msg: "Congraturations! Signup success" });
});

module.exports = router;
