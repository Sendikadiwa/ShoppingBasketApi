const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

router.get('/', auth, (req, res) => {
  try {
    return res.send('Authorized');
  } catch (error) {
    res.status(401).json('Unauthorized');
  }
});
module.exports = router;
