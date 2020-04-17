// all the middleware goes here

var middlewareObj = {};

middlewareObj.isLoggedin = function(req, res, next)
{
  if (req.isAuthenticated())
  {
    return next();
  }
  else
  {
      req.flash("error", "You must be Logged in to do this.");
      res.redirect("/login");
  }
}

module.exports = middlewareObj
