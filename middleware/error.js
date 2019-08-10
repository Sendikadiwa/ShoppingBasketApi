module.exports = function(err, req, res) {
	console.error(err.message, err);

	return res.status(500).send({ error: "Server Error" });
};
