const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

// Middleware: Authenticate JWT
function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    console.log('Auth Header Required but NOT PRESENT!');
    return res.sendStatus(401);
  }

  const parts = authHeader.split(' ');
  if (parts.length < 2) {
    console.log(`Invalid Auth Header format. Found ${parts.length} part(s).`);
    return res.sendStatus(400); // Changed from 501 to 400 (bad request)
  }

  const token = parts[1];
  if (!token) {
    console.log('Null Bearer Token');
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Token Validation Error:', err.message);
      return res.status(401).json({ message: 'Token Validation Error!' });
    }

    req.auth = decoded; // Attach decoded token to request
    next(); // Continue only if verified
  });
}

// User authentication routes
router.route('/register')
  .post(authController.register);

router.route('/login')
  .post(authController.login);

// Trip routes
router.route('/trips')
  .get(tripsController.tripsList)
  .post(authenticateJWT, tripsController.tripsAddTrip);

router.route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)
  .put(authenticateJWT, tripsController.tripsUpdateTrip);

module.exports = router;
