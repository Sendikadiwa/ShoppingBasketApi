const bcrypt = require("bcrypt");
const Joi = require("@hapi/joi");
const express = require("express");
const router = express.Router();
const { User } = require("../../models/user");

/**
 * Authenticates a user
 * @param {*} req
 * @param {*} res
 * @returns {object} Returns a token
 */
router.post("/", async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// get user info
	const { email, password } = req.body;
	// check if user email exists
	let user = await User.findOne({ email });
	if (!user) return res.status(400).send({ msg: "Email or password is invalid" });

	// compare password with hashed password in db
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) return res.status(400).send({ msg: "Email or password is invalid." });

	// login user and generate token
	const token = user.generateAuthToken();

	res.status(200).send(token);
});

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
			.trim(),
	};
	return Joi.validate(req, schema);
}

module.exports = router;
