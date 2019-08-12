const mongoose = require("mongoose");

module.exports = function validateObjectId(req, res, next) {
	if (!mongoose.Types.ObjectId.isValid(req.params.id))
		return res.status(404).send({ msg: "Invalid ID passed." });

	next();
};
