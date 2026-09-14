const express = require("express");
const router = express.Router();
const passport = require("passport");

// Initiate Google Auth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

// Google Callback Route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/users/login",
    failureFlash: true,
  }),
  async (req, res) => {
    // Populate session user data
    req.session.user = {
      _id: req.user._id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      status: req.user.status,
    };

    return res.redirect("/");
  },
);

/* Routes for Facebook authentication
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/users/login', successRedirect: '/' }));
*/

module.exports = router;