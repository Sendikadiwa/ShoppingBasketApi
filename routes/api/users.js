const _ = require("lodash");
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
  if (error) return res.status(400).send(error.details[0].message);

  // find user by email
  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).send({ msg: "This email is already taken." });

  // create new user object
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  // save user
  await user.save();

  // return saved user minus password
  user = _.pick(user, ["_id", "name", "email"]);

  res.status(201).send(user);
});

module.exports = router;
