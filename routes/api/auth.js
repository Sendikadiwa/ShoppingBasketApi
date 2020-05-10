const Joi = require("@hapi/joi");
const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../../models/User");

const router = express.Router();

// validate email and password fields
function validate(req) {
  const schema = {
    email: Joi.string()
      .min(10)
      .max(255)
      .trim(),
    password: Joi.string()
      .min(5)
      .max(255)
      .trim()
  };
  return Joi.validate(req, schema);
}
/**
 * Authenticates a user
 * @param {*} req
 * @param {*} res
 * @returns {object} Returns a token
 */
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  // get user info
  const { password } = req.body;
  // check if user email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send({ error: "Email or password is invalid" });

  // compare password with hashed password in db
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).send({ error: "Email or password is invalid." });

  // login user and generate token
  const token = user.generateAuthToken();

  // return response with user and token to frontend client
  const { _id, name, email } = user;
  return res.status(200).send({ token, user: { _id, name, email } });
});

module.exports = router;
