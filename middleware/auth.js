/*
This module helps to check if a user is authenticated or not
by checking for the user's  valid token in the header
*/
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // check for token from header
  const token = req.header('x-access-token');
  if (!token) {
    return res
      .status(400)
      .json({ msg: 'Token missing. Authorization failed.' });
  }
  // Token exists-> verify given token given user secret key
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodedToken.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};
