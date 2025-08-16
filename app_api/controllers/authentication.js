const mongoose = require('mongoose');
const User = require('../models/user');
const passport = require('passport');

// User Registration
const register = async (req, res) => {
  // Validate message to ensure that all parameters are present
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ message: "All fields required" });
  }

  const user = new User({
    name: req.body.name,     // Set User name
    email: req.body.email,   // Set e-mail address
  });

  user.setPassword(req.body.password); // Set user password

  try {
    const savedUser = await user.save();

    // Return new user token
    const token = user.generateJWT();
    return res
      .status(200)
      .json(token);

  } catch (err) {
    // Database returned no data or error
    return res
      .status(400)
      .json(err);
  }
};

// User Login
const login = (req, res) => {
  // Validate message to ensure that email and password are present
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ message: "All fields required" });
  }

  // Delegate authentication to passport module
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      // Error in Authentication Process
      return res
        .status(404)
        .json(err);
    }

    if (user) {
      // Auth succeeded - generate JWT and return to caller
      const token = user.generateJWT();
      return res
        .status(200)
        .json({ token });
    } else {
      // Auth failed - return error
      return res
        .status(401)
        .json(info);
    }
  })(req, res);
};

// Export methods that drive endpoints
module.exports = {
  register,
  login,
};
