const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
	// check token in header
	const token = req.header('x-auth-token');

	// token does not exist
	if (!token) res.status(401).send({ msg: 'Access denied. Token missing.' });

	try {
		// populate req.user with the payload of the valid jwt
		const decoded = jwt.verify(token, config.get('secretOrPrivateKey'));
		req.user = decoded;
		next();
	} catch (error) {
		res.status(400).send({ msg: 'Toke is invalid.' });
	}
};
