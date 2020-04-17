var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware/index.js");
var flash = require("connect-flash");
router.get("/", function(req, res)
{
  res.render("home");
});

router.get("/about", function(req, res)
{
  res.render("about");
});


router.get("/register" , function(req, res)
{
  res.render("register", {user: req.user});
});

router.post("/register", function(req, res)
{
  if(req.body.password === req.body.confirmPassword && !(req.body.displayName.toLowerCase().includes("park") && req.body.displayName.toLowerCase().includes("app")))
  {
    User.register(new User({username: req.body.username, displayName: req.body.displayName}), req.body.password, function(err, user)
    {
      if(err)
      {
        //console.log(err);
        req.flash("error", "An error has occured. Please report this.");
        return res.redirect("/register");
      }
      passport.authenticate("local")(req, res, function()
      {
        req.flash("success", req.body.displayName + " you've successfuly registered to Park App.");
        res.redirect("/");
      });
    });
  }
  else
  {
    if(req.body.password != req.body.confirmPassword)
    {
      req.flash("error", "Passwords do not match. Please try again.");
      res.redirect("/register");
    }
    else
    {
      req.flash("error", "That Display Name is not allowed please try another one.");
      res.redirect("/register");
    }
  }
});

router.get("/login",function(req, res)
{
  res.render("login")
});

router.post("/login", passport.authenticate("local", {successRedirect: "/", failureRedirect:"/login" }), function(req, res)
{

});

router.get("/logout", function(req, res)
{
  var displayName = req.user.displayName;
  req.logout();
  req.flash("success", displayName + " has successfully logged out.");
  res.redirect("/");
});

module.exports = router;
